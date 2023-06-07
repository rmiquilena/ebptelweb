from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy, reverse
from django.http import HttpResponse, JsonResponse
from django.db import connection
from funtions import dictfetchall
from django.core import serializers
from django.contrib.sessions.backends.db import SessionStore
import json


from .models import Accounts

# Create your views here.

def Inicios(request):

    codemp = request.session['username']
    template_name = "inicio/index.html"
    emple  = Accounts.objects.filter(codempleado=codemp)
    context = {'fullName': emple[0]}
    
    
    return render(request, template_name, context)

    
def searchproductos (request):
        
        cursor = connection.cursor()
        cursor.execute('SELECT id, nombre FROM dbemploytel.login_gerencias where is_active = true')
        rows = dictfetchall(cursor)
        cursor.close()
        if rows:
            return JsonResponse(rows, safe=False)
        else: 
            mensajes = 'Gerencias, no disponibles.'
            status_code = 401
            return JsonResponse({'mensajes': mensajes, 'status': status_code})
        

############# CREATE REGISTER ###################

'''ass AccountsCreate(CreateView):
    
    #model = Accounts
    
    def post(self, request, *args, **kwargs):
        
        if request.method == "POST":
            
            data = json.loads(request.body.decode('utf-8'))

            cedula = data['cedula']
            nombre = data['nombre']
            codemp = data['codemp']
            telemp = data['telemp']
            correo = data['ivaidop']
            gerenc = data['gerenc']
            
            cursor = connection.cursor()
            cursor.callproc('dbemploytel.faccount', [cedula, nombre, codemp, telemp, correo, gerenc])
            cursor.fetchall()
            cursor.close()
            mensajes = 'Cliente Activado correctamente!'
            error = 'No hay error'
            return JsonResponse({'mensajes': mensajes, 'info': cursor})
            
        else:
            return redirect('/login/')'''
