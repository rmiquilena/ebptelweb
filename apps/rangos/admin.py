from django.contrib import admin

# Register your models here.
from .models import Rangos, Rango_productos

@admin.register(Rangos)
class RangosAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'codigo', 'is_active')
    

@admin.register(Rango_productos)
class Rango_productosAdmin(admin.ModelAdmin):
    list_display = ('rango_id', 'producto_id')