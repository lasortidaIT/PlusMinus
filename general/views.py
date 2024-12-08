from django.shortcuts import render
from django.shortcuts import redirect


def redirect_temp(request):
    response = redirect('/main-game')
    return response
