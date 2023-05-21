from django.db import models
from user.models import User
# Create your models here.


class Blog(models.Model):
    id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=100)
    content=models.TextField()
    tags=models.TextField() #comma separated string
    publisher=models.OneToOneField(User,on_delete=models.CASCADE)