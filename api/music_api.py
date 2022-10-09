from typing import List, Optional


class MusicApi:
    def get_most_relevant_song(self, prompt: str) -> Optional['Song']:
        raise NotImplementedError()

    def get_song_from_prompt(self) -> 'Song':
        raise NotImplementedError()

    def get_suggestions(self, prompt: str) -> List['Song']:
        raise NotImplementedError()

    def generate_download_url(self, song: 'Song') -> Optional[str]:
        raise NotImplementedError()
