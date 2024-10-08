# import dataclasses
# import logging
# import os
# import pickle
# import random
# import re
# import time
# from io import BytesIO
# from typing import Optional
#
# import requests
# from PIL import Image
# from moviepy.audio.io.AudioFileClip import AudioFileClip
# from music_downloader_module.module.api.saavn.saavn_api import Saavn
#
# from music_downloader_module.module.models.song_model import Song
# import mutagen
# from mutagen.easyid3 import EasyID3
# from mutagen.id3 import ID3, TIT2, TALB, TDRC, APIC, TCON, USLT
# from mutagen.mp3 import MP3
# from mutagen.mp4 import MP4
# from lyricsgenius import Genius
#
# genius = Genius("")
#
# with open(r'E:\Programming\Python\music-downloader\downloadermodule\music_downloader_module\module\liked_tracks',
#           'rb') as f:
#     tracks = pickle.loads(f.read())
#
#
#
#
# def main():
#     # saavn_api = Saavn()
#     #
#     # downloaded_metadatas = []
#     # skipped_songs = []
#     #
#     # download_path = 'E:/Songs/{}.mp3'
#     # new_path = 'E:/ConvertedSongs/{}.mp3'
#     #
#     # for song in tracks:
#     #     set_lyrics = True
#     #     try:
#     #         search_string = f'{song["name"]} {song["artists"][0]["name"]}'.strip()
#     #         final_file = download_path.format(convert_to_valid_filename(search_string, ''))
#     #         new_file = new_path.format(convert_to_valid_filename(search_string, '_'))
#     #
#     #         if os.path.exists(new_file):
#     #             metadata = get_song_metadata(new_file)
#     #             song_lyrics = genius.search_song(metadata.title, metadata.primary_artists)
#     #             if set_lyrics:
#     #                 add_lyrics(new_file, song_lyrics.lyrics.split('Lyrics')[1])
#     #                 continue
#     #         else:
#     #             continue
#     #         results = [song for song in saavn_api.get_suggestions(clean_text(search_string)) if isinstance(song, Song)]
#     #
#     #         if len(results) == 0:
#     #             skipped_songs.append(song)
#     #             continue
#     #
#     #         to_download = results[0]
#     #
#     #         download_url = saavn_api.generate_download_url(to_download)
#     #         if download_url is None:
#     #             skipped_songs.append(song)
#     #             continue
#     #
#     #         if not os.path.exists(final_file):
#     #             session = saavn_api.session
#     #             save_mp3_stream(download_url, final_file, session)
#     #         # add_song_metadata_mp4(final_file, to_download)
#     #
#     #         new_file = convert_to_mp3(final_file, new_file)
#     #         print(f'Converted to mp3: {new_file}')
#     #         set_metadata(new_file, to_download, song)
#     #         print(f'Added metadata to file {new_file}')
#     #
#     #         time.sleep(random.randint(5, 10))
#     #     except Exception as e:
#     #         print(e)
#     #
#     # pickle.dump(skipped_songs, open('skipped_songs', 'wb'))
#     # pickle.dump(downloaded_metadatas,  open('downloaded_metadatas', 'wb'))
#
#     files = ['E:/ConvertedSongs/{}'.format(filename) for filename in os.listdir('E:\ConvertedSongs')]
#
#     missed_files = []
#     for new_file in files:
#         try:
#             set_lyrics_for_file(new_file)
#         except:
#             missed_files.append(new_file)
#
#     for file in missed_files:
#         try:
#             set_lyrics_for_file(file)
#             missed_files.remove(file)
#         except:
#             pass
#
#     print(missed_files)
#
# def set_lyrics_for_file(new_file):
#     set_lyrics = True
#     metadata = get_song_metadata(new_file)
#     song_lyrics = genius.search_song(metadata.title, metadata.primary_artists)
#     if set_lyrics:
#         add_lyrics(new_file, song_lyrics.lyrics.split('Lyrics')[1])
#     time.sleep(1)
#
#
# def convert_to_mp3(download_file_path: str, new_file: str) -> str:
#     video = AudioFileClip(download_file_path)
#     video.write_audiofile(new_file)
#     video.close()
#     return new_file
#
#
# def add_lyrics(new_file, lyrics):
#     tags  = ID3(new_file)
#     tags[u"USLT::'eng'"] = (USLT(encoding=3, lang=u'eng', desc=u'desc', text=lyrics))
#     tags.save(new_file)
#
# def set_metadata(file: str, song_info: Song, spotify_song_metadata: Optional[dict] = None) -> None:
#     audio = MP3(file, ID3=ID3)
#     try:
#         img_data = requests.get(song_info.full_image).content
#         img = Image.open(BytesIO(img_data))
#         img_type = img.get_format_mimetype()
#         audio.tags.add(
#             APIC(
#                 encoding=3,
#                 mime=img_type,
#                 type=3,
#                 desc=u'Cover',
#                 data=img_data
#             )
#         )
#         audio.save()
#         img.close()
#     except:
#         pass
#     audio = EasyID3(file)
#     if song_info.title:
#         audio['title'] = song_info.title
#     if song_info.primary_artists:
#         audio['artist'] = song_info.primary_artists
#     if song_info.album:
#         audio['album'] = song_info.album
#     if song_info.genre:
#         audio['genre'] = song_info.genre
#     if song_info.release_date:
#         audio["date"] = [str(song_info.release_date.year)]
#     elif spotify_song_metadata:
#         try:
#             audio["date"] = [spotify_song_metadata['album']['release_date'][:4]]
#         except:
#             pass
#
#     audio.save()
#
# def get_song_metadata(file_path: str) -> Song:
#     audio = EasyID3(file_path)
#     title = audio['title'][0] if 'title' in audio else None
#     artist = audio['artist'][0] if 'artist' in audio else None
#     album = audio['album'][0] if 'album' in audio else None
#     genre = audio['genre'][0] if 'genre' in audio else None
#     release_date = audio["date"][0] if 'date' in audio else None
#     return Song(title=title, primary_artists=artist, album=album, genre=genre, release_date=release_date, image='')
#
#
# def add_song_metadata(file_path: str, song_info: Song, spotify_song_metadata: Optional[dict] = None):
#     try:
#         # Load the song file using Mutagen
#         audio = mutagen.File(file_path, easy=True)
#
#         # Check if the file is an MP3 audio file
#         if isinstance(audio, mutagen.mp3.MP3):
#
#             # Create an ID3 tag if it doesn't exist
#             if audio.tags is None:
#                 audio.add_tags()
#
#             # Set song metadata
#             audio.tags.add(TIT2(encoding=3, text=song_info.title))
#             audio.tags.add(TALB(encoding=3, text=song_info.album))
#             audio.tags.add(TDRC(encoding=3, text=str(song_info.release_date.year)))
#
#             # Add album cover (image) to metadata from a URL
#             if song_info.full_image:
#                 response = requests.get(song_info.full_image)
#                 if response.status_code == 200:
#                     image_data = BytesIO(response.content)
#                     audio.tags.add(APIC(encoding=3, mime='image/jpeg', type=3, desc=u'Cover', data=image_data.read()))
#
#             # Set genre
#             if song_info.genre:
#                 audio.tags.add(TCON(encoding=3, text=song_info.genre))
#
#             # Save changes to the file
#             audio.save()
#
#         else:
#             print("Unsupported audio format. Only MP3 files are supported.")
#
#     except Exception as e:
#         print(f"An error occurred while adding metadata: {str(e)}")
#
#
# def add_song_metadata_mp4(file_path: str, song_info: Song, spotify_song_metadata: Optional[dict] = None):
#     try:
#         # Load the MP4 audio file using Mutagen
#         audio = MP4(file_path)
#
#         # Set song metadata
#         audio["\xa9nam"] = [song_info.title]
#         audio["\xa9alb"] = [song_info.album]
#         if song_info.release_date:
#             audio["\xa9day"] = [str(song_info.release_date.year)]
#         elif spotify_song_metadata:
#             try:
#                 audio["\xa9day"] = [spotify_song_metadata['album']['release_date'][:4]]
#             except:
#                 pass
#
#         # Add album cover (image) to metadata from a URL
#         if song_info.full_image:
#             response = requests.get(song_info.full_image)
#             if response.status_code == 200:
#                 image_data = BytesIO(response.content)
#                 audio["covr"] = [mutagen.mp4.MP4Cover(image_data.read(), imageformat=mutagen.mp4.MP4Cover.FORMAT_JPEG)]
#
#         # Set genre
#         if song_info.genre:
#             audio["\xa9gen"] = [song_info.genre]
#
#         if song_info.primary_artists:
#             audio["\xa9ART"] = [song_info.primary_artists]
#
#         # Save changes to the file
#         audio.save(file_path)
#
#     except Exception as e:
#         print(f"An error occurred while adding metadata: {str(e)}")
#
# def save_mp3_stream(url, filename, session: requests.Session = None):
#     """Saves an MP3 stream from a URL to a filename.
#
#     Args:
#       url: The URL of the MP3 stream.
#       filename: The filename to save the MP3 stream to.
#     """
#
#     if not session:
#         session = requests.session()
#
#     response = session.get(url, stream=True)
#
#     with open(filename, 'wb') as song_file:
#         for chunk in response.iter_content(chunk_size=1024):
#             song_file.write(chunk)
#
#     if os.path.exists(filename):
#         print('MP3 stream saved successfully to "{}"'.format(filename))
#     else:
#         print('Failed to save MP3 stream to "{}"'.format(filename))
#
#
# def convert_to_valid_filename(string, replacement: str):
#     string = re.sub(r'[^\w\-_\.]', replacement, string)
#     return string
#
# def clean_text(text):
#   return re.sub(r'\([^)]*\)', '', text)
#
# @dataclasses.dataclass
# class DownloadedSongModel:
#     requested_song_name: str
#     requested_song_primary_artist: str
#     requested_song_album_name: str
#     found_song_name: str
#     found_song_primary_artist: str
#     found_song_album_name: str
#
#
# def setup_logging():
#     logging.basicConfig(level=logging.INFO)
#
#
# if __name__ == '__main__':
#     setup_logging()
#     main()
