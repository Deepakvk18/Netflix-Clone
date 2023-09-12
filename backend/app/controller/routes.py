
from flask import request
from flask_restx import Api, Namespace, Resource, fields


netflix_api = Namespace(name='netflix', import_name='netflix')

example_model = netflix_api.model('ExampleModel', {
    'message': fields.String(description='A message field in the response.', required=True, message='aksndasf')
})

@netflix_api.route('/movies')
class Movies(Resource):

    @netflix_api.doc(responses={200: 'Success', 400: 'Bad Request'})
    def get(self):
        """Get a list of movies"""
        # Your code to fetch movies goes here
        return []

@netflix_api.route('/shows')
class Shows(Resource):

    @netflix_api.expect(example_model, validate=True)
    @netflix_api.marshal_with(example_model)
    def post(self):
        """Get a list of TV shows"""
        # Your code to fetch TV shows goes here
        example: example_model = request.get_json()
        
        return example
