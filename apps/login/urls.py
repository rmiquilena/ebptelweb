from unicodedata import name
from django.urls import path
from . import views

app_name = 'login'


urlpatterns = [

    path('', views.index, name='index'),
    path('acceso/', views.acceso, name='acceso'),
    path('logout/', views.logout, name='logout'),
    
]