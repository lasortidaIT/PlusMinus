from django.shortcuts import render

def default_game_index(request):
    return render(request, 'default_game.html')
