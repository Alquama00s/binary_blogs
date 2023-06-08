from rest_framework import viewsets,filters,generics
from authentication.auth_classes import Auth0Authentication,Auth0IsAuthenticated
from .models import Blog,BlogSerializer,PublicBlogSerializer,PublicBlogListSerializer
from .pagination_class import BlogPagination
from user.models import User
from django.http import HttpResponseBadRequest
from rest_framework.exceptions import ValidationError

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
    

class PublicBlogListView(generics.ListAPIView):
    name='public-blog-viewset'
    serializer_class=PublicBlogListSerializer
    filter_backends=[filters.SearchFilter]
    pagination_class=BlogPagination
    search_fields=['title','tags']

    def get_queryset(self):
        username = self.request.query_params.get('username')
        if username:
            user =User.objects.filter(username=username).first()
            if user:
                return Blog.objects.filter(publisher=user)
            else:
                raise ValidationError(detail='Invalid username')
        return Blog.objects.all()

class PublicBlogRetrieveView(generics.RetrieveAPIView):
    name='public-blog-ret'
    queryset=Blog.objects.all()
    serializer_class=PublicBlogSerializer

