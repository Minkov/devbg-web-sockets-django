from django.shortcuts import render
from rest_framework import generics as api_views, serializers

from web_sockets_django.chat.models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['pk', 'text', 'user', 'created_on']


class MessagesListView(api_views.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
