import json
import os
from typing import List
from wsgiref.util import FileWrapper
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from .module.api.music_api import MusicApi
from .module.api.saavn.saavn_api import Saavn
from .module.models.song_model import Song
from django.views.decorators.csrf import csrf_exempt

music_api: MusicApi = Saavn()


def get_most_relevant_song(request: HttpRequest, name: str) -> JsonResponse:
    if request.method == 'GET':
        song: Song = music_api.get_most_relevant_song(name)
        return JsonResponse(song.__dict__, safe=False)

def get_suggestions(request: HttpRequest, prompt: str) -> JsonResponse:
    if request.method == 'GET':
        songs: List[Song] = music_api.get_suggestions(prompt)
        if songs:
            return JsonResponse([song.__dict__ for song in songs], safe=False)
        else:
            return JsonResponse([])
    elif request.method == 'OPTIONS':
        response = HttpResponse()
        response['Content-Type'] = 'application/json'
        return response

def generate_download_url(request: HttpRequest, song: Song) -> JsonResponse:
    raise NotImplementedError()

def validate_data(data: dict) -> dict:
    allowed_keys = ['song_id', 'title', 'image', 'album', 'url', 
                    'description', 'primary_artists', 'singers', 
                    'language', 'encrypted_media_url', 'duration', 
                    'release_date', 'genre', 'preview_url']
    new_data = {}
    for key in data:
        if key in allowed_keys:
            new_data[key] = data[key]
    return new_data

@csrf_exempt
def download_song(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        data = json.loads(request.body)
        data = validate_data(data['item'])
        song: Song = Song(**data)
        path = song.download(music_api=music_api)
        
        wrapper = FileWrapper(open(path, 'rb'))
        response = HttpResponse(wrapper, content_type='text/plain')
        response['Access-Control-Expose-Headers'] = 'Content-Disposition'
        response['Content-Disposition'] = 'attachment; filename=%s' % os.path.basename(path)
        response['Content-Length'] = os.path.getsize(path)
        return response
    elif request.method == 'OPTIONS':
        response = HttpResponse()
        response['Content-Disposition'] = 'attachment'
        return response