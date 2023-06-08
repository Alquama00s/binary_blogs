from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
import jwt
from user.models import User
from rest_framework.request import Request
from backend.settings import AUTH0_PUB_KEY_URL,AUTH0_JWT_AUD
class Auth0Authentication(BaseAuthentication):
    def authenticate(self, request:Request):
        try:
          access_token_jwt=request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
          # access_token_jwt=request.session["user"]["id_token"]
          # print(access_token_jwt)
          jwks_client = jwt.PyJWKClient(AUTH0_PUB_KEY_URL)
          signing_key = jwks_client.get_signing_key_from_jwt(access_token_jwt)
          decoded=jwt.decode(access_token_jwt,key=signing_key.key,algorithms=['RS256'],audience=AUTH0_JWT_AUD)
        #   print(decoded)
          user=User.objects.filter(email=decoded['email']).first()
          if(user is None):
              raise AuthenticationFailed()
          return (user,access_token_jwt)
        except Exception as e:
           print(e)
           raise AuthenticationFailed()
    
class Auth0IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if request.user.is_authenticated:
            return True

        # User is not authenticated
        return False
