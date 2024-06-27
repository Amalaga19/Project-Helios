#Connect to the database
from flask import Flask
from dotenv import load_dotenv
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity
import pandas as pd
from data_model import db

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONNECTION_STRING")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create the tables
with app.app_context():
    db.create_all()
    print("Tables created successfully.")

df= pd.read_csv("clean_data.csv", encoding="utf-8")
df.to_sql("PLACES", con = os.getenv("DB_CONNECTION_STRING"), if_exists="replace", index=False)
print("Data loaded successfully")
print(df.head())