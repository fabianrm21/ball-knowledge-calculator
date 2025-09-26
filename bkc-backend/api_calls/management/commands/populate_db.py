from django.core.management.base import BaseCommand
from django.conf import settings
from api_calls.models import Player
import requests
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import quote
from rapidfuzz import fuzz


NUM_PAGES = 2111  # overestimate for number of pages in football-api players paginated endpoint


class Command(BaseCommand):
    help = "Populate or refresh the players database with popularity scores"

    def get_wikipedia_page(self, first_name: str, last_name: str, nationality: str) -> str | None:
        url = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "list": "search",
            "srsearch": f"{first_name} {last_name} football {nationality}",
            "format": "json",
        }

        headers = {
            "User-Agent": "BallKnowledgeCalculator/1.0 (firm.1021@gmail.com)"
        }

        response = requests.get(url, params=params, headers=headers)

        if response.status_code != 200:
            print("response text:", response.text)
            return None
        data = response.json()

        search_results = data.get("query", {}).get("search", [])
        if not search_results:
            return None

        best_match = None
        best_score = 0
        
        for result in search_results:
            # this if statement is causing some big name players to get a score of 0. For example, in the db, Hakimi's last name appears as Hakimi Mouth
            # but nobody knows about the Mouth, so it won't be in the wikipedia title

            # TODO: fix with rapidfuzz
            
            title = result["title"]
            full_name = f"{first_name} {last_name}"
            score = fuzz.token_set_ratio(full_name.lower(), title.lower())  # TODO: use casefold() here instead of lower()

            if score > best_score:
                best_match = title
                best_score = score
            # if last_name and (last_name.lower() in result["title"].lower()):
            #     return result["title"]

        # return search_results[0]["title"]
        # return None
        return best_match if best_score > 20 else None


    def get_wikipedia_views(self, title: str, days: int = 30) -> int:
        end_date = datetime.utcnow().date()
        start_date = end_date - timedelta(days=days)

        url = f"https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/{quote(title)}/daily/{start_date.strftime('%Y%m%d')}/{end_date.strftime('%Y%m%d')}"
        headers = {
            "User-Agent": "BallKnowledgeCalculator/1.0 (firm.1021@gmail.com)"
        }

        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            return 0
                
        data = response.json().get("items", [])
        total_views = sum(item["views"] for item in data)
        return total_views
    

    def fetch_player_data(self, player_obj):
        player = player_obj["player"]
        wiki_page_title = self.get_wikipedia_page(first_name=player["firstname"],
                                                  last_name=player["lastname"],
                                                  nationality=player["nationality"])
        
        num_views = self.get_wikipedia_views(wiki_page_title) if wiki_page_title else 0

        return Player(
                    id=player["id"],
                    name=player["name"],
                    firstname=player["firstname"],
                    lastname=player["lastname"],
                    photo=player["photo"],
                    wiki_views=num_views
                )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting DB population..."))

        for i in range(1, NUM_PAGES):
            self.stdout.write(f"Populating with players from page {i}...")
            url = f"https://v3.football.api-sports.io/players/profiles?page={i}"
            headers = {"x-apisports-key": settings.FOOTBALL_API_KEY}

            response = requests.get(url, headers=headers)

            if response.status_code != 200:
                self.stdout.write(self.style.SUCCESS("Final page of pagination reached"))
                break

            
            # debug_data = response.json()
            # debug_data_data = {k: v for k, v in debug_data.items() if k != "response"}
            # print("this is the response:", debug_data_data)

            players = response.json().get("response")
            if not players:
                self.stdout.write(self.style.SUCCESS("No more players found. Stopping pagination."))
                break


            batch = []
            with ThreadPoolExecutor(max_workers=15) as executor:
                futures = [executor.submit(self.fetch_player_data, player) for player in players]
                for f in as_completed(futures):
                    try:
                        batch.append(f.result())
                    except Exception as e:
                        print("Error processing player:", e)

            self.stdout.write(f"Inserting into db players from page {i}...")
            Player.objects.bulk_create(batch)

        self.stdout.write(self.style.SUCCESS("Succesfully populated database!"))