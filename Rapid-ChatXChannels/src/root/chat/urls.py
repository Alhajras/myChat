from django.urls import path, include


app_name = 'chat'
urlpatterns = [
  path('api-auth/', include('rest_framework.urls'))
]
