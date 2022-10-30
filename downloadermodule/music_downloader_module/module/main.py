import logging

from music_downloader_module.module.api.saavn.saavn_api import Saavn


def main():
    saavn_api = Saavn()
    song = saavn_api.get_suggestions('let me down')
    # with open('download.txt', 'r') as f:
    #     song_list = f.readlines()
    # for song in song_list:
    #     song_item = saavn_api.get_most_relevant_song(song.strip())
    #     logging.info(f'Song found: {song_item}')
    #     song_item.download(saavn_api)


def setup_logging():
    logging.basicConfig(level=logging.INFO)


if __name__ == '__main__':
    setup_logging()
    main()
