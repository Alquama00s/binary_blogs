from rest_framework import viewsets,mixins,generics
from authentication.auth_classes import *
from rest_framework.response import Response
from user.models import *


class UserViewSet(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,viewsets.GenericViewSet):
    name='user-view-set'
    authentication_classes=[Auth0Authentication]
    permission_classes=[Auth0IsAuthenticated]
    serializer_class=UserSerializer
    
    def get_object(self):
        return User.objects.filter(id=self.request.user.id).first()
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        updateable_fields = ['name','profile_url']

        for field in updateable_fields:
            if field in request.data:
                setattr(instance, field, request.data[field])

        instance.save()

        return Response(serializer.data)
    
class PublicUserView(generics.RetrieveAPIView):
    name='public-user-view'
    queryset=User.objects.all()
    serializer_class=PublicUserSerializer
    lookup_field='username'