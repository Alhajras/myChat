from django.contrib import admin

from .models import ChatMessage

admin.site.register(ChatMessage)


class ChatMessage(admin.TabularInline):
  model = ChatMessage
