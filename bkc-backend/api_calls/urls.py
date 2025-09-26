from django.urls import path
from .views import *

urlpatterns = [
    path("validate-players/", ValidatePlayersAPIView.as_view(), name="validate"),
    path("random-player/", GetRandomPlayerAPIView.as_view(), name="get-random-player"),
    path("search-player/<str:query>/", FetchSearchResultsAPIView.as_view(), name="search-players"),
]
