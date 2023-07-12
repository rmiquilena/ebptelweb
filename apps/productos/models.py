from django import db
from django.db import models

# Create your models here.

class Categorias(models.Model):
    
    nombre = models.CharField(max_length=100)
    decription = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre 

class Unidades(models.Model):

    nombre = models.CharField(max_length=150)
    decription = models.CharField(max_length=200)
    abreviatura= models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        nombre = (self.nombre +'('+ self.abreviatura+')')
        return nombre

class Presentacion(models.Model):
    
    nombre = models.CharField(max_length=100)
    decription = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Ubicacion(models.Model):

    nombre = models.CharField(max_length=100)
    decription = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre

class Ivaop(models.Model):

    nombre = models.CharField(max_length=100)
    valor  = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Utilidad(models.Model):

    nombre = models.CharField(max_length=100)
    valor  = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        #return(self.nombre +' ('+ str(self.valor)+'%)')
        return self.nombre

class Productos(models.Model):

    barcod  = models.CharField(max_length=150, blank=False, unique=True)
    images  = models.TextField(blank=True)
    nombre  = models.CharField(max_length=100)
    descri  = models.CharField(max_length=255, blank=True)
    pricec  = models.FloatField()
    pricev  = models.FloatField()
    ivaop   = models.CharField(max_length=5)
    utilid  = models.CharField(max_length=5, null=True)
    monuti  = models.FloatField(null=True)
    stocka  = models.IntegerField()
    stockm  = models.IntegerField()
    existe  = models.IntegerField()
    presen  = models.ForeignKey(Presentacion, on_delete=models.CASCADE, null=False, blank=False)
    catego  = models.ForeignKey(Categorias, on_delete=models.CASCADE, null=False, blank=False)
    unidad  = models.ForeignKey(Unidades, on_delete=models.CASCADE, null=False, blank=False)
    ubicas  = models.ForeignKey(Ubicacion, on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        #producto = (self.pk +'('+ self.nombre+')')
        return self.nombre