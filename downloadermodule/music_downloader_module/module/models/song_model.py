import datetime
import logging
import os
import re
import syncedlyrics
import unicodedata
from contextlib import contextmanager
from io import BytesIO
from typing import Optional, List, Tuple

import requests
from PIL import Image
from lyricsgenius import Genius
from moviepy.editor import AudioFileClip
from mutagen.easyid3 import EasyID3
from mutagen.id3 import ID3, APIC, USLT, SYLT, Encoding
from mutagen.mp3 import MP3

from music_downloader_module.module.api.music_api import MusicApi

from music_downloader_module.module.models.music_obj_type import MusicObjectType


def create_folder_if_not_exist(folder_name: str) -> None:
    if not os.path.isdir(folder_name):
        os.makedirs(folder_name)


class Song(MusicObjectType):
    logger = logging.getLogger('Song')
    DOWNLOAD_PATH = 'Downloads/'

    def __init__(self, song_id: Optional[str] = None, title: Optional[str] = None, image: Optional[str] = None,
                 album: Optional[str] = None, url: Optional[str] = None, description: Optional[str] = None,
                 primary_artists: Optional[str] = None, singers: Optional[List[str]] = None,
                 language: Optional[str] = None, encrypted_media_url: Optional[str] = None,
                 duration: Optional[int] = None, release_date: Optional[datetime.datetime] = None,
                 genre: Optional[str] = None, preview_url: Optional[str] = None):
        super().__init__()
        self.type = 'Song'
        self.song_id = song_id
        self.title = title
        self.image = image
        self.full_image = None if not image else re.sub(r'-\d{2,3}x\d{2,3}.(jpg|jpeg|png)', '-500x500.\\1', image)
        self.album = album
        self.url = url
        self.description = description
        self.primary_artists = primary_artists
        self.singers = singers
        self.language = language
        self.encrypted_media_url = encrypted_media_url
        self.duration = duration
        self.release_date = release_date
        self.genre = genre
        self.preview_url = preview_url
        self.lyrics_api = None

    def generate_download_url(self, music_api: MusicApi) -> str:
        return music_api.generate_download_url(self)

    def get_song_preview(self, music_api: MusicApi) -> bytes:
        if self.preview_url:
            data = requests.get(self.preview_url)
            return data.content
        else:
            download_file_path, song_data = self.get_song_data(music_api)
            return self._sample_song(song_data)

    def _sample_song(self, song_data: requests.Response) -> bytes:
        # TODO: Implement logic to trim song
        return song_data.content

    def download(self, music_api: MusicApi, file_name: Optional[str] = None) -> Optional[str]:
        create_folder_if_not_exist(Song.DOWNLOAD_PATH)
        download_file_path, song_data = self.get_song_data(music_api, file_name)

        Song.logger.info(f'Downloading {self} to file {download_file_path}')
        with open(download_file_path, 'wb') as f:
            for chunk in song_data.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        Song.logger.info(f'Downloaded {download_file_path}')
        new_path = self._convert_to_mp3(download_file_path)
        Song.logger.info(f'Converted to mp3: {new_path}')
        self._set_metadata(new_path)
        Song.logger.info(f'Added metadata to file {new_path}')
        return os.path.abspath(new_path)

    def get_song_data(self, music_api: MusicApi, file_name: Optional[str] = None) -> Tuple[str, requests.Response]:
        url = self.generate_download_url(music_api)
        file_name = file_name if file_name else self._get_mp4_file_name()
        download_file_path = os.path.join(Song.DOWNLOAD_PATH, file_name)
        song_data = requests.get(url)
        return download_file_path, song_data

    def _set_metadata(self, file: str) -> None:
        audio = MP3(file, ID3=ID3)
        try:
            img_data = requests.get(self.full_image).content
            img = Image.open(BytesIO(img_data))
            img_type = img.get_format_mimetype()
            audio.tags.add(
                APIC(
                    encoding=3,
                    mime=img_type,
                    type=3,
                    desc=u'Cover',
                    data=img_data
                )
            )
            audio.save()
            img.close()
        except:
            pass
        audio = EasyID3(file)
        if self.title:
            audio['title'] = self.title
        if self.primary_artists:
            audio['artist'] = self.primary_artists
        if self.album:
            audio['album'] = self.album
        if self.genre:
            audio['genre'] = self.genre
        audio.save()

        self.set_lyrics(file)

    def set_lyrics(self, file: str) -> None:
        try:
            lrc = syncedlyrics.search(f'{self.title} {self.primary_artists}')
            parsed_lyrics = self.parse_synced_lyrics(lrc)
            non_sync_lyrics = self.concatenate_slrt_lyrics(lrc)
            tags = ID3(file)
            tags.setall("SYLT", [SYLT(encoding=Encoding.UTF8, lang='eng', format=2, type=1, text=parsed_lyrics)])
            tags[u"USLT::'eng'"] = USLT(encoding=3, lang=u'eng', desc=u'desc', text=non_sync_lyrics)
            tags.save(file)
        except:
            logging.error('Unable to set synced lyrics')

    @contextmanager
    def get_image(self) -> Image:
        r = requests.get(self.full_image)
        image = Image.open(BytesIO(r.content))
        try:
            yield image
        finally:
            image.close()

    def __str__(self) -> str:
        return f'{self.title} - {self.description}'

    def __repr__(self):
        return f'{self.title} - {self.description}'

    @staticmethod
    def slugify(value: str, allow_unicode: bool = False) -> str:
        """
        Taken from https://github.com/django/django/blob/master/django/utils/text.py
        """
        value = str(value)
        if allow_unicode:
            value = unicodedata.normalize('NFKC', value)
        else:
            value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
        value = re.sub(r'[^\w\s-]', '', value.lower())
        return re.sub(r'[-\s]+', '-', value).strip('-_')

    def _get_mp4_file_name(self):
        return f'{self.slugify(str(self))}.mp4'

    def _get_mp3_file_name(self):
        return f'{self.slugify(str(self))}.mp3'

    def _convert_to_mp3(self, download_file_path: str) -> str:
        new_path = os.path.join(Song.DOWNLOAD_PATH, self._get_mp3_file_name())
        video = AudioFileClip(download_file_path)
        video.write_audiofile(new_path)
        video.close()
        os.remove(download_file_path)
        return new_path

    def to_json(self) -> dict:
        return self.__dict__

    @staticmethod
    def parse_synced_lyrics(lyrics: str):
        sync_lrc = []
        pattern = re.compile(r'\[(\d+):(\d+\.\d+)\] (.*)')

        for line in lyrics.splitlines():
            match = pattern.match(line)
            if match:
                minutes = int(match.group(1))
                seconds = float(match.group(2))
                text = match.group(3)

                timestamp_ms = int((minutes * 60 + seconds) * 1000)
                sync_lrc.append((text, timestamp_ms))

        return sync_lrc

    @staticmethod
    def strip_timestamps(lyrics: str):
        pattern = re.compile(r'\[\d+:\d+\.\d+\] (.*)')
        stripped_lyrics = "\n".join(match.group(1) for line in lyrics.splitlines() if (match := pattern.match(line)))
        return stripped_lyrics

    @staticmethod
    def from_mp3_file(file_path: str) -> Optional['Song']:
        try:
            audio = EasyID3(file_path)

            title = audio.get('title')
            primary_artists = audio.get('artist')
            album = audio.get('album')
            genre = audio.get('genre')

            title = title[0] if title else None
            primary_artists = primary_artists[0] if primary_artists else None
            album = album[0] if album else None
            genre = genre[0] if genre else None

            return Song(title=title, primary_artists=primary_artists, album=album, genre=genre)
        except:
            return None

    @staticmethod
    def concatenate_slrt_lyrics(lyrics: str):
        pattern = re.compile(r'\[\d+:\d+\.\d+\] (.*)')
        stripped_lyrics = "\n".join(match.group(1) for line in lyrics.splitlines() if (match := pattern.match(line)))
        return stripped_lyrics