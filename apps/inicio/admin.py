from django.contrib import admin

# Register your models here.
from .models import Accounts, Gerencias, Rangos


@admin.register(Accounts)
class AccountsAdmin(admin.ModelAdmin):
    list_display = ('cedula', 'nombre', 'codempleado', 'telefo', 'emails', 'gerencia', 'compro', 'rango', 'is_active')

@admin.register(Gerencias)
class GerenciasAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'codigo', 'is_active')

