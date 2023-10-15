from ..extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(255), )
    plan = db.Column(db.Integer)
    subscribed_at = db.Column(db.DateTime)
    db.UniqueConstraint(email)

class Plans(db.Model):
    
    id = db.Column(db.String(32), primary_key=True)
    plan = db.Column(db.String(255))
    price = db.Column(db.Float)
    description = db.Column(db.String(255))

