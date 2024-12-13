from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


def login_index(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('./profile')
        else:
            messages.success(request, "Loh")
            return redirect('./login')


    return render(request, 'login.html')

def reg_index(request):
    return render(request, 'signup.html')