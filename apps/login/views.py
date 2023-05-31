from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login as do_login, logout as do_logout
from django.contrib import messages
from django.conf import settings


# Create your views here.

def index(request):
    return render(request, 'login/index.html')

def acceso(request):
    
    if request.method == 'POST':

        username = request.POST['username'] 
        password = request.POST['password']
        
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                do_login(request, user)
                return redirect('/inicio/')
        else:
                messages.add_message(request, messages.ERROR, 'La combinación de Correo/contraseña son incorrectos. Inténtalo de nuevo.!')
                return render (request, 'acceso')
    else:
        return redirect('/')


def logout(request):
    # Finalizamos la sesión
    do_logout(request)
    # Redireccionamos a la portada
    return redirect('/')