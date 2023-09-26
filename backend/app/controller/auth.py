import json
from requests.exceptions import HTTPError

import logging
from flask import request
from flask_restx import Resource

from ..services.authentication import FireBaseAuth
from ..schemas.auth_schema import (sign_in_model,
                                sign_in_output,
                                validate_output,
                                refresh_output,
                                delete_output)
from . import auth_api
from ..exceptions.custom_exceptions import AuthException
from ..models.auth_models import Session
from ..extensions import db

firebase = FireBaseAuth()

# @auth_api.errorhandler(HTTPError)
# def http_errorhandler(error):
#     logging.error(error.args[0])
#     err = json.loads(error.args[1]).get('error')
#     logging.error(err)
#     return {'message': err.get('message'), 'description': str(error.args[0])}, err.get('code')

# @auth_api.errorhandler(Exception)
# def errors(error):
#     logging.error(error)
#     return { 'message': f'{error}', }, 400

@auth_api.route('/signup')
class SignUp(Resource):

    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    @auth_api.expect(sign_in_model)
    @auth_api.marshal_with(sign_in_output)
    def post(self):
        """Sign up for the Application using email and password"""
        # Your code to fetch movies goes here
        sign_up = auth_api.payload
        signed_in = firebase.signup(sign_up.get('email'), sign_up.get('password'))
        refresh = signed_in.get('refreshToken')
        session = Session.query.filter_by(email=sign_up.get('email')).first()
        if not session:
            session = Session(email=sign_up.get('email'), refresh_token=refresh)
            db.session.add(session)
        session.refresh_token = refresh
        db.session.commit()
        return signed_in

@auth_api.route('/signin')
class LogIn(Resource):

    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    @auth_api.expect(sign_in_model)
    @auth_api.marshal_with(sign_in_output)
    def post(self):
        """Sign in to the Application using email and password"""
        # Your code to fetch movies goes here
        sign_in = auth_api.payload
        signed_in = firebase.login(sign_in.get('email'), sign_in.get('password'))
        refresh = signed_in.get('refreshToken')
        session = Session.query.filter_by(email=sign_in.get('email')).first()
        if not session:
            session = Session(email=sign_in.get('email'), refresh_token=refresh)
            db.session.add(session)
        session.refresh_token = refresh
        db.session.commit()
        return signed_in

@auth_api.route('/verifyIdentity')
class Identity(Resource):

    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 403: 'Unauthorized', 500: 'Server Error'}, )
    @auth_api.doc(security='jsonWebToken')
    @firebase.jwt_required
    @auth_api.marshal_with(validate_output)
    def get(self):
        """Get the identity of the user given the token id"""
        token = FireBaseAuth.get_token()
        email = firebase.validate(token).get('users')[0].get('email')
        return {'email': email, 'valid': 'true'}

@auth_api.route('/refresh')
class Refresh(Resource):
    
    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 403: 'Unauthorized', 500: 'Server Error'}, )
    @auth_api.doc(security='jsonWebToken')
    @firebase.jwt_required
    @auth_api.marshal_with(refresh_output)
    def get(self):
        """Get the new access token of the user given a refresh token"""
        token = FireBaseAuth.get_token()
        email = firebase.validate(token).get('users')[0].get('email')
        session = Session.query.filter_by(email=email).first()
        if not session or not session.refresh_token:
            raise AuthException(message='NO_VALID_TOKEN')
        new_info = firebase.refresh(session.refresh_token)
        session.refresh_token = new_info.get('refreshToken')
        db.session.commit()
        return {'email': email, 'idToken': new_info.get('idToken')}

@auth_api.route('/delete')
class Delete(Resource):
    
    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 403: 'Unauthorized', 500: 'Server Error'}, )
    @auth_api.doc(security='jsonWebToken')
    @firebase.jwt_required
    @auth_api.marshal_with(delete_output)
    def delete(self):
        """Delete the user with the id token"""
        token = FireBaseAuth.get_token()
        firebase.delete(token)
        return {'message': 'User Deleted Successfully!!'}
        