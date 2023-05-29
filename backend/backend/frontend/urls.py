from django.urls import re_path,path
from .views import index

urlpatterns = [
    # Other URL patterns
    path("for",index),
    re_path(r'^.*', index),
]
