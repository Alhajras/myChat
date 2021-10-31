from django.db import models
from django.db.models.manager import BaseManager
from django.http import HttpRequest


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



class NotificationQuerySet(models.QuerySet["Notification"]):
  def for_request(self, request: HttpRequest):
    if request.session.session_key:
      id = request.GET.get('conversation', -1)
      if id == -1:
        return self.order_by("id")

      return self.filter(conversation=id).order_by("id")
    else:
      return self.none()


class ChatMessage(models.Model):
  objects = BaseManager.from_queryset(NotificationQuerySet)()

  message = models.TextField()
  sender = models.ForeignKey(ChatUser, on_delete=models.PROTECT, related_name='sender')
  timestamp = models.DateTimeField(auto_now_add=True)
  seen = models.BooleanField(default=False)
  channel = models.CharField(
    max_length=10, choices=ChannelsTypes.choices, default=ChannelsTypes.LOCAL,
  )
  conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
  deleted = models.BooleanField()



