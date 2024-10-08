from django.db import models

# Create your models here.
class Song(models.Model):
    song_id = models.CharField()
    title = models.CharField()
    image = models.CharField()
    full_image = models.CharField()
    album = models.CharField()
    url = models.CharField()
    description = models.CharField()
    primary_artists = models.CharField()
    singers = models.CharField()
    language = models.CharField()
    encrypted_media_url = models.CharField()
    duration = models.IntegerField()
    release_date = models.DateTimeField()
    genre = models.CharField()
    preview_url = models.CharField()