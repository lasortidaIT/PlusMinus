from django.shortcuts import render

def day_problem_index(request):
    return render(request, 'day_problem.html')
