from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .generator import Generator

@csrf_exempt
def default_game_index(request):
    if request.method == "POST":
        max_number = int(request.POST.get("max_number"))
        negative = bool(request.POST.get("negative"))
        sign = request.POST.get("sign")
        infi = bool(request.POST.get("infinity"))
        amount = int(request.POST.get("amount"))
        generator = Generator(rang=(0, max_number), negative=negative, signs=sign, infi=infi, amount=amount)
        content = generator.main()
        print(content)
        return JsonResponse({'content': content})
    else:
        return render(request, 'default_game.html')
