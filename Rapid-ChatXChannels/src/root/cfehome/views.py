
from django.conf import settings
from django.contrib import auth
from django.contrib.auth import login, logout
from django.contrib.auth import models as auth_models
from django.contrib.auth import user_logged_in
from django.contrib.contenttypes.models import ContentType
from django.db.models import QuerySet
from django.db.models.aggregates import Sum
from django.http import Http404
from django.shortcuts import get_list_or_404, get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .api import LoginSerializer


class BrowserLoginView(GenericAPIView):
    """A Log-in view explicitly for the browser client"""

    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    allowed_methods = ["get", "post"]

    @method_decorator(ensure_csrf_cookie)
    def get(self, request: Request, **kwargs) -> Response:
        print('get')

        """This is intended to be used when you need to have a CSRF Token set or reset"""
        return Response(status=HTTP_200_OK)

    @method_decorator(csrf_protect)
    def post(self, request: Request, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        assert isinstance(serializer, LoginSerializer)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        login(request, user)
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        return Response(data=serializer.data, status=HTTP_200_OK)


class BrowserLogoutView(GenericAPIView):
    """A log-out endpoint to be used solely by the browser client"""

    permission_classes = [AllowAny]
    allowed_methods = ["post"]

    def post(self, request: Request, **kwargs) -> Response:
        logout(request)
        return Response(status=HTTP_200_OK)
