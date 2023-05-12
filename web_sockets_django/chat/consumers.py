import json

from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer

from web_sockets_django.chat.models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    group_name = None

    async def connect(self):
        self.group_name = self.scope['url_route']['kwargs']['room_name']

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        return await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        text = data['text']
        user = data['user']

        await Message.objects.acreate(text=text, user=user)

        event = {
            'type': 'chat_message',  # Mandatory
            'text': text,
            'user': user,
            'sender_channel_name': self.channel_name,
        }

        await self.channel_layer.group_send(
            self.group_name,
            event
        )

    async def chat_message(self, event):
        data = {
            'text': event['text'],
            'user': event['user'],
        }

        # Prevents sending the message to the sender
        # if self.channel_name == event['sender_channel_name']:
        #     return

        await self.send(text_data=json.dumps(data))
