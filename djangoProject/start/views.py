from django.shortcuts import render
from django.http import JsonResponse
import random

# Главная страница
def index(request):
    problem = math_problem()
    return render(request, 'index.html', {'problem': problem})

# Генерация случайного примера
def get_problem(request):
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)
    problem = f"{num1} + {num2}"
    correct_answer = num1 + num2
    return JsonResponse({"problem": problem, "answer": correct_answer})

def func(request):
    max_num= request[0]
    min_num = request[1]
    num1 = random.randint(min_num, max_num)
    num2 = random.randint(min_num, max_num)
    sign = request[2]
    quan = request[3]
    if sign=='+':
        problem = f"{num1} + {num2}"
        correct_answer = num1 + num2
    elif sign=='*':
        problem = f"{num1} * {num2}"
        correct_answer = num1 * num2
    return JsonResponse({"problem": problem, "answer": correct_answer})


def math_problem(interval=(0, 100), sign="random"):
    max_num = interval[1]
    min_num = interval[0]
    num1 = random.randint(min_num, max_num)
    num2 = random.randint(min_num, max_num)
    if sign == "random":
        sign = ["+",'*', '-'][random.randint(0,1)]
    problem = f"{num1} {sign} {num2}"
    return problem


# Проверка ответа
def check_answer(request):
    if request.method == "POST":
        user_answer = int(request.POST.get("user_answer"))
        correct_answer = int(request.POST.get("correct_answer"))
        if user_answer == correct_answer:
            return JsonResponse({"result": "Верно!"})
        else:
            return JsonResponse({"result": "Неверно, попробуйте еще раз."})
    return JsonResponse({"result": "Ошибка запроса"})
