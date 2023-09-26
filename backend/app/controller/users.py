from . import user_api
from ..models.user_models import User, Profiles, Ratings, Plans

from flask_restx import Resource
import datetime
import json
from requests.exceptions import HTTPError
import logging

@user_api.errorhandler(HTTPError)
def http_errorhandler(error):
    logging.error(error.args[0])
    err = json.loads(error.args[1]).get('error')
    logging.error(err)
    return {'message': err.get('message'), 'description': str(error.args[0])}, err.get('code')

@user_api.errorhandler(Exception)
def errors(error):
    logging.error(error)
    return { 'message': f'{error}', }, 400

@user_api.route('/add')
class SignUpEmail(Resource):

    @user_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    def post():
        """Sign Up the users with only email"""
        email = user_api.payload.get('email')

        user = User(email=email, plan=0, subscribed_at=datetime.datetime.now())
        return "Sign up Message"