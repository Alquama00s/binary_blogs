from django.db import models
from user.models import User,PublicUserSerializer
from rest_framework import serializers
# Create your models here.


class Blog(models.Model):
    id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=500)
    content=models.TextField()
    tags=models.TextField(blank=True) #comma separated string
    publisher=models.ForeignKey(User,on_delete=models.CASCADE)


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields='__all__'
        read_only_fields=['publisher']



class PublicBlogListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields=['id','title','description']



class PublicBlogSerializer(serializers.ModelSerializer):
    author=serializers.SerializerMethodField()

    def get_author(self,obj):
        return PublicUserSerializer(obj.publisher).data


    class Meta:
        model=Blog
        fields=['id','title','description','content','author']