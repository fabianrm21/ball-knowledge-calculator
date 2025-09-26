from django.core.management.base import BaseCommand
from django.conf import settings
from api_calls.models import Player
import requests
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = "Erase db data"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Erasing database data..."))
        Player.objects.all().delete()
        # players = list(Player.objects.all())
        # with open("players.txt", "w", encoding="utf-8") as f:
        #     for player in players:
        #         f.write(f"{player}\n")
        self.stdout.write(self.style.SUCCESS("Erased database data!"))
