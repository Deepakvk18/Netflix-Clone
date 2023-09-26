import os
from dotenv import load_dotenv
import pyrebase
from functools import wraps
from flask import request
from requests.exceptions import HTTPError
import logging

from ..exceptions.custom_exceptions import AuthException
from ..models.auth_models import Session
from ..extensions import db

class FireBaseAuth:

    def __init__(self):
        load_dotenv()
        config = {
            'apiKey': os.environ.get('apiKey'),
            'authDomain': os.environ.get('authDomain'),
            'storageBucket': os.environ.get('storageBucket'),
            'messagingSenderId': os.environ.get('messagingSenderId'),
            'appId': os.environ.get('appId'),
            'databaseURL': ''
        }
        firebase = pyrebase.initialize_app(config=config)
        self.auth = firebase.auth()

    def login(self, email, password):
        return self.auth.sign_in_with_email_and_password(email, password)

    def validate(self, token):
        return self.auth.get_account_info(token)

    def refresh(self, token):
        return self.auth.refresh(refresh_token=token)

    def signup(self, email, password):
        return self.auth.create_user_with_email_and_password(email, password)

    def delete(self, token):
        return self.auth.delete_user_account(token)

    def send_verification(self, token):
        return self.auth.send_email_verification(token)
    
    def send_password_reset_email(self, email):
        return self.auth.send_password_reset_email(email)

    def jwt_required(self, api_func):

        @wraps(api_func)
        def wrapper(*args, **kwargs):

            jwt = self.get_token()
            self.validate(jwt)
            return api_func(*args, **kwargs)

        return wrapper

    @staticmethod
    def get_token():
        try:
            jwt = request.headers.get('Authorization').split()[1]
            return jwt
        except Exception as e:
            logging.error(e)
            raise AuthException(message='NO_TOKEN')
    