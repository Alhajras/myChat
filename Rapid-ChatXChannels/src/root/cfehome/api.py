import json

from django.contrib import auth
from django.contrib.auth import authenticate, get_user_model
from django.db.models import QuerySet
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from rest_framework import serializers, routers, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from ..chat.models import ChatUser, ChatMessage, Conversation

router = routers.DefaultRouter

# Copy this from your facebook account something like EAANGpdBZC534B**********
VERIFY_TOKEN = ""  # generated above


"""
FB_ENDPOINT & PAGE_ACCESS_TOKEN
Come from the next step.
"""
FB_ENDPOINT = 'https://graph.facebook.com/v2.12/'
PAGE_ACCESS_TOKEN = "hello"


# def parse_and_send_fb_message(fbid, recevied_message):
#   # Remove all punctuations, lower case the text and split it based on space
#   tokens = re.sub(r"[^a-zA-Z0-9\s]", ' ', recevied_message).lower().split()
#   msg = None
#   for token in tokens:
#     if token in LOGIC_RESPONSES:
#       msg = random.choice(LOGIC_RESPONSES[token])
#       break
#
#   if msg is not None:
#     endpoint = f"{FB_ENDPOINT}/me/messages?access_token={PAGE_ACCESS_TOKEN}"
#     response_msg = json.dumps({"recipient": {"id": fbid}, "message": {"text": msg}})
#     status = requests.post(
#       endpoint,
#       headers={"Content-Type": "application/json"},
#       data=response_msg)
#     print(status.json())
#     return stats.json()
#   return None


class FacebookWebhookView(View):
  @method_decorator(csrf_exempt)  # required
  def dispatch(self, request, *args, **kwargs):
    return super().dispatch(request, *args, **kwargs)  # python3.6+ syntax

  '''
  hub.mode
  hub.verify_token
  hub.challenge
  Are all from facebook. We'll discuss soon.
  '''

  def get(self, request, *args, **kwargs):
    hub_mode = request.GET.get('hub.mode')
    hub_token = request.GET.get('hub.verify_token')
    hub_challenge = request.GET.get('hub.challenge')
    if hub_token != VERIFY_TOKEN:
      print(hub_token, VERIFY_TOKEN)
      return HttpResponse('Error, invalid token', status=403)
    return HttpResponse(hub_challenge)

  def post(self, request, *args, **kwargs):
    incoming_message = json.loads(request.body.decode('utf-8'))
    for entry in incoming_message['entry']:
      for message in entry['messaging']:
        if 'message' in message:
          fb_user_id = message['sender']['id']  # sweet!
          fb_user_txt = message['message'].get('text')
          timestamp = message['timestamp']
          chat_user, _ = ChatUser.objects.get_or_create(first_name =fb_user_id ,email=f'{fb_user_id}@facebook.com')
          chat_user_1  = ChatUser.objects.get(id=1)

          print(chat_user)
          print('-------------------------')
          conv, _ = Conversation.objects.get_or_create(participant_2=chat_user, participant_1=chat_user_1, deleted = False)
          mssg = ChatMessage.objects.create(sender= chat_user,conversation=conv, message=fb_user_txt,deleted = False)
          # if fb_user_txt:
          #   parse_and_send_fb_message(fb_user_id, fb_user_txt)
    return HttpResponse("Success", status=200)



class ChatUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = ChatUser
    fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
  user_id = serializers.IntegerField(source="id")

  class Meta:
    model = get_user_model()
    fields = "__all__"


# This is view should be moved to views
class UserViewSet(viewsets.ModelViewSet):
  lookup_field = "username"
  queryset = auth.get_user_model().objects.all().order_by("id")
  serializer_class = UserSerializer

  @action(["get"], detail=False)
  def me(self, request: Request, *_, **__) -> Response:
    return Response(self.get_serializer_class()(request.user).data)


class ChatMessageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ChatMessage
    fields = "__all__"

# This is view should be moved to views
class ChatMessageViewSet(viewsets.ModelViewSet):
  serializer_class = ChatMessageSerializer
  filterset_fields = ["conversation"]


  def get_queryset(self) -> QuerySet[ChatMessage]:
    conversation = self.request.GET.get('conversation', -1)
    return ChatMessage.objects.filter(conversation__id=conversation).order_by("-id")


class ConversationSerializer(serializers.ModelSerializer):
  participant_1 = ChatUserSerializer(read_only=True)
  participant_2 = ChatUserSerializer(read_only=True)

  class Meta:
    model = Conversation
    fields = "__all__"


# This is view should be moved to views
class ConversationViewSet(viewsets.ModelViewSet):
  queryset = Conversation.objects.all()
  serializer_class = ConversationSerializer


class LoginSerializer(serializers.Serializer):
  password = serializers.CharField(required=True, style={"input_type": "password"}, write_only=True)
  username = serializers.CharField(required=True)
  default_error_messages = {
    "invalid_credentials": "We were unable to log you in with the username and password you provided",
  }

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.user = None

  def validate(self, attrs):
    self.user = authenticate(request=self.context.get("request"), **attrs)
    if self.user and self.user.is_active:
      return attrs
    self.fail("invalid_credentials")
