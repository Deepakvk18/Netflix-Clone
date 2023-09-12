import logging.config
from os import environ

from celery import Celery
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restx import Api

from .config import config as app_config
from .controller.routes import netflix_api

celery = Celery(__name__)

def create_app():
    # loading env vars from .env file
    load_dotenv()
    APPLICATION_ENV = get_environment()
    logging.config.dictConfig(app_config[APPLICATION_ENV].LOGGING)
    app = Flask(app_config[APPLICATION_ENV].APP_NAME)
    app.config.from_object(app_config[APPLICATION_ENV])

    CORS(app, resources={r'/api/*': {'origins': '*'}})

    celery.config_from_object(app.config, force=True)
    # celery is not able to pick result_backend and hence using update
    celery.conf.update(result_backend=app.config['RESULT_BACKEND'])

    register_blueprint(app)

    return app


def get_environment():
    return environ.get('APPLICATION_ENV') or 'development'

def register_blueprint(app):
    api = Api(app, version='1.0', title='Netflix Clone API', doc='/docs')
    api.add_namespace(netflix_api)
    

application = create_app()
