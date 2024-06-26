from flask import Flask, jsonify, request, session
import flask
from dotenv import load_dotenv
import os
import requests
import argon2
import folium
from argon2 import PasswordHasher
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity
from data_model import db, Users, Requests, Places
from sqlalchemy import text  

radius_meters = 2000
results_number = 500

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS = CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
# Correctly formatted SQL Server connection string for SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONNECTION_STRING")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create the tables
with app.app_context():
    db.create_all()
    print("Tables created successfully.")


def add_cors_headers(response):
    origin = request.headers.get('Origin')
    if origin:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response

app.after_request(add_cors_headers)




#Below the authentication hashing I used for my capstone, we can modify them later as per our database schema -Andres
def hash_password(password): #Hashes the password so that it is stored securely in the database
    ph = PasswordHasher()
    return ph.hash(password)

def verify_password(hashed_password, password): #checks the password against the hashed password in the database
    ph = PasswordHasher()
    try:
        ph.verify(hashed_password, password)
        return True
    except argon2.exceptions.VerifyMismatchError:
        return False

def get_solar_data_average(lon, lat):
    radiation_total = 0
    count = 0
    average = 0
    base_url = "https://re.jrc.ec.europa.eu/api/MRcalc"
    # Parameters for the API request
    params = {
        "lat": lat,
        "lon": lon,
        "horirrad": 1,
        "startyear": 2005,
        "endyear": 2016,
        "outputformat": "json",
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if 'outputs' in data and 'monthly' in data['outputs']:
            monthly_data = data['outputs']['monthly']
            for entry in monthly_data:
                if 'H(h)_m' in entry:
                    try:
                        # Convert the radiation value to float
                        radiation_value = float(entry['H(h)_m'])
                        radiation_total += radiation_value
                        count += 1
                    except ValueError as e:
                        # Skip entries with invalid data and print an error message
                        print(f"Skipping entry due to error: {e}, entry content: {entry}")
            average = radiation_total / count
            
            if count==0:
                return 0
            
            return average
        else:
            print("Error: 'outputs' or 'monthly' key not found in the response.")
            return None
    else:
        print("Error:", response.status_code)
        print("Response Content:", response.content.decode('utf-8'))
        return None




#Functions to list the subcategories a place has based only on the categories chosen. Commented out because it may not be necessary.
# def list_categories_commercial(place_id):
#     #Query the database to see which columns that begin with 'COMMERCIAL' are True for the place_id
#     place = Places.query.filter_by(ID = place_id).first()
#     commercial_categories = []
#     for column in place:
#         if column.startswith('COMMERCIAL') and place[column] == True:
#             commercial_categories.append(column)
#     return commercial_categories

# def list_categories_catering(place_id):
#     #Query the database to see which columns that begin with 'CATERING' are True for the place_id
#     place = Places.query.filter_by(ID = place_id).first()
#     catering_categories = []
#     for column in place:
#         if column.startswith('CATERING') and place[column] == True:
#             catering_categories.append(column)
#     return catering_categories

# def list_categories_production(place_id):
#     #Query the database to see which columns that begin with 'PRODUCTION' are True for the place_id
#     place = Places.query.filter_by(ID = place_id).first()
#     production_categories = []
#     for column in place:
#         if column.startswith('PRODUCTION') and place[column] == True:
#             production_categories.append(column)
#     return production_categories

# def list_categories_service(place_id):
#     #Query the database to see which columns that begin with 'SERVICE' are True for the place_id
#     place = Places.query.filter_by(ID = place_id).first()
#     service_categories = []
#     for column in place:
#         if column.startswith('SERVICE') and place[column] == True:
#             service_categories.append(column)
#     return service_categories

# def list_categories_office(place_id):
#     #Query the database to see which columns that begin with 'OFFICE' are True for the place_id
#     place = Places.query.filter_by(ID = place_id).first()
#     office_categories = []
#     for column in place:
#         if column.startswith('OFFICE') and place[column] == True:
#             office_categories.append(column)
#     return office_categories



# Define routes
# Define routes
@app.route('/')
def home():
    places = db.session.query(Places.PLACE_ID, Places.NAME, Places.LATITUDE, Places.LONGITUDE).all()
    places_list = [{'NAME': place.NAME, 'LATITUDE': place.LATITUDE, 'LONGITUDE': place.LONGITUDE} for place in places]
    return jsonify(places=places_list)

@app.route('/get_places', methods=['GET'])
def get_places():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    radius = request.args.get('radius', '2000')
    
    if lat is None or lon is None:
        return jsonify({"error": "Latitude and longitude are required parameters"}), 400

    try:
        lat = float(lat)
        lon = float(lon)
        radius_meters = int(radius)
    except ValueError:
        return jsonify({"error": "Latitude and longitude must be valid numbers"}), 400

    query = text("""
        SELECT PLACE_ID, NAME, LATITUDE, LONGITUDE
        FROM Places
        WHERE LOCATION.STDistance(geography::Point(:lat, :lon, 4326)) <= :radius_meters
    """)

    result = db.session.execute(query, {'lat': lat, 'lon': lon, 'radius_meters': radius_meters})

    places_list = []
    for row in result:
        places_list.append({
            'PLACE_ID': row.PLACE_ID,
            'NAME': row.NAME,
            'LATITUDE': row.LATITUDE,
            'LONGITUDE': row.LONGITUDE,
        })

    return jsonify(places=places_list)
@app.route('/get_solar', methods=['GET'])
def get_solar(lon, lat):
    lon = round(lon, 3)
    lat = round(lat, 3)
    radiation_average = get_solar_data_average(lon, lat)
    return jsonify(radiation = f"{radiation_average:.2f}")

#Login-Logout routes I used for Capstone - Andres

@app.route('/register', methods=['POST', 'OPTIONS'])
def register(): #This route is used to register a new user
    if request.method == 'OPTIONS':
        response = flask.make_response()
        return add_cors_headers(response)
    data = request.json
    email = data.get("email")
    user = data.get("username")
    password = data.get("password")
    username = Users.query.filter_by(USERNAME=user).first()
    email_check = Users.query.filter_by(EMAIL=email).first()
    if username:
        return jsonify({"success": "false", "message": "User already exists."}), 404
    elif email_check:
        return jsonify({"success": "false", "message": "Email already in use."}), 404
    else:
        new_user = Users(USERNAME=user, PASSWORD=hash_password(password))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": "true", "message": "User created successfully."}), 201

@app.route('/login', methods=['POST', 'OPTIONS'])
def login(): #This route is used to log in the user
    if request.method == 'OPTIONS':
        response = flask.make_response()
        return add_cors_headers(response)
    data = request.json
    user = data.get("username")
    username = Users.query.filter_by(USERNAME=user).first()
    password = data.get("password")
    if username and check_password(username.USERNAME, password):
        session.permanent = True
        session.modified = True
        session['username'] = username.USERNAME
        return jsonify({"username": session['username'], "message": "Logged in successfully."}), 200
    else:
        return jsonify({"success": "false", "message": "User not found or incorrect password."}), 404

@app.route('/logout', methods=['GET']) #This route is used to log out the user
def logout():
    session.clear()
    return jsonify({"message": "Logged out."}), 200

if __name__ == "__main__":
    app.run(debug=True)