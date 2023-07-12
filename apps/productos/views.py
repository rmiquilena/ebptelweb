from itertools import product
from urllib import request
from django.shortcuts import render, redirect 
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from django.db import connection
from funtions import dictfetchall
import json

#Search model y forms

from .models import Productos
from .forms import ProductosForm


# Create your views here.
def inicio(request):
    return render(request, 'productos/index.html')

############## SEARCH PRODUCTS ##############

class ProductoList(ListView):
    model = Productos
    template_name = "productos/index.html"

    def post(self, request, *args, **kwargs):
        
        if request.method == "POST":
            cursor = connection.cursor()
            cursor.execute('SELECT id, barcod, images, nombre, descri, stockm, existe, precio_venta FROM dbemploytel.viewproductos;')
            rows = dictfetchall(cursor)
            return JsonResponse(rows, safe=False)

############## CREATE PRODUCTOS ##############

class ProductoCreate(CreateView):
    
    model = Productos
    form_class= ProductosForm
    template_name = "productos/create.html"

    def post(self, request, *args, **kwargs):
        
        if request.method == "POST":
            form = self.form_class(request.POST or None) 
            print("Formulario==>", form)
            if form.is_valid():
                products = form.save(commit=False)
                products.save()
                mensajes = f'{self.model.__name__} registrado(a) correctamente!'
                response = JsonResponse({'mensajes': mensajes})
                response.status_code = 200
                return  response
            else:
                mensajes = f'{self.model.__name__} no se ha encuentra registrado'
                error = form.errors
                response = JsonResponse({'mensajes': mensajes, 'error': error})
                response.status_code = 400
                return  response
        else:
            return redirect('/productos/')
        
############## UPDATE PRODUCTOS ##############

class ProductoUpdate(UpdateView):
    
    model = Productos
    form_class= ProductosForm
    template_name = "productos/update.html"

    def post(self, request, *args, **kwargs):

        if request.method == "POST":
            form = self.form_class(request.POST, instance = self.get_object())
            if form.is_valid():
                form.save()
                mensajes = f'{self.model.__name__} actualizado(a) correctamente!'
                response = JsonResponse({'mensajes': mensajes}, status=200)
                return  response
            else:
                mensajes = f'{self.model.__name__} no se ha podido actualizar'
                error = form.errors
                response = JsonResponse({'mensajes': mensajes, 'error': error}, status=400)
                return  response
        else:
            return redirect('/productos/')