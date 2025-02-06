# transcription/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import VideoUpload
from .serializers import VideoUploadSerializer
import whisper
import tempfile
import os

# Load Whisper Model
model = whisper.load_model("base")

class VideoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES['video']
        video_instance = VideoUpload(video=file_obj)
        video_instance.save()

        # Save video temporarily for processing
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        for chunk in file_obj.chunks():
            temp_file.write(chunk)
        temp_file.close()

        # Transcription with Whisper
        result = model.transcribe(temp_file.name)
        video_instance.transcription = result['text']
        video_instance.save()

        # Clean up
        os.remove(temp_file.name)

        return Response({
            'message': 'Video uploaded and transcribed successfully!',
            'transcription': video_instance.transcription
        })
