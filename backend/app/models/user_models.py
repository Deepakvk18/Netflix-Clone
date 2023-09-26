from ..extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255))
    plan = db.Column(db.Integer)
    subscribed_at = db.Column(db.DateTime)

class Plans(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(255))
    price = db.Column(db.Float)
    description = db.Column(db.String(255))

class Profiles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, back_populates="User")
    language = db.Column(db.String(32))
    children = db.Column(db.Boolean)

class Ratings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer)
    profile_id = db.Column(db.Integer)
    rating = db.Column(db.String(8))