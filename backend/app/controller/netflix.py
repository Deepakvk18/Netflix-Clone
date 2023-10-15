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
    'fetchPopularTV': f'/tv/popular?api_key={API_KEY}&language=en-US',
    'fetchNetflixOriginals': f'discover/tv?api_key={API_KEY}&with_networks=213',
    'fetchTopRatedTV':  f'/tv/top_rated?api_key={API_KEY}&language=en-US',
    'fetchTopRated':  f'/movie/top_rated?api_key={API_KEY}&language=en-US',
    'fetchActionMovies': f'/discover/movie?api_key={API_KEY}&with_genres=28',
    'fetchComedyMovies': f'/discover/movie?api_key={API_KEY}&with_genres=35',
    'fetchHorrorMovies': f'/discover/movie?api_key={API_KEY}&with_genres=27',
    'fetchRomanceMovies': f'/discover/movie?api_key={API_KEY}&with_genres=10749',
    'fetchDocumentaries': f'/discover/movie?api_key={API_KEY}&with_genres=99',
    'upComingMovies': f'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3'
}

API_BASE_URL = 'https://api.themoviedb.org/3'

def return_api_response(url):

    headers = {"accept": "application/json"}

    response = requests.get(url, headers=headers)
    print(response)
    return response.json()


@netflix_api.route('/shows/<query>/')
class Shows(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @netflix_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, query):
        """Get a list of movies via query"""
        url = f"{API_BASE_URL}/{api_requests.get(query)}"
        print(url)
        return return_api_response(url)

@netflix_api.route('/moreShows/<query>/')
class ManyShows(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @netflix_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, query):
        """Get a list of movies upto 7 pages via query"""
        res = []
        for i in range(1, 5):
            url = f"{API_BASE_URL}/{api_requests.get(query)}&page={i}"
            res.extend(return_api_response(url).get('results'))
        return res

@netflix_api.route('/search/<query>/<type>/')
class GetTvOrMovieSearchResults(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @netflix_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, type, query):
        """Get search results for a query and page number"""
        url = f'{API_BASE_URL}/search/{type}?api_key={API_KEY}&query={query}&language=en-US&page=1&include_adult=false'
        return return_api_response(url)


@netflix_api.route('/recommend/<type>/<int:show_id>')
class GetMovieOrTVRecommendations(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @netflix_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, type, show_id):
        """Get Recommendations for a particular show id and page number"""
        url = f'{API_BASE_URL}/{type}/{show_id}/recommendations?api_key={API_KEY}'
        print(url)
        return return_api_response(url)

@netflix_api.route('/details/<type>/<int:show_id>')
class GetMovieOrTVDetails(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @netflix_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, type, show_id):
        """Get Details of a particular show"""
        url = f'{API_BASE_URL}/{type}/{show_id}?api_key={API_KEY}'
        return return_api_response(url)

@netflix_api.route('/season/<int:show_id>/<season_no>')
class GetTVSeasonDetails(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @netflix_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, show_id, season_no):
        """Get season details of a particular show"""
        url = f'{API_BASE_URL}/tv/{show_id}/season/{season_no}?api_key={API_KEY}'
        return return_api_response(url)

@netflix_api.route('/videos/<type>/<int:show_id>')
class GetShowVideos(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @netflix_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, show_id, type):
        """Get videos of a particular show"""
        url = f'{API_BASE_URL}/{type}/{show_id}/videos?api_key={API_KEY}&append_to_response=video'
        return return_api_response(url)
    
def get_show_details(show_id, type):
    url = f'{API_BASE_URL}/{type}/{show_id}?api_key={API_KEY}'
    return return_api_response(url)

def get_recommendations(likes):
    pass