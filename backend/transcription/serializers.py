from rest_framework import serializers
from django.conf import settings
from .models import VideoUpload

class VideoUploadSerializer(serializers.ModelSerializer):
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = VideoUpload
        fields = ['id', 'video_url', 'transcription', 'uploaded_at']

    def get_video_url(self, obj):
        request = self.context.get('request')
        if obj.video:
            return request.build_absolute_uri(obj.video.url)
        return None
