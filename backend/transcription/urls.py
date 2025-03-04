from django.urls import path
from .views import APIRootView, VideoUploadView, GenerateSubtitlesView

urlpatterns = [
    path('', APIRootView.as_view(), name='api_root'),
    path('upload/', VideoUploadView.as_view(), name='upload_video'),
    path('generate-subtitles/', GenerateSubtitlesView.as_view(), name='generate_subtitles'),
]