from django.urls import path
from . import api_views
urlpatterns=[
    path("current-user",api_views.UserViewSet.as_view({'get':'retrieve','put':'partial_update'}),name=api_views.UserViewSet.name),
    path("profile/<str:username>",api_views.PublicUserView.as_view(),name=api_views.PublicUserView.name)

]