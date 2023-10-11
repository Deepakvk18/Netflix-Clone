from ..extensions import db

class Profiles(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(64))
    language = db.Column(db.String(32))
    children = db.Column(db.Boolean)
    name = db.Column(db.String(32))

class Ratings(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer)
    profile_id = db.Column(db.Integer)
    rating = db.Column(db.String(8))

class MyList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer)
    show_id = db.Column(db.Integer)
    type = db.Column(db.String(8))
    
class NowWatching(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer)
    show_id = db.Column(db.Integer)
    type = db.Column(db.String(8))