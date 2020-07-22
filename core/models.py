from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


# Create your models here.

class Activities (models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    data_evento = models.DateTimeField(verbose_name='Data do Evento')
    local = models.CharField(max_length=100, blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE) # Para usar os usuários do Django
