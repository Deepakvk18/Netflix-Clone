import os
from dotenv import load_dotenv
import pyrebase
from functools import wraps
from flask import request
from requests.exceptions import HTTPError
import logging

from ..exceptions.custom_exceptions import AuthException
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

    def refresh(self):
        return self.auth.refresh(refresh_token=self.get_refresh_token())

    def signup(self, email, password):
        return self.auth.create_user_with_email_and_password(email, password)

    def delete(self):
        return self.auth.delete_user_account(self.get_token())

    def send_verification(self, token):
        return self.auth.send_email_verification(token)
    
    def send_password_reset_email(self, email):
        return self.auth.send_password_reset_email(email)

    def jwt_required(self, api_func):

        @wraps(api_func)
        def wrapper(*args, **kwargs):

            jwt = self.get_token()
            print(jwt)
            self.validate(jwt)
            return api_func(*args, **kwargs)

        return wrapper

    @staticmethod
    def get_token():
        try:
            jwt = request.headers.get('Authorization').split()[1]

        except Exception as exc:
            logging.error(str(exc))
            raise AuthException(message='NO_TOKEN_FOUND')
            
        return jwt

    @staticmethod
    def get_refresh_token():
        refresh = request.cookies.get('refresh_token')
        print(request.headers.get('Set-Cookie'))
        if not refresh:
            raise AuthException(message='NO_REFRESH_TOKEN_FOUND')
        return refresh
    
    def get_user(self):
        jwt = self.get_token()
        valid = self.validate(jwt)
        return {'email': valid.get('users')[0].get('email'), 'localId': valid.get('users')[0].get('localId')}

    
    


firebase = FireBaseAuth()
    