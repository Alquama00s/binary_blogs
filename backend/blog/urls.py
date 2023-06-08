from django.urls import path
from . import api_views
urlpatterns=[
    path("user-blogs",api_views.UserBlogViewSet.as_view({'get':'list','post':'create'}),name=api_views.UserBlogViewSet.name),
    path("user-blogs/<int:pk>",api_views.UserBlogViewSet.as_view({'get':'retrieve','put':'update','patch':'partial_update','delete':'destroy'}),name=api_views.UserBlogViewSet.name)

]