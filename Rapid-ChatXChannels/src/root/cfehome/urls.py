"""cfehome URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from .api import FacebookWebhookView, UserViewSet, ConversationViewSet, ChatMessageViewSet

from django.urls import path, include
from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'conversations', ConversationViewSet)
router.register(r'messages', ChatMessageViewSet)


urlpatterns = [
  path('', admin.site.urls),
  path('admin/', admin.site.urls),
  path('messages/', include('root.chat.urls')),
  path("verify/", FacebookWebhookView.as_view(), name="angular-login"),
  path('api/', include(router.urls)),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))

]