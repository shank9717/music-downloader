import json
from typing import List
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from .module.api.music_api import MusicApi
from .module.api.saavn.saavn_api import Saavn
from .module.models.song_model import Song
from django.views.decorators.csrf import csrf_exempt

music_api: MusicApi = Saavn()


def get_most_relevant_song(request: HttpRequest, name: str) -> JsonResponse:
    song: Song = music_api.get_most_relevant_song(name)
    return JsonResponse(song.__dict__, safe=False)

def get_suggestions(request: HttpRequest, prompt: str) -> JsonResponse:
    songs: List[Song] = music_api.get_suggestions(prompt)
    if songs:
        return JsonResponse([song.__dict__ for song in songs], safe=False)

def generate_download_url(request: HttpRequest, song: Song) -> JsonResponse:
    raise NotImplementedError()

def validate_data(data: dict) -> dict:
    allowed_keys = ['song_id', 'title', 'image', 'album', 'url', 'description', 'primary_artists', 'singers', 'language', 'encrypted_media_url', 'duration', 'release_date', 'genre', 'preview_url']
    new_data = {}
    for key in data:
        if key in allowed_keys:
            new_data[key] = data[key]
    return new_data

@csrf_exempt
def download_song(request: JsonResponse) -> JsonResponse:
    data = json.loads(request.body)
    data = validate_data(data)
    song: Song = Song(**data)
    path = song.download(music_api=music_api)
    return JsonResponse({
        'download_path': path
    })
    