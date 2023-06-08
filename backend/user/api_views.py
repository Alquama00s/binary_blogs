from rest_framework.views import APIView
from authentication.auth_classes import *
from rest_framework.response import Response
from user.models import *
from rest_framework import generics
from rest_framework.reverse import reverse
class ApiRoot(generics.GenericAPIView):
    name = 'api-root'
    def get(self, request, *args, **kwargs):
        return Response({
            'user': reverse(UserView.name, request=request),

            })   

class UserView(APIView):
    name="user-view"
    authentication_classes=[Auth0Authentication]
    permission_classes=[Auth0IsAuthenticated]

    def get(self,request):
        return Response(
        UserSerializer(request.user).data
        )