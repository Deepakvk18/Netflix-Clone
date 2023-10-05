import os

import stripe
from flask_restx import Resource
from .. import constants
from . import payments_api
from ..exceptions.custom_exceptions import PaymentException

# This is your test secret API key.
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
stripe.publishable_key = os.getenv('STRIPE_PUBLISHABLE_KEY')

@payments_api.route('/create-checkout-session')
class Checkout(Resource):

    def get(self):
        payload = payments_api.payload
        price_id = payload.get('priceId')
        cust = stripe.Customer.list(email=payload.get('email')).get('data')
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
            success_url=f'{constants.FRONTEND}/checkout?success=true',
            cancel_url=f'{constants.FRONTEND}/checkout?canceled=true',
        )

        return {'url': checkout_session.url, 'code':303}


@payments_api.route('/products')
class Products(Resource):
    def get(self):
        """Get all the products available in stripe"""
        return stripe.Product.list()

@payments_api.route('/customers/<email>')
class SearchCustomer(Resource):
    def get(self, email):
        """Search a customer by email"""
        return stripe.Customer.list(email=email)