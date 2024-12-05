from django.shortcuts import render

def login_index(request):
    return render(request, 'login.html')

def reg_index(request):
    return render(request, 'signup.html')