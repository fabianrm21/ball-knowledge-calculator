from django.db import models

class Player(models.Model):
    id = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField()
    firstname = models.CharField(null=True, blank=True)
    lastname = models.CharField(null=True, blank=True)
    photo = models.TextField()
    wiki_views = models.IntegerField()


    def __str__(self):
        return f"{self.lastname}, {self.firstname}, also known as {self.name} and their score is {self.wiki_views}"