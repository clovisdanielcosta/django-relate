from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from core.models import Activities
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from datetime import datetime, timedelta
from django.http.response import Http404, JsonResponse

def login_user(request):
        return render(request, 'login.html')

def submit_login(request):
        if request.POST:
                username = request.POST.get('username')
                password = request.POST.get('password')
                usuario = authenticate(username=username, password=password)
                if usuario is not None:
                        login(request, usuario)
                        return redirect('/')
                else:
                        messages.error(request, 'Usuário ou Senha inválidos')
        return  redirect('/')

#@login_required(login_url='/login/') # Precisa colocar a barra no início pra não concatenar
def home(request):

    return render(request, 'home.html')


#@login_required(login_url='/login/') # Precisa colocar a barra no início pra não concatenar
def activities(request):

    return render(request, 'activities.html')
