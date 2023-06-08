from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.serializers import ModelSerializer
# Create your models here.


class User(AbstractUser, models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    profile_url=models.URLField()
    password=models.CharField(max_length=50,null=True)

    @classmethod
    def fromAuth0(cls,userdata):
        return cls(name=userdata['name'],email=userdata['email'],profile_url=userdata['picture'])


class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','name','email','profile_url']

class PublicUserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=['name','profile_url']