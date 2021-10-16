from rest_framework.generics import DestroyAPIView, GenericAPIView, UpdateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK


class BrowserLogoutView(GenericAPIView):
    """A log-out endpoint to be used solely by the browser client"""


    def get(self, request: Request, **kwargs) -> Response:
      print('sdfsdfsdfsdfsdf')
        return Response(status=HTTP_200_OK)
