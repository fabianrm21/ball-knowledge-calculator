from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.db.models import Q
import requests
from rapidfuzz import fuzz, process
from .models import Player


class ValidatePlayersAPIView(APIView):

    def find_common_teams(self, player1_teams, player2_teams):
        results = []

        for t1 in player1_teams:
            for t2 in player2_teams:
                if t1["team"] == t2["team"]:
                    common_seasons = list(set(t1["seasons"]) & set(t2["seasons"]))
                    if common_seasons:
                        results.append({"team": t1["team"],
                                        "seasons": sorted(common_seasons)})
        
        return results
    

    def validate_players(self, player1_id: str, player2_id: str) -> bool:
        headers = {"x-apisports-key": settings.FOOTBALL_API_KEY}
        url1 = f"https://v3.football.api-sports.io/players/teams?player={player1_id}"  # this returns a list that looks like this [{"team": "PSG", "seasons": [2016, 2017]}, {...}], if we do response.json().get("response")
        url2 = f"https://v3.football.api-sports.io/players/teams?player={player2_id}"

        # TODO: there might be a way to make both requests simultaneously with sockets or some shit
        response1 = requests.get(url1, headers=headers)
        response2 = requests.get(url2, headers=headers)


        player1_teams = response1.json().get("response")
        player2_teams = response2.json().get("response")

        # get a list of all teams in common
        matching_teams = self.find_common_teams(player1_teams=player1_teams,
                                                player2_teams=player2_teams)
        
        # print("matching teams:", matching_teams)
        
        return len(matching_teams) > 0


    def post(self, request):
        player1_id = request.data.get("player1ID")
        player2_id = request.data.get("player2ID")

        is_match = self.validate_players(player1_id, player2_id)
        return Response({"is_match": is_match,}, status=status.HTTP_200_OK)
    

class GetRandomPlayerAPIView(APIView):

    def get(self, request):
        neymar = {
            "player": {
                "id": 276,
                "name": "Neymar",
                "firstname": "Neymar",
                "lastname": "da Silva Santos Júnior",
                "age": 33,
                "birth": {
                    "date": "1992-02-05",
                    "place": "Mogi das Cruzes",
                    "country": "Brazil"
                },
                "nationality": "Brazil",
                "height": "175",
                "weight": "68",
                "number": 10,
                "position": "Attacker",
                "photo": "https://media.api-sports.io/football/players/276.png"
            }
        }
        return Response(neymar, status=status.HTTP_200_OK)
    

class FetchSearchResultsAPIView(APIView):

    def get(self, request, query):
        candidates = Player.objects.filter(
            Q(name__icontains=query) |
            Q(firstname__icontains=query) |
            Q(lastname__icontains=query)
        )[:500]

        if not candidates:
            return Response([], status=status.HTTP_200_OK)
        
        max_views = max((p.wiki_views for p in candidates), default=1)
        results = []
        for player in candidates:
            # player_full_name = f"{player.firstname} {player.lastname}"
            # fuzzy_score = fuzz.ratio(query.lower(), player_full_name.lower())
            fuzzy_score = fuzz.ratio(query.lower(), player.name.lower())

            normalized_fuzz = fuzzy_score / 100
            normalized_views = player.wiki_views / max_views if max_views > 0 else 0

            search_score = 0.6 * normalized_fuzz + 0.4 * normalized_views
            results.append({
                "player": {
                    "id": player.id,
                    "name": player.name,
                    "photo": player.photo,
                },
                "search_score": search_score
            })

        results.sort(
            key=lambda r: (r["search_score"]),
            reverse=True
        )

        return Response(results[:10], status=status.HTTP_200_OK)
