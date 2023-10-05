from flask_restx import models, fields
from ..controller import payments_api

createsession_input = payments_api.model(name='Create Payment Session', model={
    'email': fields.String(required=True, description='Email of the customer'),
    'priceId': fields.String(required=True, description='Price ID of the product')
    })