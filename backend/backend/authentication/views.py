import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render
from django.urls import reverse
from urllib.parse import quote_plus, urlencode
from user.models import User

oauth = OAuth()

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
    request.session["user"] = token
    if(User.objects.filter(email=request.session.get('user')['userinfo']['email']).first() is None):
        new_user=User.fromAuth0(request.session.get('user')['userinfo'])
        new_user.save()
    resp = redirect(request.build_absolute_uri("http://localhost:4200"))
    resp.set_cookie('session',request.session.session_key, max_age=3600, secure=True)
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

