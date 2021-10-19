from django.db import models


class ChannelsTypes(models.TextChoices):
  LOCAL = "Local"
  GMAIL = "Gmail"
  FACEBOOK = "Facebook"
  INSTAGRAM = "Instagram"


class ChatMessage(models.Model):
  message = models.TextField()
  timestamp = models.DateTimeField(auto_now_add=True)
  seen = models.BooleanField(default=False)
  channel = models.CharField(
    max_length=10, choices=ChannelsTypes.choices, default=ChannelsTypes.LOCAL,
  )
