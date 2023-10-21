import logging.config
from os import environ

from celery import Celery
from dotenv import load_dotenv
from flask import Flask, request, make_response
from flask_cors import CORS
from flask_restx import Api
from requests.exceptions import HTTPError
import json

from .config import config as app_config
from .controller.netflix import netflix_api
from .controller.auth import auth_api
from .controller.users import user_api
from .controller.profiles import profile_api
from .controller.payments import payments_api
from .extensions import (db, migrate)
from .exceptions.custom_exceptions import (NetflixException, AuthException)
from .utils.messages import msg
from . import constants

celery = Celery(__name__)

def create_app():
    # loading env vars from .env file
    load_dotenv()
    APPLICATION_ENV = get_environment()
    logging.config.dictConfig(app_config[APPLICATION_ENV].LOGGING)
    app = Flask(app_config[APPLICATION_ENV].APP_NAME)
    app.config.from_object(app_config[APPLICATION_ENV])

    cors_config = {
        'origins': [constants.FRONTEND],
        'methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
        'allowed_headers': ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
        'expose_headers': '*',
    }

    
    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()
        db.session.commit()

    celery.config_from_object(app.config, force=True)
    celery.conf.update(result_backend=app.config['RESULT_BACKEND'])

    register_blueprint(app)
    CORS(app, resources={r'*': cors_config }, supports_credentials=True)

    return app


def get_environment():
    return environ.get('APPLICATION_ENV') or 'development'

def register_blueprint(app):
    api = Api(app, version='1.0', title='Netflix Clone API', doc='/docs')
    api.add_namespace(netflix_api)
    api.add_namespace(auth_api)
    api.add_namespace(user_api)
    api.add_namespace(profile_api)
    api.add_namespace(payments_api)

    @api.errorhandler(HTTPError)
    def http_errorhandler(error):
        logging.error(error.args[0])
        err = json.loads(error.args[1]).get('error')
        logging.error(err)
        return {'message': err.get('message'), 'description': str(error.args[0]), 'status': err.get('code')}, err.get('code')
    
    @api.errorhandler(AuthException)
    def auth_exception(error):
        logging.error(error)
        desc = msg.get(error.message) if msg.get(error.message) else error.message
        return { 'message': error.message, 'status': 403, 'description': desc}, 403

    @api.errorhandler(NetflixException)
    def netflix_exception(error):
        logging.error(error)
        desc = msg.get(error.message) if msg.get(error.message) else error.message
        return { 'message': error.message, 'status': 400, 'description': desc}, 400

    @api.errorhandler(Exception)
    def general_exception(error):
        logging.error(error)
        return { 'message': str(error), 'status': 400, 'description': 'Some Error Occured'}, 500
    

application = create_app()
