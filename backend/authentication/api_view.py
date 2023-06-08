from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render
from django.urls import reverse
from urllib.parse import quote_plus, urlencode
# from user.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.reverse import reverse
from .auth_classes import Auth0Authentication, Auth0IsAuthenticated
from user.models import User
oauth = OAuth()

class ApiRoot(generics.GenericAPIView):
    name = 'api-root'
    def get(self, request, *args, **kwargs):
        return Response({
            'auth': reverse(Status.name, request=request),
            'auth-stat': reverse(StatusAuth.name, request=request),

            })   

class Status(APIView):
    name='status'
    def get(self,request):
        return Response({'status':'ok'})
    

class StatusAuth(APIView):
    name='status-auth'
    authentication_classes=[Auth0Authentication]
    permission_classes=[Auth0IsAuthenticated]
    def get(self,request):
        return Response({'status':'ok-auth'})


oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)


def login(request):
    return oauth.auth0.authorize_redirect(
        request, request.build_absolute_uri(reverse("authorize"))
    )

def authorize(request):
    token = oauth.auth0.authorize_access_token(request)
    print(token)
    request.session["user"] = token
    if(User.objects.filter(email=request.session.get('user')['userinfo']['email']).first() is None):
        new_user=User.fromAuth0(request.session.get('user')['userinfo'])
        new_user.save()
    resp = redirect(request.build_absolute_uri("http://localhost:4200"))
    resp.set_cookie('token',token["id_token"])
    return resp

def logout(request):
    request.session.clear()
    resp= redirect(
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
        + urlencode(
            {
                "returnTo": request.build_absolute_uri("http://localhost:4200"),
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        ),
    )
    resp.set_cookie('sessionid','',expires=0)
    return resp

