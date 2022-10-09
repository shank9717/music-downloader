import datetime
import logging
import os
from typing import Optional, List

import requests

from api.music_api import MusicApi


def create_folder_if_not_exist(folder_name: str) -> None:
    if not os.path.isdir(folder_name):
        os.makedirs(folder_name)


class Song:
    logger = logging.getLogger('Song')
    DOWNLOAD_PATH = '.'

    def __init__(self, song_id: Optional[str] = None, title: Optional[str] = None, image: Optional[str] = None,
                 album: Optional[str] = None, url: Optional[str] = None, description: Optional[str] = None,
                 primary_artists: Optional[str] = None, singers: Optional[List[str]] = None,
                 language: Optional[str] = None, encrypted_media_url: Optional[str] = None,
                 duration: Optional[int] = None, release_date: Optional[datetime.datetime] = None):
        self.song_id = song_id
        self.title = title
        self.image = image
        self.album = album
        self.url = url
        self.description = description
        self.primary_artists = primary_artists
        self.singers = singers
        self.language = language
        self.encrypted_media_url = encrypted_media_url
        self.duration = duration
        self.release_date = release_date

    def generate_download_url(self, music_api: MusicApi) -> str:
        return music_api.generate_download_url(self)

    def download(self, music_api: MusicApi, file_name: str = None) -> None:
        create_folder_if_not_exist(Song.DOWNLOAD_PATH)
        url = self.generate_download_url(music_api)
        file_name = file_name if file_name else self._get_file_name()
        song_data = requests.get(url)
        download_file_path = f'{Song.DOWNLOAD_PATH}/{file_name}'

        Song.logger.info(f'Downloading {self} to file {download_file_path}')
        with open(download_file_path, 'wb') as f:
            for chunk in song_data.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        Song.logger.info(f'Downloaded {download_file_path}')

    def __str__(self) -> str:
        return f'{self.title} - {self.description}'

    def __repr__(self):
        return f'{self.title} - {self.description}'

    def _get_file_name(self):
        return f'{self.title}.mp3'
