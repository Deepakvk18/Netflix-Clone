from ..controller import user_api
from flask_restx import fields

signup_input = user_api.model('Sign Up Input', model={
    "email": fields.String(description="Email of the user", required=True),
})

signup_output = user_api.model('Sign Up Output', model={
    "message": fields.String(description="Success Message", required=True),
})

plan_input = user_api.model('Plan Input', model={
    "email": fields.String(description="Email of the user", required=True),
    "planId": fields.Integer(attribute='plan_id', description="Plan Id of the plan", required=True)
})

plans_output = user_api.model('Plan Output', model={
    "id": fields.String(description="Email of the user", required=True),
    "plan": fields.String(description="Plan Id of the plan", required=True),
    "price": fields.Float(description="Price of the plan", required=True),
    "description": fields.String(description="Description of the plan", required=True)
})