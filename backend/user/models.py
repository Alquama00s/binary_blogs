from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser, models.Model):
    id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    profile_url=models.URLField()

    @classmethod
    def fromAuth0(cls,userdata):
        return cls(name=userdata['name'],email=userdata['email'],profile_url=userdata['picture'])
