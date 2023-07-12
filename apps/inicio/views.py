from typing import Any
from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy, reverse
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.db import connection
from funtions import dictfetchall
from django.core import serializers
from django.contrib.sessions.backends.db import SessionStore
import json

from .models import Accounts

# Create your views here.

def Inicios(request):
    context = {
        'id': request.session['info']['id'],
        'codem': request.session['info']['codemo'],
        'fullName': request.session['info']['nombre'],
        'rango': request.session['info']['rangod']
    }
    template_name = "inicio/index.html"
    return render(request, template_name, context)


############# SEARCH PRODUCTO ###################
def searchproductos (request):

        data = json.loads(request.body.decode('utf-8')) 
        rangoId = data['RangoId']
        cursor = connection.cursor()
        qry = 'SELECT id, producto_id_id, nombre, images, pricec, stockm, existe FROM dbemploytel.viewrangproductos where rango_id_id=%s'
        cursor.execute(qry, [rangoId])
        rows = dictfetchall(cursor)
        cursor.close()
        if rows:
            return JsonResponse(rows, safe=False)
        else: 
            mensajes = 'Productos, no disponibles.'
            status_code = 401
            return JsonResponse({'mensajes': mensajes, 'status': status_code})
        

############# VIEW PRODUCTO ###################
class viewproductos(ListView):
    
    template_name = "inicio/details.html"

    def post(self, *args, **kwargs):
        
        id=self.kwargs['id']
        cursor = connection.cursor()
        qry = 'SELECT id, producto_id_id, nombre, descripcion, images, pricec, existe FROM dbemploytel.viewrangproductos where producto_id_id=%s'
        cursor.execute(qry, [id])
        rows = dictfetchall(cursor)
        cursor.close()
        if rows:
            return JsonResponse(rows, safe=False)
        else: 
            mensajes = 'Productos, no disponibles.'
            status_code = 401
            return JsonResponse({'mensajes': mensajes, 'status': status_code})

def blockDesbprod (request):

        data = json.loads(request.body.decode('utf-8'))

        id = data['id']
        acc = data['acc']
        cursor = connection.cursor()
        cursor.callproc('block_desprod', [id, acc])

        status_code = 201
        response = JsonResponse({'status': status_code})
        cursor.close()
        return  response