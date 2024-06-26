#Connect to the database
from flask import Flask
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity
import pandas as pd
from data_model import db, Places

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONNECTION_STRING")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

#Query the Places table and print the first result of specific characteristics
with app.app_context():
    #Filter by the category of the place and the neighborhood, get the first result's whole row
    places = Places.query.filter_by(COMMERCIAL = True, SUBURB = "Chamberi").first()
    print(places)