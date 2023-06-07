from django.urls import path

from .api_view import *


urlpatterns=[
    path("",ApiRoot.as_view()),
    path('stat',Status.as_view(),name=Status.name),
    path('stat-auth',StatusAuth.as_view(),name=StatusAuth.name),
    path("login", login, name="login"),
    path("logout", logout, name="logout"),
    path("authorize", authorize, name="authorize"),

]
