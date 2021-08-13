from django.shortcuts import render
from django.http import HttpResponse
from .models import Participants
from .models import Camps
from .models import Photos
from .models import Staff
import json


def all_participants(request):
    par_mas = []
    staff_mas = []
    for e in Participants.objects.all():
        d = {}
        d["name"] = e.name + " " + e.surname
        d["photo"] = e.photo
        d["house"] = e.room
        d["agreement"] = e.agreement
        d["telegram"] = e.tg
        d["camp"] = ", ".join(list(map(str, e.camps.all())))
        d["town"] = e.town
        par_mas.append(d)

    for q in Staff.objects.all():
        d = {}
        d["name"] = q.name + " " + q.surname
        d["photo"] = q.photo
        d["house"] = q.room
        d["agreement"] = q.agreement
        d["telegram"] = q.tg
        d["camp"] = ", ".join(list(map(str, q.camps.all())))
        staff_mas.append(d)
        mas = []
        mas.append(par_mas)
        mas.append(staff_mas)
    return HttpResponse(json.dumps(mas))


def all_camps(request):
    camps_ = []
    for i in Camps.objects.all():
        camps_.append(str(i.name))
    return HttpResponse(json.dumps(camps_))


def all_photos(request):
    photos_ = []
    for j in Photos.objects.all():
        photo = {}
        photo["camp"] = str(j.camp)
        photo["participants"] = j.participants
        photo["staffs"] = j.staffs
        photo["URL"] = j.URL
        photos_.append(photo)
    return HttpResponse(json.dumps(photos_))


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


#нельзя не выбрать одного из уч и ор
#ошибка с photo