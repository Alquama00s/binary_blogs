from django.urls import path
from . import api_views
urlpatterns=[
    path("user-blogs",api_views.UserBlogViewSet.as_view({'get':'list','post':'create'}),name=api_views.UserBlogViewSet.name),
    path("user-blog/<int:pk>",api_views.UserBlogViewSet.as_view({'get':'retrieve','put':'update','patch':'partial_update','delete':'destroy'}),name=api_views.UserBlogViewSet.name),
    path("public-blogs",api_views.PublicBlogListView.as_view(),name=api_views.PublicBlogListView.name),
    path("public-blog/<int:pk>",api_views.PublicBlogRetrieveView.as_view(),name=api_views.PublicBlogRetrieveView.name)

]