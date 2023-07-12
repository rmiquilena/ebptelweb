from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse
from django.http import HttpResponse, JsonResponse
from django.db import connection
from django.conf import settings
from funtions import dictfetchall
import json


# Create your views here.
def home(request):
    template_name = "dashboard/index.html"
    usuario = request.user.pk
    return render(request, template_name, {'userid':usuario})
    #if request.user.is_authenticated:
        #if request.user.groups.filter(name__in=['Superadministrador', 'Administrador']).exists():
            
