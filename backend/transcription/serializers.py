# transcription/serializers.py

from rest_framework import serializers
from .models import VideoUpload

class VideoUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoUpload
        fields = ['video', 'transcription', 'uploaded_at']
