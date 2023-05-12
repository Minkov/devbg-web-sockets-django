from django.urls import re_path, path

from .consumers import ChatConsumer
from .views import MessagesListView

websocket_urlpatterns = [
    # path('ws/chat', ChatConsumer.as_asgi()),
    path('ws/chat/<room_name>', ChatConsumer.as_asgi()),
]

urlpatterns = [
    path('messages/', MessagesListView.as_view(), name='messages-list'),
]
