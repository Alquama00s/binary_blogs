from django.urls import path
from . import api_views
urlpatterns=[
    path("",api_views.ApiRoot.as_view(),name=api_views.ApiRoot.name),
    path("get-user",api_views.UserView.as_view(),name=api_views.UserView.name)
]