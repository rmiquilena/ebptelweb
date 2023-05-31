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

# Create your views here.
def Productos(request):
    return render(request, 'productos/index.html')