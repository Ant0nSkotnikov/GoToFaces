from django.db import models


class Camps(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(max_length=200)
    start_date = models.DateTimeField(max_length=200)
    end_date = models.DateTimeField(max_length=200)
    place = models.CharField(max_length=200)
    photo_camp = models.CharField(max_length=400)


class Participants(models.Model):
    def __str__(self):
        return self.name + " " + self.surname

    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    patronymic = models.CharField(max_length=200)
    room = models.IntegerField(default=0)
    birthday = models.DateTimeField(max_length=200)
    agreement = models.CharField(max_length=200)
    photo = models.CharField(max_length=200)
    tg = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    camps = models.ManyToManyField(Camps)
    town = models.CharField(max_length=200)


class Staff(models.Model):
    def __str__(self):
        return self.name + " " + self.surname

    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    patronymic = models.CharField(max_length=200)
    room = models.IntegerField(default=0)
    birthday = models.DateTimeField(max_length=200)
    agreement = models.CharField(max_length=200)
    photo = models.CharField(max_length=200)
    tg = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    camps = models.ManyToManyField(Camps)


class Photos(models.Model):
    def __str__(self):
        return self.URL

    camp = models.CharField(max_length=200)
    participants = models.ManyToManyField(Participants)
    staffs = models.ManyToManyField(Staff)
    URL = models.CharField(max_length=200)

