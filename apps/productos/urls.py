from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required
from django.conf import settings 
from django.conf.urls.static import static

app_name = 'productos'

urlpatterns = [
    path('', login_required(views.inicio), name='index'),
    path('list/', login_required(views.ProductoList.as_view()), name='list_productos'), 
    path('create/', login_required(views.ProductoCreate.as_view()), name='create_productos'),
    path('update/<int:pk>/', login_required(views.ProductoUpdate.as_view()), name='update_productos'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)