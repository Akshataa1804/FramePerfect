from django.contrib import admin
from django.urls import path, include  # Add the include import

# Optional: Create a simple view for the homepage
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Video Subtitle Generator!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('transcription.urls')),  # Your API URLs
    path('', home, name='home'),  # Home route for the root URL
]
