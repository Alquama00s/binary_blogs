
from django.urls import path

from .api_views import UserView,ApiRoot

urlpatterns = [
    path("browseable",ApiRoot.as_view()),
    path("", UserView.as_view(),name=UserView.name),
]