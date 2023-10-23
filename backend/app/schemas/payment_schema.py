from flask_restx import fields
from ..controller import payments_api

createsession_input = payments_api.model(name='Create Payment Session', model={
    'priceId': fields.String(required=True, description='Price ID of the product')
    })

upgradeplan_input = payments_api.model(name='Upgrade Plan', model={
    'email': fields.String(required=True, description='Email of the customer'),
    'priceId': fields.String(required=True, description='Price ID of the product')
})

checkout_output = payments_api.model(name='Checkout Session', model={
    'url': fields.Url(required=True, description='Checkout Session URL'),
    'status': fields.Integer(required=True, description='Status of the Checkout Session')
})