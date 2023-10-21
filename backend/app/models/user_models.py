from ..extensions import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):

    serialize_rules = ('-profiles',)

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(255), )
    plan = db.Column(db.String(32), db.ForeignKey('plans.id'))
    subscribed_at = db.Column(db.DateTime)
    db.UniqueConstraint(email)

    profiles = db.relationship('Profiles', backref='user')

    def __repr__(self):
        return f'<User email={self.email} uuid={self.uuid} >'

class Plans(db.Model, SerializerMixin):

    serialize_rules = ('-user',)
    
    id = db.Column(db.String(32), primary_key=True)
    plan = db.Column(db.String(255))
    price = db.Column(db.Float)
    description = db.Column(db.String(255))
    user = db.relationship('User', backref='plans', uselist=False)

    def __repr__(self):
        return f'<Plans name={self.plan} price={self.price}>'

