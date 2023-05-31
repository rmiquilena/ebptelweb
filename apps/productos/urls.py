from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings 
from django.conf.urls.static import static

app_name = 'productos'

urlpatterns = [
    path('', login_required(views.Productos), name='index'),
]