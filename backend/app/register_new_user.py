#Connect to the database
from flask import Flask
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity
import pandas as pd
from data_model import db, Users
import argon2
from argon2 import PasswordHasher

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONNECTION_STRING")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

#Create a user, password, hash the password and add it to the database
user = "BarterAdmin"
password = "Barter2024!"

def hash_password(password): #Hashes the password so that it is stored securely in the database
    ph = PasswordHasher()
    return ph.hash(password)

with app.app_context():
    new_user = Users(USERNAME=user, PASSWORD=hash_password(password))
    db.session.add(new_user)
    db.session.commit()
    print("User added successfully.")
