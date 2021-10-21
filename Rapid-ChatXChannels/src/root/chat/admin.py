from django.contrib import admin

from .models import ChatMessage, ChatUser, Conversation

admin.site.register(ChatMessage)
admin.site.register(ChatUser)
admin.site.register(Conversation)
