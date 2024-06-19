from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity

db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'USERS'
    USER_ID = db.Column(db.Integer, Identity(start = 1, cycle = False), primary_key=True)
    USERNAME = db.Column(db.String(100), unique = True, nullable=False)
    PASSWORD = db.Column(db.String(1000), nullable=False) #1000 characters because the password will be hashed
    requests_log = db.relationship("Requests", back_populates="user")

    def user_dict(self):
        return {"id": self.USER_ID, "username": self.USERNAME, "requests": [request.request_dict() for request in self.requests_log]}
    
class Requests(db.model):
    __tablename__ = 'REQUESTS'
    REQUEST_ID = db.Column(db.Integer, Identity(start = 1, cycle = False), primary_key=True)
    USER_ID = db.Column(db.Integer, db.ForeignKey('USERS.USER_ID'), nullable=False)
    LONGITUDE = db.Column(db.Float, nullable=False)
    LATITUDE = db.Column(db.Float, nullable=False)
    DATE_TIME = db.Column(db.DateTime, nullable=False)
    CATERING = db.Column(db.Boolean, nullable=False)
    COMMERCIAL = db.Column(db.Boolean, nullable=False)
    PRODUCTION = db.Column(db.Boolean, nullable=False)
    SERVICE = db.Column(db.Boolean, nullable=False)
    OFFICE = db.Column(db.Boolean, nullable=False)
    def request_dict(self):
        return {"id": self.REQUEST_ID, "user_id": self.USER_ID, "request": self.request}
