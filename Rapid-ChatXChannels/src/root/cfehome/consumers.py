from __future__ import annotations
from channels.generic.websocket import JsonWebsocketConsumer, WebsocketConsumer


class ChatConsumer(WebsocketConsumer):

    def connect(self) -> None:
        print('sssssssssssssssss')

    def disconnect(self, close_code) -> None:
        print('nnnnnnnnnnnnnnnnn')
