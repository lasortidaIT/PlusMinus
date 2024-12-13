from django.contrib.auth import admin
from django.urls import path
from default_game.views import default_game_index
from day_problem.views import day_problem_index
from loging.views import login_index, reg_index
from general.views import redirect_temp
from profile_app.views import profile_index
from django.contrib import admin

urlpatterns = [
    path('admin', admin.site.urls),
    path('main-game', default_game_index),
    path('problem-day', day_problem_index),
    path('login', login_index),
    path('signup', reg_index),
    path('profile', profile_index),
    path('', redirect_temp),
]
