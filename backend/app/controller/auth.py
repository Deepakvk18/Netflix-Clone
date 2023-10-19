import json
from requests.exceptions import HTTPError

import logging
from flask import request, make_response, jsonify
from flask_restx import Resource
from flask_cors import cross_origin
from requests.exceptions import HTTPError

from ..services.authentication import FireBaseAuth
from ..schemas.auth_schema import (sign_in_model,
                                sign_in_output,
                                validate_output,
                                refresh_output,
                                message_output)
from ..models.user_models import User
from .users import get_plan
from ..models.profile_models import Profiles
from . import auth_api
from ..exceptions.custom_exceptions import AuthException
from ..extensions import db
from ..services.authentication import firebase
from .. import constants

@auth_api.route('/signup')
class SignUp(Resource):

    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    @auth_api.expect(sign_in_model)
    # @auth_api.marshal_with(sign_in_output)
    def post(self):
        """Sign up for the Application using email and password"""
        # Your code to fetch movies goes here
        sign_up = auth_api.payload
        try:
            signed_in = firebase.signup(sign_up.get('email'), sign_up.get('password'))
        except HTTPError as e:
            signed_in = firebase.login(sign_up.get('email'), sign_up.get('password'))
        user = User.query.filter_by(email=sign_up.get('email')).first()
        user.uuid = signed_in.get('localId')
        db.session.commit()
        signed_in = sign_in(sign_up.get('email'), sign_up.get('password'))
        return (signed_in)

@auth_api.route('/signin')
class LogIn(Resource):

    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    @auth_api.expect(sign_in_model)
    # @auth_api.marshal_with(sign_in_output)
    def post(self):
        """Sign in to the Application using email and password"""
        sign_in_payload = auth_api.payload
        signed_in = sign_in(sign_in_payload.get('email'), sign_in_payload.get('password'))
        return (signed_in)

@auth_api.route('/verifyIdentity')
class Identity(Resource):

    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 403: 'Unauthorized', 500: 'Server Error'}, )
    @auth_api.doc(security='jsonWebToken')
    @firebase.jwt_required
    @auth_api.marshal_with(validate_output)
    def get(self):
        """Get the identity of the user given the token id"""
        user = firebase.get_user()
        return {'email': user.get('email'),'localId': user.get('localId') , 'valid': 'true'}

@auth_api.route('/refresh')
class Refresh(Resource):
    
    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 403: 'Unauthorized', 500: 'Server Error'}, )
    @auth_api.doc(security='jsonWebToken')
    # @auth_api.marshal_with(refresh_output)
    def get(self):
        """Get the new access token of the user given a refresh token"""
        new_info = firebase.refresh()
        response = make_response({'email': new_info.get('email'), 'idToken': new_info.get('idToken'), 'localId': new_info.get('localId'), 'refreshToken': new_info.get('refreshToken')})
        response.set_cookie('refresh_token', value=new_info.get('refreshToken'), domain=constants.COOKIE_FRONTEND, httponly=True, max_age=2560000, secure=True, samesite=None)
        return response

@auth_api.route('/logout')
class Logout(Resource):

    @auth_api.doc(responses={200: 'Success', 400: 'Bad Request', 403: 'Unauthorized', 500: 'Server Error'}, )
    # @auth_api.marshal_with(message_output)
    def delete(self):
        """Destroys Refresh token & Acces token from cookies once the user is logged out"""
        # Destroy both the refresh token and accesss token once the user is logged out
        response = make_response(jsonify({'message': 'User Logged out Successfully'}))
        response.set_cookie('access_token', '', expires=0, httponly=True)
        response.set_cookie('refresh_token', '', expires=0, httponly=True)
        return response

def create_first_profiles(user_id):
    """Create the first profile for the user automatically"""
    profile = Profiles.query.filter_by(user_id=user_id).first()
    if not profile:
        profile = Profiles(user_id=user_id, children=True, name='Children')
        db.session.add(profile)
        db.session.commit()


def sign_in(email, password):
    """Method to sign in to the firebase account"""
    user = User.query.filter_by(email=email).first()
    plan = get_plan(user.plan)
    signed_in = firebase.login(email, password)
    create_first_profiles(signed_in.get('localId'))
    refresh = signed_in.get('refreshToken')
    id_token = signed_in.get('idToken')
    refresh = signed_in.get('refreshToken')
    signed_in = make_response({ 'email': signed_in.get('email'), 'userId': signed_in.get('localId'), 'idToken': signed_in.get('idToken'), 'plan': plan.to_dict(), 'user': user.to_dict() })
    signed_in.set_cookie('refresh_token', domain=constants.COOKIE_FRONTEND, value=refresh, httponly=True, max_age=2560000, samesite=None, secure=True)
    
    return signed_in
