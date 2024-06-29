from flask import Flask, jsonify, request, session
import flask
from dotenv import load_dotenv
import os
import requests
import argon2
from argon2 import PasswordHasher
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity
from data_model import db, Users, Requests, Places
from sqlalchemy import text
import datetime

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

def check_password(hashed_password, password): #checks the password against the hashed password in the database
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
            
            if count==0:
                return 0
            
            average = radiation_total / count

            return average
        else:
            print("Error: 'outputs' or 'monthly' key not found in the response.")
            return None
    else:
        print("Error:", response.status_code)
        print("Response Content:", response.content.decode('utf-8'))
        return None

def build_query(catering, commercial, production, service, office):
    categories = {
        'CATERING': catering,
        'COMMERCIAL': commercial,
        'PRODUCTION': production,
        'SERVICE': service,
        'OFFICE': office
    }

    category_conditions = [f"{category} = 1" for category, is_selected in categories.items() if is_selected]

    if not category_conditions:
        return jsonify({"error": "At least one category must be selected"}), 400

    where_clause = " OR ".join(category_conditions)
    query_str = f"""
        SELECT * FROM Places
        WHERE ({where_clause}) AND LOCATION.STDistance(geography::STGeomFromText(:point, 4326)) <= :radius_meters
    """
    return text(query_str)

def record_request(longitude, latitude, radius, catering, commercial, production, service, office):
    right_now = datetime.datetime.now()
    new_request = Requests(DATE_TIME = right_now, LONGITUDE=longitude, LATITUDE=latitude, RADIUS=radius, CATERING=catering, COMMERCIAL=commercial, PRODUCTION=production, SERVICE=service, OFFICE=office)
    db.session.add(new_request)
    db.session.commit()

# Define routes
@app.route('/')
def home():
    #To be removed later
    #Query for all the elements of the places table
    places = db.session.query(Places).all()
    places_list = []
    for place in places:
        places_list.append(Places.place_dict(place))
        if len(places_list) > 20:
            break
    return jsonify(places=places_list)

@app.route('/get_places', methods=['GET'])
def get_places():
    try:
        lat = float(request.args.get('lat'))
    except:
        return jsonify({"error": "Latitude must be a valid number"}), 400
    try:
        lon = float(request.args.get('lon'))
    except:
        return jsonify({"error": "Longitude must be a valid number"}), 400
    try:
        radius = request.args.get('radius', '2000')
    except:
        return jsonify({"error": "Radius must be a valid number"}), 400
    catering = request.args.get('catering', 'false').lower() == 'true'
    commercial = request.args.get('commercial', 'false').lower() == 'true'
    production = request.args.get('production', 'false').lower() == 'true'
    service = request.args.get('service', 'false').lower() == 'true'
    office = request.args.get('office', 'false').lower() == 'true'

    # For debugging
    print(f"Latitude: {lat}, Longitude: {lon}, Radius: {radius_meters}")
    print(f"Category selections - Catering: {catering}, Commercial: {commercial}, Production: {production}, Service: {service}, Office: {office}")

    query = build_query(catering, commercial, production, service, office)
    results = db.session.execute(query, {'point': f'POINT({lon} {lat})', 'radius_meters': radius_meters})
    #record_request(lat, lon, radius_meters, catering, commercial, production, service, office) #Disabled until registering users and login are properly implemented in the frontend
    places_list = []
    for place in results:
        place_dict = Places.place_dict(place) #This is a method in the Places class that converts the row to a dictionary
        if place_dict not in places_list:
            places_list.append(place_dict)
        else:
            continue
    print(f"Found places: {places_list}")
    return jsonify(places=places_list)


@app.route('/get_solar', methods=['GET'])
def get_solar():
    lon = request.args.get('lon', type=float)
    lat = request.args.get('lat', type=float)
    
    if lon is None or lat is None:
        return jsonify({"error": "Longitude and latitude are required parameters"}), 400

    lon = round(lon, 3)
    lat = round(lat, 3)
    radiation_average = get_solar_data_average(lon, lat)
    
    if radiation_average is None:
        return jsonify({"error": "Failed to retrieve solar data"}), 500
    
    return jsonify(radiation=f"{radiation_average:.2f}")

#Login-Logout routes I used for Capstone - Andres

@app.route('/register', methods=['POST', 'OPTIONS'])
def register(): #This route is used to register a new user
    if request.method == 'OPTIONS':
        response = flask.make_response()
        return add_cors_headers(response)
    data = request.json
    user = data.get("username")
    password = data.get("password")
    username = Users.query.filter_by(USERNAME=user).first()
    if username:
        return jsonify({"success": "false", "message": "User already exists."}), 404
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