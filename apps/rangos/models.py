from django.db import models
from apps.productos.models import Productos
# Create your models here.

class Rangos (models.Model):

    nombre = models.CharField(max_length=100)
    codigo = models.CharField(max_length=15)
    is_active = models.BooleanField(default="true")

    def __str__(self):
        #producto = (self.pk +'('+ self.nombre+')')
        return self.nombre


    
class Rango_productos (models.Model):

    rango_id    = models.ForeignKey(Rangos, on_delete=models.CASCADE, null=False, blank=False)
    producto_id = models.ForeignKey(Productos, on_delete=models.CASCADE, null=False, blank=False)
    created_at  = models.DateTimeField(auto_now_add=True)
