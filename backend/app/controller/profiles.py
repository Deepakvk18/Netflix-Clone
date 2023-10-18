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
                                        mylist_input,
                                        editprofile_input,
                                        current_episode, 
                                        current_episode_output,)
from .netflix import get_show_details, get_recommendations                                  
from .auth import sign_in
from ..extensions import db

from flask import jsonify
import random
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
    # @profile_api.marshal_list_with(profile_model)
    @firebase.jwt_required
    def get(self):
        """Get All the profiles associated with the user"""
        user_id = firebase.get_user().get('localId')
        user = User.query.filter_by(uuid=user_id).first()
        if not user:
            raise UserException(message='NO_USER_FOUND')
        profiles = Profiles.query.filter_by(user_id=user.uuid).all()
        return [profile.to_dict() for profile in profiles]

@profile_api.route('/edit')
class EditProfile(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(editprofile_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def put(self):
        """Edit the name of User Profile with profile_id-profile_id and name-new name of the profile"""
        payload = profile_api.payload
        profile = Profiles.query.filter_by(id=payload.get('id')).first()
        if (profile.name == 'Children'):
            raise ProfileException(message='CANNOT_BE_EDITED')
        profile_db = Profiles.query.filter_by(id=payload.get('id')).first()
        if not profile_db:
            raise ProfileException(message='PROFILE_NOT_EXIST')
        user_id = firebase.get_user().get('localId')
        profiles = Profiles.query.filter_by(user_id=user_id).all()
        for pro in profiles:
            if pro.name == payload.get('name') and pro.children == payload.get('children'):
                raise ProfileException('PROFILE_ALREADY_EXIST')
        profile_db.name = payload.get('name')
        profile_db.children = payload.get('children')
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
        new_profile = Profiles(user_id=user.uuid, name=payload.get('name'), children=payload.get('children'))
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
        rating:- 
        -1 - Dislike the show
        1 - Like the show"""
        payload = profile_api.payload
        rating = Ratings.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type')).first()
        if not rating:
            rating = Ratings(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type') ,rating=payload.get('rating'))
            db.session.add(rating)
        elif rating.rating == payload.get('rating'):
            db.session.delete(rating)
        else:
            rating.rating = payload.get('rating')
        db.session.commit()
        print(rating.id, rating.profile_id, rating.show_id, rating.type, rating.rating)
        return {'message': 'Successfully updated the preference!!'} 

@profile_api.route('/updateMylist')
class AddMylist(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(mylist_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def put(self):
        """Add/Delete a show to MyList"""
        payload = profile_api.payload
        mylist = MyList.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type')).first()
        if not mylist:
            mylist = MyList(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type'))
            db.session.add(mylist)
            db.session.commit()
        else:
            db.session.delete(mylist)
            db.session.commit()
        return {'message': 'Successfully updated mylist!!'} 

@profile_api.route('/updateNowWatching')
class DeleteNowWatching(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(mylist_input)
    @profile_api.marshal_with(message_output)
    @firebase.jwt_required
    def put(self):
        """Add/Delete a show to Now Watching"""
        payload = profile_api.payload
        now_watching = NowWatching.query.filter_by(profile_id=payload.get('profileId'), show_id=payload.get('showId'), type=payload.get('type')).first()
        if not now_watching:
            return
        else:
            db.session.delete(now_watching)
        db.session.commit()
        return {'message': 'Successfully updated now_watching!!'} 

@profile_api.route('/getMyList/<int:profile_id>')
class GetMyList(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, profile_id):
        """Get the list of shows in MyList"""
        mylist = MyList.query.filter_by(profile_id=profile_id)
        return {'shows': [get_show_details(show.show_id, show.type) for show in  mylist]}

@profile_api.route('/getNowWatching/<int:profile_id>')
class GetNowWatching(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, profile_id):
        """Get the list of shows in Now Watching"""
        now_watching = NowWatching.query.filter_by(profile_id=profile_id).all()
        now_watching = [get_show_details(nw.show_id, nw.type) for nw in now_watching]
        return {'shows': now_watching}



@profile_api.route('/getRatings/<int:profile_id>')
class GetRatings(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, profile_id):
        """Get the list of shows in Ratings"""
        likes = Ratings.query.filter_by(profile_id=profile_id, rating=1).with_entities(Ratings.show_id).all()
        likes = [l.show_id for l in likes]
        dislikes = Ratings.query.filter_by(profile_id=profile_id, rating=-1).with_entities(Ratings.show_id).all()
        dislikes = [d.show_id for d in dislikes]
        return {'likes': likes, 'dislikes': dislikes}

@profile_api.route('/getnwids/<int:profile_id>')
class GetNowWatchingIds(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, profile_id):
        """Get the list of show ids in Now Watching List"""
        now_watching = NowWatching.query.filter_by(profile_id=profile_id).all()
        now_watching = [nw.show_id for nw in now_watching]
        return {'nowWatching': now_watching}

@profile_api.route('/getmlids/<int:profile_id>')
class GetNowWatchingIds(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def get(self, profile_id):
        """Get the list of show ids in Now Watching List"""
        my_list = MyList.query.filter_by(profile_id=profile_id).all()
        my_list = [ml.show_id for ml in my_list]
        return {'myList': my_list}

@profile_api.route('/getRecommendations/<int:profile_id>')
class GetRecommendations(Resource):
    
        @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
        @profile_api.doc(security="jsonWebToken")
        @firebase.jwt_required
        def get(self, profile_id):
            """Get the list of shows in Recommendations"""
            ratings = Ratings.query.filter_by(profile_id=profile_id, rating=1).all()
            if len(ratings) > 3:
                ratings = random.choices(ratings, k=3)
            recommendations = get_recommendations(ratings)
            return {'shows': recommendations }

@profile_api.route('/getNextEpisode/<int:tracking_id>')
class GetNextEpisode(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.marshal_with(current_episode_output)
    @firebase.jwt_required
    def put(self, tracking_id):
        """Get the next episode of the show"""
        now_watching = NowWatching.query.filter_by(id=tracking_id).first()
        if (now_watching.type == 'movie'):
            db.session.delete(now_watching)
            db.session.commit()
            return {'id': None, 'show_id': None, 'type': None, 'season': None, 'episode': None}
        movie_details = get_show_details(now_watching.show_id, now_watching.type)
        no_of_seasons = len(movie_details.get('seasons'))
        watching_season = now_watching.season
        next_episode = now_watching.episode + 1
        if (next_episode > movie_details.get('seasons')[watching_season-1].get('episode_count')):
            next_episode = 1
            watching_season = watching_season + 1
        now_watching.season = watching_season
        now_watching.episode = next_episode
        if (watching_season > no_of_seasons):
            db.session.delete(now_watching)
            return {'message': 'the show ended'}
        db.session.commit()
        return {'id': now_watching.id, 'show_id': now_watching.show_id, 'type': now_watching.type, 'season': watching_season, 'episode': next_episode} if now_watching else {'message': 'The show is over'}

@profile_api.route('/getCurrentEpisode')
class GetCurrentEpisode(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(current_episode)
    @profile_api.marshal_with(current_episode_output)
    @firebase.jwt_required
    def put(self):
        """Get the current watching episode of the show"""
        profile_id = profile_api.payload.get('profileId')
        type = profile_api.payload.get('type')
        show_id = profile_api.payload.get('showId')
        now_watching = NowWatching.query.filter_by(profile_id=profile_id, show_id=show_id, type=type).first()
        if not now_watching and type == 'tv':
            now_watching = NowWatching(profile_id=profile_id, show_id=show_id, type=type, season=1, episode=1)
            db.session.add(now_watching)
        if not now_watching and type == 'movie':
            now_watching = NowWatching(profile_id=profile_id, show_id=show_id, type=type)
            db.session.add(now_watching)
        db.session.commit()
        now_watching = NowWatching.query.filter_by(profile_id=profile_id, show_id=show_id, type=type).first()
        return now_watching

@profile_api.route('/setCurrentEpisode')
class SetCurrentEpisode(Resource):

    @profile_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @profile_api.doc(security="jsonWebToken")
    @profile_api.expect(current_episode_output)
    @profile_api.marshal_with(current_episode_output)
    @firebase.jwt_required
    def put(self):
        """Set the now watching episode of the show"""
        payload = profile_api.payload
        print(payload)
        show_id = payload.get('showId')
        type = payload.get('type')
        profile_id = payload.get('profileId')
        season = payload.get('season')
        episode = payload.get('episode')
        now_watching = NowWatching.query.filter_by(profile_id=profile_id, type=type, show_id=show_id).first()
        if not now_watching:
            now_watching = NowWatching(profile_id=profile_id, show_id=show_id, type=type, season=season, episode=episode)
            db.session.add(now_watching)
        now_watching.season = season
        now_watching.episode = episode
        db.session.commit()
        now_watching = NowWatching.query.filter_by(profile_id=profile_id, show_id=show_id, type=type).first() 
        return now_watching
