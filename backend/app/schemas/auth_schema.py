from ..controller import auth_api
from .. import constants
from flask_restx import fields

sign_in_model = auth_api.model('Sign In', model={
    "email": fields.String(description="Email of the user", required=True),
    "password": fields.String(description="Password of the user", required=True)
})

sign_in_output = auth_api.model('Sign In Output', model={
    "email": fields.String(description="Email of the user", required=True),
    "idToken": fields.String(description="Token ID of the user", required=True),
    "expiresIn": fields.Integer(description="Expiry time of the token", required=True),
     'localId': fields.String(description='User UID', required=True)
})

validate_output = auth_api.model('Validate Token Output', model={
    'valid': fields.Boolean(required=True, description="Whether or not the token is associated with a valid user"),
    'email': fields.String(description='Email ID of the respective user', required=True),
    'localId': fields.String(description='User UID', required=True)
})

refresh_output = auth_api.model('Validate Token Output', model={
    'email': fields.String(description='Email ID of the respective user', required=True),
    "idToken": fields.String(description="Token ID of the user", required=True),
    "refreshToken": fields.String(description="Refresh Token of the user", required=True),
     'localId': fields.String(description='User UID', required=True)
})

message_output = auth_api.model('Logout Output', model={
    'message': fields.String(description='Success Message', required=True),
})