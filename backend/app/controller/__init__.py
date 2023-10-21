from flask_restx import Namespace

authorizations = {
    'jsonWebToken': {
        "type": 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

auth_api = Namespace(name='Authentication', import_name='auth', path='/auth', authorizations=authorizations, description="Authentication related operations")

netflix_api = Namespace(name='Netflix', import_name='netflix', authorizations=authorizations, description="Show Details related operations")

user_api = Namespace(name='Users', import_name='users', authorizations=authorizations, description="User related operations")

profile_api = Namespace(name='Profile', import_name='profile', authorizations=authorizations, description="Profile related operations")

payments_api = Namespace(name='Payments', import_name='payments', authorizations=authorizations, description="Payment related operations")
