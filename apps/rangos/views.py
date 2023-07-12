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

from .models import Rango_productos, Rangos

# Create your views here.
def Rangos(request):
    return render(request, 'rangos/index.html')

############## SEARCH PRODUCTS ##############

class RangosList(ListView):
 
    template_name = "rangos/index.html"

    def post(self, request, *args, **kwargs):
        
        if request.method == "POST":
            cursor = connection.cursor()
            cursor.execute('SELECT id, nombre, codigo FROM dbemploytel.rangos_rangos;')
            rows = dictfetchall(cursor)
            return JsonResponse(rows, safe=False)
        else:
            mensajes = f'{self.model.__name__} no se pudo registrar!'
            status_code = 401
            return JsonResponse({'mensajes': mensajes, 'status': status_code})