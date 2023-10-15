from . import profile_api
from ..services.authentication import firebase
from ..models.profile_models import Profiles, Ratings, MyList, NowWatching
from ..models.user_models import User
from ..exceptions.custom_exceptions import UserException, ProfileException
from ..schemas.profile_schema import (profile_model,  
                                        message_output, 
                                        addprofile_input, 
                                        migrateprofile_input,
                                        like_input,
                                        mylist_input)
from .netflix import get_show_details                                      
from .auth import sign_in
from ..extensions import db

from flask_restx import Resource

def return_mylist(profile_id):
    """Return the list of show ids in mylist of the profile with id: profile_id"""
    mylist = MyList.query.filter_by(profile_id=profile_id).with_entities(MyList.show_id, MyList.type)
    return mylist

def return_now_watching(profile_id):
    """Return the list of show ids in now watching of the profile with id: profile_id"""
    now_watching = NowWatching.query.filter_by(profile_id=profile_id).with_entities(NowWatching.show_id, NowWatching.type)
    return now_watching

def return_ratings(profile_id):
    """Return the list of show ids in ratings of the profile with id: profile_id"""
    ratings = Ratings.query.filter_by(profile_id=profile_id).with_entities(Ratings.show_id, Ratings.type)
    return ratings

def get_user_profiles(user_id):
    """Return the list of profiles of the user with id: user_id"""
    profiles = Profiles.query.filter_by(user_id=user_id)
    return profiles

@profile_api.route('/allProfiles')
class GetAllProfiles(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.marshal_list_with(profile_model)
    @firebase.jwt_required
    def get(self):
        """Get All the profiles associated with the user"""
        user_id = firebase.get_user().get('localId')
        user = User.query.filter_by(uuid=user_id).first()
        if not user:
            raise UserException(message='NO_USER_FOUND')
        profiles = Profiles.query.filter_by(user_id=user.uuid).all()
        return profiles

@profile_api.route('/getProfile/<int:profile_id>')
class GetProfile(Resource):
    
        @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
        @profile_api.doc(security="jsonWebToken")
        @firebase.jwt_required
        def get(self, profile_id):
            """Get the profile with profile_id-profile_id"""
            profile = Profiles.query.filter_by(id=profile_id).first()
            if not profile:
                raise ProfileException(message='PROFILE_NOT_EXIST')
            ratings = return_ratings(profile_id)
            rating_details = [get_show_details(rating.show_id, rating.type) for rating in ratings]
            now_watching = return_now_watching(profile_id)
            now_watching_details = [get_show_details(show.show_id, show.type) for show in now_watching]
            mylist = return_mylist(profile_id)
            mylist_details = [get_show_details(show.show_id, show.type) for show in mylist]
            # recommendations = 
            return {'profile': profile, 'ratings': rating_details, 'nowWatching': now_watching_details, 'mylist': mylist_details}

@profile_api.route('/edit/<int:profile_id>/<name>')
class EditProfile(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def put(self, profile_id, name):
        """Edit the name of User Profile with profile_id-profile_id and name-new name of the profile"""
        profile_db = Profiles.query.filter_by(id=profile_id).first()
        if not profile_db:
            raise ProfileException(message='PROFILE_NOT_EXIST')
        user_id = firebase.get_user().get('localId')
        profiles = Profiles.query.filter_by(user_id=user_id).all()
        for pro in profiles:
            if pro.name == name:
                raise ProfileException('PROFILE_ALREADY_EXIST')
        profile_db.name = name
        db.session.commit()
        return {'message': 'Successfully renamed the profile!!'}

@profile_api.route('/delete/<int:profile_id>')
class DeleteProfile(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def delete(self, profile_id):
        """Delete the user profile of the user"""
        profile = Profiles.query.filter_by(id=profile_id)
        if not profile:
            raise ProfileException(message='PROFILE_NOT_EXIST')
        profile.delete()
        db.session.commit()
        return {'message': 'Successfully deleted the profile!!'}


@profile_api.route('/add')
class AddProfile(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.marshal_with(message_output)
    @profile_api.expect(addprofile_input)
    @firebase.jwt_required
    def post(self):
        """Add new profile to the user"""
        user_id = firebase.get_user().get('localId')
        user = User.query.filter_by(uuid=user_id).first()
        payload = profile_api.payload
        if not user:
            raise UserException(message="NO_USER_FOUND")
        profiles = Profiles.query.filter_by(user_id=user_id).all()
        if len(profiles) == 5:
            raise ProfileException('PROFILE_LIMIT_EXCEEDED')
        for pro in profiles:
            if pro.name == payload.get('name'):
                raise ProfileException('PROFILE_ALREADY_EXIST')
        new_profile = Profiles(user_id=user.uuid, language=payload.get('language'), name=payload.get('name'), children=payload.get('children'))
        db.session.add(new_profile)
        db.session.commit()
        return user

@profile_api.route('/migrate')
class MigrateProfile(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.marshal_with(message_output)
    @profile_api.expect(migrateprofile_input)
    @firebase.jwt_required
    def put(self):
        """Migrate Profile from one user to another"""
        payload = profile_api.payload
        user = sign_in(payload.get('email'), payload.get('password'))
        if not user:
            raise UserException('USER_NOT_FOUND')
        profile = Profiles.query.filter_by(id=payload.get('profileId')).first()
        if not profile:
            raise ProfileException(message='PROFILE_NOT_FOUND')
        user = User.query.filter_by(uuid=payload.get('toUserId')).first()
        if not user:
            raise UserException('USER_NOT_FOUND')
        profile.user_id = user.get('localId')
        db.session.commit()
        return {'message': 'Successfully migrated the profile!!'} 

@profile_api.route('/like')
class UpdateLikes(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(like_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def put(self):
        """Like, Dislike or Love the shows
        ratingId:- 
        -1 - Dislike the show
        0 / None - None
        1 - Like the show"""
        payload = profile_api.payload
        rating = Ratings.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type')).first()
        if not rating:
            rating = Ratings(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type') ,rating=payload.get('ratingId'))
            db.session.add(rating)
        if(rating and rating.rating == payload.get('ratingId')):
            rating.delete()
        if(rating and rating.rating != payload.get('ratingId')):
            rating.rating = payload.get('ratingId')
        db.session.commit()
        return {'message': 'Successfully updated the preference!!'} 

@profile_api.route('/addMyList')
class AddMylist(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(mylist_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def post(self):
        """Add/Delete a show to MyList"""
        payload = profile_api.payload
        mylist = MyList.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type')).first()
        if not mylist:
            mylist = MyList(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type'))
            db.session.add(mylist)
        else:
            mylist.delete()
        db.session.commit()
        return {'message': 'Successfully updated mylist!!'} 

@profile_api.route('/addNowWatching')
class AddNowWatching(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(mylist_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def post(self):
        """Add/Delete a show to Now Watching"""
        payload = profile_api.payload
        now_watching = NowWatching.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type')).first()
        if not now_watching:
            now_watching = NowWatching(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type'))
            db.session.add(now_watching)
        else:
            now_watching.delete()
        db.session.commit()
        return {'message': 'Successfully updated now_watching!!'} 



