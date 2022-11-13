import re
from typing import Optional, List

from music_downloader_module.module.models.music_obj_type import MusicObjectType
from music_downloader_module.module.models.song_model import Song


class Artist(MusicObjectType):
    def __init__(self, artist_id: Optional[str] = None, token_id: Optional[str] = None, name: Optional[str] = None,
                 image: Optional[str] = None, url: Optional[str] = None,
                 songs: Optional[List[Song]] = None):
        super().__init__()
        self.type = 'Artist'
        self.artist_id = artist_id
        self.token_id = token_id if token_id else url.split('/')[-1].strip()
        self.name = name
        self.image = image
        self.full_image = re.sub(r'-\d{2,3}x\d{2,3}.(jpg|jpeg|png)', '-500x500.\\1', image)
        self.url = url
        self.description = self.name
        self.songs = songs

    def to_json(self) -> dict:
        dict_items = self.__dict__
        dict_items['songs'] = [song.to_json() for song in self.songs]
        return dict_items