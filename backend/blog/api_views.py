from rest_framework import viewsets,generics
from authentication.auth_classes import Auth0Authentication,Auth0IsAuthenticated
from .models import Blog,BlogSerializer

class UserBlogViewSet(viewsets.ModelViewSet):
    name='user-blog-viewset'
    authentication_classes=[Auth0Authentication]
    permission_classes=[Auth0IsAuthenticated]
    serializer_class=BlogSerializer

    def get_queryset(self):
        
        return Blog.objects.filter(publisher=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(publisher=self.request.user)
        return super().perform_create(serializer)