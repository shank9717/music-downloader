import datetime
import logging
from html import unescape
from typing import Optional, List
from urllib.parse import quote

from requests import Session

from music_downloader_module.module.api.music_api import MusicApi
from music_downloader_module.module.api.saavn import headers
from music_downloader_module.module.models.album_model import Album
from music_downloader_module.module.models.song_model import Song
from music_downloader_module.module.models.artist_model import Artist


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

    def get_detail_artist_info(self, artist_token_id: str) -> dict:
        Saavn.logger.info(f'Searching for artist: {artist_token_id}...')
        params = {
            '__call': 'webapi.get',
            'token': artist_token_id,
            'type': 'artist',
            'p': '0',
            'n_song': '50',
            'n_album': '50',
            'sub_type': '',
            'category': '',
            'sort_order': '',
            'includeMetaTags': '0',
            **Saavn.common_api_params
        }

        response = self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)
        return response.json()

    def get_detail_album_info(self, album_token_id: str) -> dict:
        Saavn.logger.info(f'Searching for album: {album_token_id}...')
        params = {
            '__call': 'webapi.get',
            'token': album_token_id,
            'type': 'album',
            'includeMetaTags': '0',
            **Saavn.common_api_params
        }

        response = self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)
        return response.json()

    def get_suggestions(self, prompt: str) -> List[Song]:
        Saavn.logger.info(f'Searching for song: {prompt}...')
        params = {
            '__call': 'autocomplete.get',
            'query': f'{quote(prompt)}',
            **Saavn.common_api_params
        }
        del params['api_version']

        response = self.session.get(Saavn.API_URL, headers=headers.api_headers, params=params)
        all_suggestions = []

        artists: List[dict] = response.json()['artists']['data']
        top_result_list = response.json()['topquery']['data']
        if top_result_list:
            top_result = top_result_list[0]
            top_result_id = top_result['id']
        else:
            top_result = {}
            top_result_id = ''
        if 'type' in top_result and top_result['type'].lower() == 'artist':
            artists.insert(0, top_result)

        for obj in artists:
            artist = self._parse_obj_as_artist(obj)
            if artist.artist_id == top_result_id:
                artist.is_top_result = True
            all_suggestions.append(artist)

        for obj in response.json()['albums']['data']:
            album = self._parse_obj_as_album(obj)
            if album.album_id == top_result_id:
                album.is_top_result = True
            all_suggestions.append(album)

        for obj in response.json()['songs']['data']:
            song = self._parse_obj_as_song(obj)
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

    def _parse_obj_as_artist(self, obj: dict) -> Artist:
        token_id = self._get_token_id(obj)
        updated_obj = self.get_detail_artist_info(token_id)
        return Artist(
            artist_id=updated_obj['artistId'],
            token_id=token_id,
            name=updated_obj['name'],
            image=updated_obj['image'],
            url=self.get_url(obj),
            songs=self._get_songs_of_artist(updated_obj)
        )

    def _parse_obj_as_album(self, obj: dict) -> Album:
        return Album(
            album_id=obj['id'],
            token_id=self._get_token_id(obj),
            title=unescape(obj['title']),
            image=obj['image'] if 'image' in obj else None,
            description=unescape(obj['description']) if 'description' in obj else None,
            artist=unescape(obj['more_info']['music']) if 'music' in obj['more_info'] else unescape(obj['music']),
            url=self.get_url(obj),
            year=int(obj['more_info']['year']) if 'year' in obj['more_info'] else None,
            song_pids=self._get_all_pids(obj['more_info']['song_pids']) if 'song_pids' in obj['more_info'] else [],
            songs=self._get_songs(self._get_token_id(obj))
        )

    def _parse_obj_as_song(self, obj: dict) -> Song:
        return Song(
            song_id=obj['id'],
            title=unescape(obj['title']),
            image=obj['image'] if 'image' in obj else None,
            album=unescape(obj['album']) if 'album' in obj else unescape(obj['more_info']['album']),
            url=self.get_url(obj),
            description=unescape(obj['description']) if 'description' in obj else unescape(obj['title']),
            primary_artists=self._get_primary_artist_from_song_obj(obj),
            singers=self._get_all_singers_from_song_obj(obj),
            release_date=self._get_date(
                obj['more_info']['release_date'] if 'release_date' in obj['more_info'] else None),
            language=obj['more_info']['language'] if 'language' in obj['more_info'] else obj['language'],
            preview_url=obj['more_info']['vlink'] if 'vlink' in obj['more_info'] else None
        )

    def _visit_site(self) -> None:
        self.session.get(Saavn.BASE_URL, headers=headers.visit_site)

    @staticmethod
    def _get_all_singers(singers: str) -> List[str]:
        return [singer.strip() for singer in singers.split(',')]

    @staticmethod
    def _format_date(date_str: str) -> datetime.datetime:
        return datetime.datetime.strptime(date_str, '%Y-%m-%d')

    def _get_songs(self, album_token_id: str) -> List[Song]:
        obj = self.get_detail_album_info(album_token_id)
        album_songs = []
        for song_obj in obj['list']:
            album_songs.append(self._parse_obj_as_song(song_obj))

        return album_songs

    def _get_token_id(self, obj: dict) -> str:
        url = self.get_url(obj)
        return url.split('/')[-1]

    @staticmethod
    def get_url(obj: dict) -> str:
        url = obj['perma_url'] if 'perma_url' in obj else obj['url']
        return url

    @staticmethod
    def _get_date(date_str: str) -> datetime.datetime:
        return datetime.datetime.strptime(date_str, '%Y-%m-%d') if date_str else None

    @staticmethod
    def _get_primary_artist_from_song_obj(obj: dict) -> str:
        detailed_info = obj['more_info']
        if 'primary_artists' in detailed_info:
            return unescape(detailed_info['primary_artists'])
        if 'artistMap' in detailed_info and 'primary_artists' in detailed_info['artistMap'] and len(detailed_info['artistMap']['primary_artists']) > 0:
            return detailed_info['artistMap']['primary_artists'][0]['name']

    @staticmethod
    def _get_all_singers_from_song_obj(obj: dict) -> List[str]:
        detailed_info = obj['more_info']
        if 'singers' in detailed_info:
            return Saavn._get_all_singers(unescape(detailed_info['singers']))
        if 'artistMap' in detailed_info and 'artists' in detailed_info['artistMap']:
            all_artists: list = detailed_info['artistMap']['artists']
            return list(map(lambda artist: artist['name'], all_artists))

    @staticmethod
    def _get_all_pids(pids: str) -> List[str]:
        return [pid.strip() for pid in pids.split(',')]

    def _get_songs_of_artist(self, obj: dict) -> List[Song]:
        return [self._parse_obj_as_song(song_obj) for song_obj in obj['topSongs']]
