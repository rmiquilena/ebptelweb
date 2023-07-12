from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings 
from django.conf.urls.static import static

app_name = 'rangos'

urlpatterns = [
    path('', login_required(views.Rangos), name='index'),
     path('list/', login_required(views.RangosList.as_view()), name='list_productos'), 
]