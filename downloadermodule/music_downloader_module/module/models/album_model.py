import re
from typing import Optional, List

from music_downloader_module.module.models.song_model import Song
from music_downloader_module.module.models.music_obj_type import MusicObjectType


class Album(MusicObjectType):
    def __init__(self, album_id: Optional[str] = None, token_id: Optional[str] = None,
                 title: Optional[str] = None, image: Optional[str] = None, album: Optional[str] = None,
                 url: Optional[str] = None, description: Optional[str] = None, artist: Optional[str] = None,
                 language: Optional[str] = None, year: Optional[int] = None,
                 song_pids: Optional[List[str]] = None, songs: Optional[List[Song]] = None,
                 genre: Optional[str] = None, preview_url: Optional[str] = None):
        self.album_id = album_id
        self.token_id = token_id
        self.title = title
        self.image = image
        self.full_image = re.sub(r'-\d{2,3}x\d{2,3}.(jpg|jpeg|png)', '-500x500.\\1', image)
        self.album = album
        self.url = url
        self.description = description
        self.artist = artist
        self.language = language
        self.year = year
        self.genre = genre
        self.preview_url = preview_url
        self.song_pids = song_pids
        self.songs = songs

    def to_json(self) -> dict:
        dict_items = self.__dict__
        dict_items['songs'] = [song.to_json() for song in self.songs]
        return dict_items