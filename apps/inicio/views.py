from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse
from django.http import HttpResponse, JsonResponse
from django.db import connection
from funtions import dictfetchall
from django.core import serializers
import json

# Create your views here.
def inicio(request):
    #print("Grupo=> ", request.user.groups)
    template_name = "inicio/index.html"
    usuario = request.user.pk
    if request.user.is_authenticated:
        if request.user.groups.filter(name__in=['Superadministrador', 'Administrador']).exists():
            return render(request, template_name, {'Idusuario':usuario})
    return redirect('/')
