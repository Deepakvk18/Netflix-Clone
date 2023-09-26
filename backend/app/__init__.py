import logging.config
from os import environ

from celery import Celery
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from requests.exceptions import HTTPError
import json

from .config import config as app_config
from .controller.netflix import netflix_api
from .controller.auth import auth_api
from .controller.users import user_api
from .extensions import (jwt,
                        db)
from .exceptions.custom_exceptions import (NetflixException)
from .utils.messages import msg

celery = Celery(__name__)

def create_app():
    # loading env vars from .env file
    load_dotenv()
    APPLICATION_ENV = get_environment()
    logging.config.dictConfig(app_config[APPLICATION_ENV].LOGGING)
    app = Flask(app_config[APPLICATION_ENV].APP_NAME)
    app.config.from_object(app_config[APPLICATION_ENV])

    CORS(app, resources={r'*': {'origins': '*'}})
    jwt.init_app(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()
        db.session.commit()

    celery.config_from_object(app.config, force=True)
    celery.conf.update(result_backend=app.config['RESULT_BACKEND'])

    register_blueprint(app)

    return app


def get_environment():
    return environ.get('APPLICATION_ENV') or 'development'

def register_blueprint(app):
    api = Api(app, version='1.0', title='Netflix Clone API', doc='/docs')
    api.add_namespace(netflix_api)
    api.add_namespace(auth_api)
    api.add_namespace(user_api)

    @api.errorhandler(HTTPError)
    def http_errorhandler(error):
        logging.error(error.args[0])
        err = json.loads(error.args[1]).get('error')
        logging.error(err)
        return {'message': err.get('message'), 'description': str(error.args[0]), 'status': err.get('code')}

    @api.errorhandler(NetflixException)
    def errors(error):
        logging.error(error)
        desc = msg.get(error.message) if msg.get(error.message) else error.message
        return { 'message': error.message, 'status': 400, 'description': desc}
    

application = create_app()
