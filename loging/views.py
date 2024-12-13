from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm


def login_index(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('./profile')
        else:
            return redirect('./login')


    return render(request, 'login.html')

def reg_index(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        for field in form:
            print("Field Error:", field.name, field.errors)
        if form.is_valid():
            print('heelo')
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('./profile')
    return render(request, 'signup.html')