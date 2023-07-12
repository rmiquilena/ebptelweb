from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.login.urls')),
    path('inicio/', include('apps.inicio.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
    path('productos/', include('apps.productos.urls',namespace="productos")),
    path('rangos/', include('apps.rangos.urls', namespace="rangos")),
]
