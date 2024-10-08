from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('song/<name>', views.get_most_relevant_song),
    path('search/<prompt>', views.get_suggestions),
    path('download', views.download_song),
]
