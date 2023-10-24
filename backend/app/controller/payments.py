import os

import stripe
from flask_restx import Resource
from ..services.authentication import firebase

from .. import constants
from . import payments_api
from ..exceptions.custom_exceptions import PaymentException
from ..schemas.payment_schema import upgradeplan_input, checkout_output, createsession_input
from ..models.user_models import User
from ..extensions import db

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
stripe.publishable_key = os.getenv('STRIPE_PUBLISHABLE_KEY')


@payments_api.route('/create-checkout-session')
class Checkout(Resource):

    @payments_api.doc(responses={201: 'Created', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @payments_api.doc(security="jsonWebToken")
    @payments_api.expect(createsession_input, validate=True)
    @firebase.jwt_required
    def post(self):
        """Create a Checkout session for a user and a plan"""
        payload = payments_api.payload
        price_id = payload.get('priceId')
        cust = stripe.Customer.list(email=firebase.get_user().get('email')).get('data')
        if not cust:
            raise PaymentException('NO_CUSTOMER_FOUND')
        cust_id = cust[0].get('id')
        checkout_session = stripe.checkout.Session.create(
            customer=cust_id,
            line_items=[
                {
                    'price': price_id,
                    'quantity': 1,
                },
            ],
            mode='subscription',
            success_url=f'{constants.FRONTEND}/checkout?success=true&plan={price_id}',
            cancel_url=f'{constants.FRONTEND}/checkout?canceled=true',
        )

        return {'url': checkout_session.url, 'code':303}, 201

@payments_api.route('/cancelSubscription')
class CancelSubscription(Resource):

    @payments_api.doc(responses={204: 'No Content', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @payments_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def delete(self):
        """Cancel subscription of a user"""
        email = firebase.get_user().get('email')
        cust = stripe.Customer.list(email=email).get('data')
        if not cust:
            raise PaymentException('NO_CUSTOMER_FOUND')
        cust_id = cust[0].get('id')
        subs = stripe.Subscription.list(customer=cust_id).get('data')
        if subs:
            subs = stripe.Subscription.modify(subs[0].get('id'), cancel_at_period_end=True)
            user = User.query.filter_by(email=email).first()
            user.plan = 2
            db.session.commit()
            return {}, 204


@payments_api.route('/changeSubscription/<price_id>')
class ChangeSubscription(Resource):

    @payments_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    @payments_api.doc(security="jsonWebToken")
    @firebase.jwt_required
    def put(self, price_id):
        """Change the subscription of the user"""
        email = firebase.get_user().get('email')
        cust = stripe.Customer.list(email=email).get('data')
        if not cust:
            raise PaymentException('NO_CUSTOMER_FOUND')
        cust_id = cust[0].get('id')
        subs = stripe.Subscription.list(customer=cust_id).get('data')
        if subs:
            new_subs = stripe.Subscription.modify(subs[0].get('id'), items=[{'id': subs[0].get('items').get('data')[0].get('id'), 'price': price_id}])
            user = User.query.filter_by(email=email).first()
            user.plan = price_id
            db.session.commit()
            return new_subs        

@payments_api.route('/products')
class Products(Resource):

    @payments_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    def get(self):
        """Get all the products available in stripe"""
        return stripe.Product.list()

@payments_api.route('/price/<price_id>')
class Products(Resource):

    @payments_api.doc(responses={200: 'Success', 400: 'Bad Request', 500: 'Server Error', 403: 'Forbidden'})
    def get(self, price_id):
        """Get all the products available in stripe"""
        return stripe.Price.retrieve(price_id)

def delete_customer(email):
    """Delete the customer from stripe"""
    cust = stripe.Customer.list(email=email).get('data')
    if not cust:
        raise PaymentException('NO_CUSTOMER_FOUND')
    cust_id = cust[0].get('id')
    subs = stripe.Subscription.list(customer=cust_id).get('data')
    if subs:
        stripe.Subscription.cancel_at_period_end(subs[0].get('id'))
    return True