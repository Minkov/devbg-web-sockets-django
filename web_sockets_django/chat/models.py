from django.db import models


class Message(models.Model):
    user = models.CharField(max_length=50)
    text = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
