from flask_restx import Namespace

authorizations = {
    'jsonWebToken': {
        "type": 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

auth_api = Namespace(name='authentication', import_name='auth', path='/auth', authorizations=authorizations)

netflix_api = Namespace(name='netflix', import_name='netflix', authorizations=authorizations)

user_api = Namespace(name='users', import_name='users', authorizations=authorizations)

profile_api = Namespace(name='profile', import_name='profile', authorizations=authorizations)

payments_api = Namespace(name='payments', import_name='payments', authorizations=authorizations)
