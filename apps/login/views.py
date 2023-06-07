from django.shortcuts import render, redirect 
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login as do_login, logout as do_logout
from django.contrib import messages
from ldap3.core.exceptions import LDAPException, LDAPBindError
from django.conf import settings
from django.core.cache import cache
from ldap3 import Server, Connection, NTLM, SUBTREE
from django.db import connection
from funtions import dictfetchall
import json


# Create your views here.

def index(request):
    return render(request, 'login/index.html')

def acceso(request):
    
    if request.method == 'POST':
    
        #DATOS DEL CLIENTE O USUARIO 
        username = request.POST['username'].lower()
        password = request.POST['password']
        
        #DATOS DEL SERVICIO 
        server_uri = Server(settings.AD_HOST)
        damain_uri = settings.AD_DOMAIN_NAME
        user_uri = user="{0}\\{1}".format(damain_uri, username)

        #DATOS DE LA CONEXION
        conn = Connection(server_uri, user_uri, password=password, authentication=NTLM)
        conn.start_tls()
        bind_response = conn.bind()
        if bind_response:
            request.session['username'] = username
            return redirect('/inicio/', {"username" : username})
        else:
            messages.add_message(request, messages.ERROR, 'La combinación de Correo/contraseña son incorrectos. Inténtalo de nuevo.!')
            return render (request, '/apps/login')
    else:
        return redirect('/')


def logout(request):
    # Finalizamos la sesión
    do_logout(request)
    # Redireccionamos a la portada
    return redirect('/')