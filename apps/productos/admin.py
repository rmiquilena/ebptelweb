from django.contrib import admin

# Register your models here.
from .models import Categorias, Unidades, Presentacion, Ubicacion, Ivaop, Utilidad

@admin.register(Categorias)
class categoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'decription', 'is_active')

@admin.register(Unidades)
class UnidadesAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'decription', 'abreviatura', 'is_active')

@admin.register(Presentacion)
class PresentacionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'decription', 'is_active')

@admin.register(Ubicacion)
class UbicacionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'decription', 'is_active')

@admin.register(Ivaop)
class IvaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'valor', 'is_active')

@admin.register(Utilidad)
class utilidadAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'valor', 'is_active')