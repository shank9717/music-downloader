import datetime
import logging
import os
import re
import unicodedata
from contextlib import contextmanager
from io import BytesIO
from typing import Optional, List

import requests
from PIL import Image
from moviepy.editor import AudioFileClip
from mutagen.easyid3 import EasyID3
from mutagen.id3 import ID3, APIC
from mutagen.mp3 import MP3

from api.music_api import MusicApi


def create_folder_if_not_exist(folder_name: str) -> None:
    if not os.path.isdir(folder_name):
        os.makedirs(folder_name)


class Song:
    logger = logging.getLogger('Song')
    DOWNLOAD_PATH = 'Downloads/'

    def __init__(self, song_id: Optional[str] = None, title: Optional[str] = None, image: Optional[str] = None,
                 album: Optional[str] = None, url: Optional[str] = None, description: Optional[str] = None,
                 primary_artists: Optional[str] = None, singers: Optional[List[str]] = None,
                 language: Optional[str] = None, encrypted_media_url: Optional[str] = None,
                 duration: Optional[int] = None, release_date: Optional[datetime.datetime] = None,
                 genre: Optional[str] = None):
        self.song_id = song_id
        self.title = title
        self.image = image
        self.full_image = re.sub(r'-\d{2,3}x\d{2,3}.(jpg|jpeg|png)', '-500x500.\\1', image)
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

    def generate_download_url(self, music_api: MusicApi) -> str:
        return music_api.generate_download_url(self)

    def download(self, music_api: MusicApi, file_name: str = None) -> None:
        create_folder_if_not_exist(Song.DOWNLOAD_PATH)
        url = self.generate_download_url(music_api)
        file_name = file_name if file_name else self._get_mp4_file_name()
        download_file_path = os.path.join(Song.DOWNLOAD_PATH, file_name)
        song_data = requests.get(url)

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
