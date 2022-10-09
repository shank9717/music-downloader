import logging

from api.saavn.saavn_api import Saavn


def main():
    saavn_api = Saavn()
    # song = saavn_api.get_song_from_prompt()
    # logging.info(f'Song found: {song}')
    song = saavn_api.get_most_relevant_song('Industry Baby')
    song.download(saavn_api)


def setup_logging():
    logging.basicConfig(level=logging.INFO)


if __name__ == '__main__':
    setup_logging()
    main()
