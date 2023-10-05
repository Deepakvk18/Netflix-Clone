from . import netflix_api
from flask import request
from flask_restx import Resource, fields
import os
import requests
from dotenv import load_dotenv
from ..services.authentication import firebase 

load_dotenv()
API_KEY = os.getenv('TMDB_API_KEY')

api_requests = {
    'fetchTrending': f'/trending/all/week?api_key={API_KEY}&language=en-US',
    'popularTV': f'/tv/popular?api_key={API_KEY}&language=en-US',
    'fetchNetflixOriginals': f'discover/tv?api_key={API_KEY}&with_networks=213',
    'fetchTopRated':  f'/movie/top_rated?api_key={API_KEY}&language=en-US',
    'fetchActionMovies': f'/discover/movie?api_key={API_KEY}&with_genres=28',
    'fetchComedyMovies': f'/discover/movie?api_key={API_KEY}&with_genres=35',
    'fetchHorrorMovies': f'/discover/movie?api_key={API_KEY}&with_genres=27',
    'fetchRomanceMovies': f'/discover/movie?api_key={API_KEY}&with_genres=10749',
    'fetchDocumentaryMovies': f'/discover/movie?api_key={API_KEY}&with_genres=99',
}

API_BASE_URL = 'https://api.themoviedb.org/3'

def return_api_response(url):

    headers = {"accept": "application/json"}

    response = requests.get(url, headers=headers)
    return response.json()


@netflix_api.route('/shows/<query>/')
class Shows(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request'})
    def get(self, query, page=1):
        """Get a list of movies via query"""
        url = f"{API_BASE_URL}/{api_requests.get(query)}"
        print(url)
        return return_api_response(url)

@netflix_api.route('/shows/<query>/<int:page>')
class ManyShows(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request'})
    def get(self, query, page=1):
        """Get a list of movies via query and page number"""
        url = f"{API_BASE_URL}/{api_requests.get(query)}&page={page}"
        return return_api_response(url)


@netflix_api.route('/search/<query>/<type>/<adult>/<int:page>')
class GetSearchResults(Resource):

    def get(self, type, query, adult, page=1):
        """Get search results for a query and page number"""
        url = f'{API_BASE_URL}/search/{type}?api_key={API_KEY}&query={query}&adult={adult}&language=en-US&page=1&include_adult={adult}&page={page}'
        return return_api_response(url)


@netflix_api.route('/<type>/<int:show_id>/<int:page>')
class GetMovieOrTVRecommendations(Resource):

    def get(self, type, show_id, page=1):
        """Get Recommendations for a particular show id and page number"""
        url = f'{API_BASE_URL}/{type}/{show_id}/recommendations?api_key={API_KEY}&page={page}'
        print(url)
        return return_api_response(url)

@netflix_api.route('/<type>/<int:show_id>')
class GetMovieOrTVDetails(Resource):

    def get(self, type, show_id):
        """Get Details of a particular show"""
        url = f'{API_BASE_URL}/{type}/{show_id}?api_key={API_KEY}'
        return return_api_response(url)

@netflix_api.route('/<int:show_id>/<int:season_no>')
class GetTVSeasonDetails(Resource):

    def get(self, show_id, season_no):
        """Get season details of a particular show"""
        url = f'{API_BASE_URL}/tv/{show_id}/season/{season_no}?api_key={API_KEY}'
        return return_api_response(url)

@netflix_api.route('/<int:show_id>/<int:season_no>')
class GetTVSeasonVideos(Resource):

    def get(self, show_id, season_no):
        """Get videos of a particular season of a particular show"""
        url = f'{API_BASE_URL}/tv/{show_id}/season/{season_no}/videos?api_key={API_KEY}'
        print(url)
        return return_api_response(url)

@netflix_api.route('/<int:show_id>/<type>')
class GetShowVideos(Resource):

    def get(self, show_id, type):
        """Get videos of a particular show"""
        url = f'{API_BASE_URL}/{type}/{show_id}/videos?api_key={API_KEY}'
        print(url)
        return return_api_response(url)

@netflix_api.route('/db')
class GetShowVideos(Resource):

    def get(self):
        """Get videos of a particular show"""
        print(firebase.db())
        return 
