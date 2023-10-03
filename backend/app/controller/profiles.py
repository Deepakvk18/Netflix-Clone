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
from ..extensions import db

from flask_restx import Resource

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
        return {'message': 'Successfully added the profile!!'} 

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
        profile = Profiles.query.filter_by(id=payload.get('profileId')).first()
        if not profile:
            raise ProfileException(message='PROFILE_NOT_FOUND')
        user = User.query.filter_by(uuid=payload.get('toUserId')).first()
        if not user:
            raise UserException('USER_NOT_FOUND')
        profile.user_id = payload.get('toUserId')
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
        1 - Like the show
        2 - Love the show"""
        payload = profile_api.payload
        rating = Ratings.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'))
        if not rating:
            rating = Ratings(profile_id=payload.get('profileId'), show_id=payload.get('showId'), rating=payload.get('ratingId'))
            db.session.add(rating)
        else:
            rating.rating = payload.get('ratingId')
        if not payload.get('ratingId'):
            rating.delete()
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
        """Add a show to MyList"""
        payload = profile_api.payload
        mylist = MyList.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId')).first()
        if not mylist:
            mylist = MyList(profile_id=payload.get('profileId'), show_id=payload.get('showId'))
            db.session.add(mylist)
        db.session.commit()
        return {'message': 'Successfully updated mylist!!'} 

@profile_api.route('/removeMyList')
class RemoveMylist(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(mylist_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def put(self):
        """Remove a show from MyList"""
        payload = profile_api.payload
        mylist = MyList.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'))
        if mylist:
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
        """Add a show to Now Watching"""
        payload = profile_api.payload
        now_watching = NowWatching.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId')).first()
        if not now_watching:
            now_watching = NowWatching(profile_id=payload.get('profileId'), show_id=payload.get('showId'))
            db.session.add(now_watching)
        db.session.commit()
        return {'message': 'Successfully updated now_watching!!'} 

@profile_api.route('/removeNowWatching')
class RemoveNowWatching(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(mylist_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def put(self):
        """Remove a show from Now Watching"""
        payload = profile_api.payload
        now_watching = NowWatching.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'))
        if now_watching:
            now_watching.delete()
        db.session.commit()
        return {'message': 'Successfully updated now_watching!!'}

def return_mylist(profile_id):
    """Return the list of show ids in mylist of the profile with id: profile_id"""
    mylist = MyList.query.filter_by(profile_id=profile_id).with_entities(MyList.show_id)
    return mylist

def return_now_watching(profile_id):
    """Return the list of show ids in now watching of the profile with id: profile_id"""
    now_watching = NowWatching.query.filter_by(profile_id=profile_id).with_entities(MyList.show_id)
    return now_watching