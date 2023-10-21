from ..extensions import db
from sqlalchemy_serializer import SerializerMixin

class Profiles(db.Model, SerializerMixin):

    __table_args__ = {'extend_existing': True}

    serialize_rules = ('-ratings', '-myList', '-nowWatching')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(64), db.ForeignKey('user.uuid'))
    language = db.Column(db.String(32))
    children = db.Column(db.Boolean)
    name = db.Column(db.String(32))
    ratings = db.relationship('Ratings', backref='profiles')
    myList = db.relationship('MyList', backref='profiles')
    nowWatching = db.relationship('NowWatching', backref='profiles')

    def __repr__(self):
        return f'<Profiles name={self.name} user_id={self.user_id} >'

class Ratings(db.Model, SerializerMixin):
    
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    type = db.Column(db.String(8))
    rating = db.Column(db.Integer)

    def __repr__(self):
        return f'<Ratings profile_id={self.profile_id} show_id={self.show_id} type={self.type} rating={self.rating} >'


class MyList(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    show_id = db.Column(db.Integer)
    type = db.Column(db.String(8))

    def __repr__(self):
        return f'<MyList profile_id={self.profile_id} show_id={self.show_id} type={self.type} >'
    
class NowWatching(db.Model, SerializerMixin):

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    show_id = db.Column(db.Integer)
    type = db.Column(db.String(8))
    season = db.Column(db.Integer)
    episode = db.Column(db.Integer)

    def __repr__(self):
        return f'<NowWatching profile_id={self.profile_id} show_id={self.show_id} type={self.type} season={self.season} episode={self.episode} >'