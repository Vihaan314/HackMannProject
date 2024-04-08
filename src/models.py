from src import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from datetime import datetime

class DiaryEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000))
    date_posted = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    messages = db.relationship("Message", backref="conversation", lazy=True)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    conversation_id = db.Column(db.Integer, db.ForeignKey("conversation.id"))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    conversations = db.relationship("Conversation", backref="user", lazy=True)
    diary_entries = db.relationship('DiaryEntry', backref='user', lazy=True)

    def __init__(self, email, first_name, password):
        self.email = email
        self.password = password
        self.first_name = first_name
