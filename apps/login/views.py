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

from apps.inicio.models import Accounts

# Create your views here.

def index(request):
    return render(request, 'login/index.html')

def acceso(request):
    
    if request.method == 'POST':
    
        ## DATOS DEL CLIENTE O USUARIO  ##
        username = request.POST['username'].lower()
        password = request.POST['password']
        useremail = request.POST['useremail']

        if(useremail):

            user = authenticate(username=useremail, password=password)
            if user:
                if user.is_active:
                    do_login(request, user)
                    return redirect('/dashboard/')
            else:
                messages.add_message(request, messages.ERROR, 'La combinación de correo/contraseña son incorrectos. Inténtalo de nuevo.!')
                return render (request, 'login/index.html')
        else:

            ## DATOS DEL SERVICIO ## 
            server_uri = Server(settings.AD_HOST)
            damain_uri = settings.AD_DOMAIN_NAME
            user_uri = user="{0}\\{1}".format(damain_uri, username)

            ## DATOS DE LA CONEXION ##
            conn = Connection(server_uri, user_uri, password=password, authentication=NTLM)
            conn.start_tls()
            bind_response = conn.bind()
            if bind_response:
                qryset = searchusrDat(username)
                if qryset[0]['compro'] == 0:
                    data = {
                        'id': qryset[0]['id'],
                        'cedula': qryset[0]['cedula'],
                        'nombre': qryset[0]['nombre'],
                        'codemo': qryset[0]['codempleado'],
                        'rangod': qryset[0]['rango_id']
                    }
                    info = request.session['info'] = data
                    return redirect('/inicio/', {"info":info})
                else:
                    messages.add_message(request, messages.INFO, 'Usuario realizo un comprar. Comuniquese con Gestión Humana.!')
                    return render (request, 'login/index.html')
            else:
                messages.add_message(request, messages.ERROR, 'La combinación de correo/contraseña son incorrectos. Inténtalo de nuevo.!')
                return render (request, 'login/index.html')
    else:
        return redirect('/')


def searchusrDat(usr):
        
        cursor = connection.cursor()
        cursor.execute('SELECT id, cedula, nombre, codempleado, compro, rango_id FROM dbemploytel.viewempleados where codempleado =%s', [usr])
        rows = dictfetchall(cursor)
        cursor.close()
        return rows

def logout(request):
    # Redireccionamos a la portada
    return redirect('/')