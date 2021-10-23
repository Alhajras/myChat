from django.db import models


class ChannelsTypes(models.TextChoices):
  LOCAL = "Local"
  GMAIL = "Gmail"
  FACEBOOK = "Facebook"
  INSTAGRAM = "Instagram"


class ChatUser(models.Model):
  first_name = models.CharField(max_length=25)
  last_name = models.CharField(max_length=25)
  email = models.EmailField()


class Conversation(models.Model):
  participant_1 = models.ForeignKey(ChatUser, on_delete=models.PROTECT, related_name='participant_1')
  participant_2 = models.ForeignKey(ChatUser, on_delete=models.PROTECT, related_name='participant_2')
  created_at = models.DateTimeField(auto_now_add=True)
  deleted = models.BooleanField()

class ChatMessage(models.Model):
  message = models.TextField()
  sender = models.ForeignKey(ChatUser, on_delete=models.PROTECT, related_name='sender')
  timestamp = models.DateTimeField(auto_now_add=True)
  seen = models.BooleanField(default=False)
  channel = models.CharField(
    max_length=10, choices=ChannelsTypes.choices, default=ChannelsTypes.LOCAL,
  )
  conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
  deleted = models.BooleanField()




