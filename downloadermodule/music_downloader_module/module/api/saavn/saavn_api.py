import datetime
import logging
from typing import Optional, List
from urllib.parse import quote

from requests import Session

from music_downloader_module.module.api.music_api import MusicApi
from music_downloader_module.module.api.saavn import headers
from music_downloader_module.module.models.song_model import Song


class Saavn(MusicApi):
    logger = logging.getLogger('Saavn')
    common_api_params: dict = {
        'api_version': '4',
        '_format': 'json',
        '_marker': '0',
        'ctx': 'web6dot0'
    }
    BASE_URL: str = 'https://www.jiosaavn.com'
    API_URL: str = f'{BASE_URL}/api.php'

    def __init__(self):
        self.session = Session()
        self._visit_site()

    def get_most_relevant_song(self, prompt: str) -> Optional['Song']:
        suggestions = self.get_suggestions(prompt)
        if len(suggestions) == 0:
            Saavn.logger.error(f'No song found for input: {prompt}')
            return None
        song = suggestions[0]
        return song

    def get_song_from_prompt(self) -> Song:
        choice: Optional[int] = None
        suggestions = []
        while not choice:
            prompt = input('Enter song name: ')
            suggestions = self.get_suggestions(prompt)
            if len(suggestions) == 0:
                logging.info(f'No songs found for input: {prompt}. Re-enter song name...')
                continue
            for idx, song in enumerate(suggestions):
                print(f'{idx + 1}\t{song}')
            print(f'{len(suggestions) + 1}\tOther')
            while (choice := int(input('Enter choice: '))) > len(suggestions) + 1:
                pass
            if choice == len(suggestions) + 1:
                choice = None

        song_to_download = suggestions[choice - 1]
        return song_to_download

    def get_suggestions(self, prompt: str) -> List[Song]:
        Saavn.logger.info(f'Searching for song: {prompt}...')
        params = {
            '__call': 'autocomplete.get',
            'query': f'{quote(prompt)}',
            **Saavn.common_api_params
        }

        response = self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)
        all_suggestions = []
        for obj in response.json()['songs']['data']:
            song = Song(
                song_id=obj['id'], title=obj['title'],
                image=obj['image'] if 'image' in obj else None,
                album=obj['album'] if 'album' in obj else obj['more_info']['album'],
                url=obj['url'] if 'url' in obj else None,
                description=obj['description'] if 'description' in obj else obj['title'],
                primary_artists=obj['more_info']['primary_artists'] if 'primary_artists' in obj['more_info'] else None,
                singers=Saavn._get_all_singers(obj['more_info']['singers']) if 'singers' in obj['more_info'] else None,
                language=obj['more_info']['language'] if 'language' in obj['more_info'] else None
            )
            all_suggestions.append(song)

        return all_suggestions

    def get_complete_song_details(self, song: Song) -> Song:
        Saavn.logger.info(f'Getting details for song: {song}...')
        params = {
            '__call': 'song.getDetails',
            'pids': f'{song.song_id}',
            **Saavn.common_api_params
        }

        response = self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)
        data = response.json()['songs'][0]
        song.encrypted_media_url = data['more_info']['encrypted_media_url']
        song.duration = int(data['more_info']['duration'])
        song.release_date = Saavn._format_date(data['more_info']['release_date'])
        return song

    def create_radio(self, song: Song) -> str:
        Saavn.logger.info(f'Creating radio for song: {song}...')
        params = {
            '__call': 'webradio.createEntityStation',
            'entity_id': f'[{song.song_id}]',
            'entity_type': 'queue',
            'freemium': '',
            'shared': '',
            **Saavn.common_api_params
        }

        response = self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)
        data = response.json()
        self._get_song_to_radio(song, data['stationid'])
        return data['stationid']

    def generate_song(self, song: Song) -> Optional[str]:
        '''
        :param song: Complete Song Details
        :return: Generated URL
        '''
        Saavn.logger.info(f'Generating music URL for song: {song}...')
        params = {
            '__call': 'song.generateAuthToken',
            'url': f'{song.encrypted_media_url}',
            'bitrate': '128',
            **Saavn.common_api_params
        }

        response = self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)
        data = response.json()
        if data['status'] == 'success':
            return data['auth_url']

    def generate_download_url(self, song: Song) -> Optional[str]:
        self.get_complete_song_details(song)
        # self.create_radio(song)

        return self.generate_song(song)

    def _get_song_to_radio(self, song: Song, station_id: str) -> None:
        Saavn.logger.info(f'Getting song: {song} to station: {station_id}')
        params = {
            '__call': 'webradio.getSong',
            'stationid': f'{station_id}',
            'k': '5',
            'next': '1',
            **Saavn.common_api_params
        }

        self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)

    def _visit_site(self) -> None:
        self.session.get(Saavn.BASE_URL, headers=headers.visit_site)

    @staticmethod
    def _get_all_singers(singers: str) -> List[str]:
        return [singer.strip() for singer in singers.split(',')]

    @staticmethod
    def _format_date(date_str: str) -> datetime.datetime:
        return datetime.datetime.strptime(date_str, '%Y-%m-%d')
