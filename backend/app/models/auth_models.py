from ..extensions import db

class Session(db.Model):
    email = db.Column(db.String(255), primary_key=True)
    refresh_token = db.Column(db.String(255))



