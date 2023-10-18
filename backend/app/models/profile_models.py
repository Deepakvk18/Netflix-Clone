from ..extensions import db
from sqlalchemy_serializer import SerializerMixin

class Profiles(db.Model, SerializerMixin):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(64))
    language = db.Column(db.String(32))
    children = db.Column(db.Boolean)
    name = db.Column(db.String(32))

class Ratings(db.Model, SerializerMixin):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer)
    profile_id = db.Column(db.Integer)
    type = db.Column(db.String(8))
    rating = db.Column(db.Integer)


class MyList(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer)
    show_id = db.Column(db.Integer)
    type = db.Column(db.String(8))
    
class NowWatching(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer)
    show_id = db.Column(db.Integer)
    type = db.Column(db.String(8))
    season = db.Column(db.Integer)
    episode = db.Column(db.Integer)