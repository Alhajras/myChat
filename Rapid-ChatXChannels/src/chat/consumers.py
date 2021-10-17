from __future__ import annotations
from channels.generic.websocket import JsonWebsocketConsumer


class ChatConsumer(JsonWebsocketConsumer):

    def connect(self) -> None:
        print('sssssssssssssssss')

    def disconnect(self, close_code) -> None:
        print('nnnnnnnnnnnnnnnnn')
