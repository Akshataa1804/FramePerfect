from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.conf import settings
from django.urls import reverse
import whisper
import os
from urllib.parse import urlparse
from django.http import JsonResponse

from .models import VideoUpload
from .serializers import VideoUploadSerializer

# Load Whisper Model (Only Once)
model = whisper.load_model("base")

class APIRootView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({
            "upload_video": request.build_absolute_uri(reverse('upload_video')),
            "generate_subtitles": request.build_absolute_uri(reverse('generate_subtitles')),
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

class GenerateSubtitlesView(APIView):
    def get(self, request, *args, **kwargs):
        # Get video_url from query parameters
        video_url = request.query_params.get('video_url')
        if not video_url:
            return Response({"error": "video_url parameter is required"}, status=400)

        try:
            # Extract the file path from the video URL
            parsed_url = urlparse(video_url)
            video_path = parsed_url.path  # e.g., "/media/uploads/video.mp4"

            # Construct the full file path on the server
            full_video_path = os.path.join(settings.MEDIA_ROOT, video_path.lstrip('/'))

            # Check if the file exists
            if not os.path.exists(full_video_path):
                return Response({"error": "Video file not found"}, status=404)

            # Run Whisper transcription
            result = model.transcribe(full_video_path)
            transcription_text = result.get("text", "")

            # Format subtitles (example: split into sentences with timestamps)
            subtitles = self.format_subtitles(result)

            return Response({
                "message": "Subtitles generated successfully!",
                "subtitles": subtitles
            })

        except Exception as e:
            return Response({"error": f"Subtitle generation failed: {str(e)}"}, status=500)

    def format_subtitles(self, result):
        """
        Format Whisper transcription result into subtitles with timestamps.
        """
        subtitles = []
        for segment in result.get("segments", []):
            subtitles.append({
                "timestamp": self.format_timestamp(segment['start']),
                "text": segment['text']
            })
        return subtitles

    def format_timestamp(self, seconds):
        """
        Convert seconds to a timestamp string (HH:MM:SS).
        """
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)
        seconds = int(seconds % 60)
        return f"{hours:02}:{minutes:02}:{seconds:02}"