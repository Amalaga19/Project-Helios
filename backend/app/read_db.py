#Connect to the database
from flask import Flask
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity
import pandas as pd
from data_model import db, Places
from sqlalchemy import func
from geoalchemy2 import WKTElement

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONNECTION_STRING")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
category_list = ["CATERING", "PRODUCTION"]

lon = -3.710088896522012
lat = 40.4452864503258
radius_meters = 2000

#Query the Places table and print the first result of specific characteristics
with app.app_context():
    places_list = []
    #Filter by the category of the place and the neighborhood, get the first result's whole row    
    point = WKTElement(f'POINT({lon} {lat})', srid=4326)
    for category in category_list:
        if category == "CATERING":
            places = Places.query.filter_by(CATERING = True).filter(func.ST_Distance(WKTElement(f'POINT({Places.LONGITUDE}{Places.LATITUDE})'), point) <= radius_meters).first()
        elif category == "COMMERCIAL":
            places = Places.query.filter_by(COMMERCIAL = True).filter(func.ST_Distance(WKTElement(f'POINT({Places.LONGITUDE}{Places.LATITUDE})'), point) <= radius_meters).first()
        elif category == "OFFICE":
            places = Places.query.filter_by(OFFICE = True).filter(func.ST_Distance(WKTElement(f'POINT({Places.LONGITUDE}{Places.LATITUDE})'), point) <= radius_meters).first()
        elif category == "PRODUCTION":
            places = Places.query.filter_by(PRODUCTION = True).filter(func.ST_Distance(WKTElement(f'POINT({Places.LONGITUDE}{Places.LATITUDE})'), point) <= radius_meters).first()
        elif category == "SERVICE":
            places = Places.query.filter_by(SERVICE = True).filter(func.ST_Distance(WKTElement(f'POINT({Places.LONGITUDE}{Places.LATITUDE})'), point) <= radius_meters).first()   
        for place in places:
            if place not in places_list:
                places_list.append(Places.place_dict(place))
            else:
                continue
    print(places_list)
