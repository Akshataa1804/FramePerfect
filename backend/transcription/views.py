from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.urls import reverse
import whisper
import os

from .models import VideoUpload
from .serializers import VideoUploadSerializer

# Load Whisper Model (Only Once)
model = whisper.load_model("base")

class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({
            "upload_video": request.build_absolute_uri(reverse('upload_video')),
        })

class VideoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'video' not in request.FILES:
            return Response({'error': 'No file uploaded'}, status=400)

        file_obj = request.FILES['video']

        # Save video using Django's storage
        video_path = f"uploads/{file_obj.name}"
        saved_path = default_storage.save(video_path, file_obj)

        # Get full URL of saved video
        video_url = request.build_absolute_uri(settings.MEDIA_URL + saved_path)

        # Run Whisper transcription
        try:
            result = model.transcribe(default_storage.path(saved_path))
            transcription_text = result.get("text", "")

            # Save video details in the database
            video_instance = VideoUpload.objects.create(
                video=saved_path,
                transcription=transcription_text
            )

            return Response({
                "message": "Video uploaded successfully!",
                "video_url": video_url,
                "transcription": transcription_text
            })

        except Exception as e:
            return Response({"error": f"Transcription failed: {str(e)}"}, status=500)
