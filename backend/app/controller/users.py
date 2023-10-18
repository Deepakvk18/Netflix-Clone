from flask_restx import Resource
import datetime
import json
from requests.exceptions import HTTPError
import logging

from . import user_api
from ..models.user_models import User, Plans
from ..exceptions.custom_exceptions import UserException
from ..extensions import db
from ..schemas.user_schema import signup_input, signup_output, plans_output
from ..services.authentication import firebase
from .payments import delete_customer

@user_api.route('/signup')
class SignUpEmail(Resource):

    @user_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    @user_api.marshal_with(signup_output)
    @user_api.expect(signup_input)
    def post(self):
        """Sign Up the users with only email"""
        email = user_api.payload.get('email')
        user = User.query.filter_by(email=email).first()

        if user and user.plan != 1:
            raise UserException('USER_ALREADY_PRESENT')
        if not user:
            user = User(email=email, plan=1, subscribed_at=datetime.datetime.now())
            db.session.add(user)
        else:
            user.plan = 1
        db.session.commit()
        return {'message': 'User Signed Up Successfully!!'}

@user_api.route('/delete')
class DeleteUser(Resource):

    @user_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    @user_api.marshal_with(signup_output)
    @user_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def delete(self):
        """Delete the user account from the database"""
        user_id = firebase.get_user().get('localId')
        delete = firebase.delete()

        if delete:
            user = User.query.filter_by(uuid=user_id).first()
            if not user:
                raise UserException(message='NO_USER_FOUND')
            delete_customer(user.email)
            user.plan = 2
            db.session.commit()
        return {'message': 'User Deleted Successfully!!'}

@user_api.route('/subscribe/<int:plan_id>')
class ChangePlan(Resource):

    @user_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @user_api.marshal_with(signup_output)
    @user_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def put(self, plan_id):
        """Change plans of users"""
        user_id = firebase.get_user().get('localId')
        user = User.query.filter_by(uuid=user_id).first()
        if not user:
            raise UserException('USER_NOT_FOUND')
        if (user.plan != 1 and user.plan !=2 and plan_id != 1 and plan_id != 2):
            user.subscribed_at = datetime.datetime.now()
        user.plan = plan_id
        db.session.commit()
        return {'message': 'User"s plan changed'}

@user_api.route('/plans')
class GetAllPlans(Resource):
    
    @user_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error'})
    @user_api.marshal_list_with(plans_output)
    def get(self):
        """Get all the data of plans"""
        plans = Plans.query.all()
        return plans

def get_plan(plan_id):
    plan = Plans.query.filter_by(id=plan_id).first()
    return plan