from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
import jwt
from user.models import User

class Auth0Authentication(BaseAuthentication):
    def authenticate(self, request):
        # print(request.session["user"])
        try:
          access_token_jwt=request.session["user"]["id_token"]
          jwks_client = jwt.PyJWKClient('https://dev-jpwmi4c6wfbzcog1.us.auth0.com/.well-known/jwks.json')
          signing_key = jwks_client.get_signing_key_from_jwt(access_token_jwt)
          decoded=  jwt.decode(access_token_jwt,key=signing_key.key,algorithms=['RS256'],audience=request.session["user"]["userinfo"]["aud"])
          # print(decoded)
          user=User.objects.filter(email=request.session.get('user')['userinfo']['email']).first()
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
