from flask_restx import fields
from ..controller import payments_api

createsession_input = payments_api.model(name='Create Payment Session', model={
    'email': fields.String(required=True, description='Email of the customer'),
    'priceId': fields.String(required=True, description='Price ID of the product')
    })

upgradeplan_input = payments_api.model(name='Upgrade Plan', model={
    'email': fields.String(required=True, description='Email of the customer'),
    'priceId': fields.String(required=True, description='Price ID of the product')
})