from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings 
from django.conf.urls.static import static

app_name = 'inicio'

urlpatterns = [
    path('', views.Inicios, name='inicios'),
    path('search/', views.searchproductos, name='search'),
    path('details/<int:id>/', views.viewproductos.as_view(), name='view_details'),
    path('blockdes/', views.blockDesbprod, name='blockdes'),
]