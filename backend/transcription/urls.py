from django.urls import path
from .views import VideoUploadView, APIRootView

urlpatterns = [
    path('', APIRootView.as_view(), name='api_root'),  # Add this
    path('upload/', VideoUploadView.as_view(), name='upload_video'),
]
