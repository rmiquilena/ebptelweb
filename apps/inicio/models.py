from django.db import models

from apps.rangos.models import Rangos
# Create your models here.

class Gerencias (models.Model):

    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=15)
    is_active = models.BooleanField(default=1)

    def __str__(self):
        return self.nombre 

class Accounts (models.Model):
    
    cedula      = models.CharField(max_length=13, blank=False, unique=True)
    nombre      = models.CharField(max_length=100)
    codempleado = models.CharField(max_length=100)
    telefo      = models.CharField(max_length=15)
    emails      = models.EmailField(max_length=100, blank=False, unique=True)
    gerencia    = models.ForeignKey(Gerencias, on_delete=models.CASCADE, null=False, blank=False)
    compro      = models.BooleanField(default=0)
    rango       = models.ForeignKey(Rangos, on_delete=models.CASCADE, null=False, blank=False)
    is_active   = models.BooleanField(default=1)
    created_at  = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        fullname =  self.codempleado  +" - " + self.nombre
        return fullname
        