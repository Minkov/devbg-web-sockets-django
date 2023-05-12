from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', include('web_sockets_django.chat.urls')),
    path('api/accounts/', include('web_sockets_django.accounts.urls')),
]
