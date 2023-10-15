from ..controller import profile_api
from flask_restx import fields

profile_model = profile_api.model('Profile', {
    'id': fields.Integer(description='Profile ID'),
    'userId': fields.String( attribute='user_id', description='User ID'),
    'language': fields.String(description='Language', max_length=32),
    'name': fields.String(description='Profile Name', max_length=32),
    'children': fields.Boolean(description='Children Profile?')
})

rating_model = profile_api.model('Rating', {
    'showId': fields.Integer(attribute='show_id', description='Show ID'),
    'profileId': fields.Integer(attribute='profile_id', description='Profile ID'),
    'rating': fields.String(description='Rating', max_length=8)
})

profile = profile_api.model('Profile', {
    'profile': fields.Nested(profile_model, description='Profile'),
    'ratings': fields.List(fields.Nested(rating_model, description='Ratings')),
    'myList': fields.List(fields.Nested(rating_model, description='My List')),
    'nowWatching': fields.List(fields.Nested(rating_model, description='Now Watching')),
})

message_output = profile_api.model('Message Output', {
    'message': fields.String(description='Success message')
})

addprofile_input = profile_api.model('Add Profile', model={
    'name': fields.String(description="Name of the new profile"),
    'children': fields.Boolean(description="Whether this profile is a children's profile"),
    'language': fields.String(description="Language of the profile")
})

migrateprofile_input = profile_api.model('Migrate Profile', model={
    'profileId': fields.Integer(description="Profile ID to be migrated"),
    'email': fields.String(description="Email of the user to whom the profile is to be migrated"),
    'password': fields.String(description="Password of the user to whom the profile is to be migrated"),
})

like_input = profile_api.model('Like/Dislike/Love Show', model={
    'showId': fields.Integer(description="Show ID to be liked"),
    'profileId': fields.Integer(description="Profile ID who likes the show"),
    'type': fields.String(description="Type of Show (tv/movie)"),
    'ratingId': fields.Integer(description="Rating ID of the action"),
})

mylist_input = profile_api.model('Add to My List', model={
    'showId': fields.Integer(description="Show ID to be added"),
    'type': fields.String(description="Type of Show (tv/movie)"),
    'profileId': fields.Integer(description="Profile ID who added the show to my list"),
})