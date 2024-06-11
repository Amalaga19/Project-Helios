from flask import Flask, jsonify
from dotenv import load_dotenv
import os
import requests
import argon2
from argon2 import PasswordHasher


load_dotenv()

geoapify_url = "https://api.geoapify.com/v2/places"

radius_meters = 2000

results_number = 500

geoapify_api_key = os.getenv('API_KEY_GEOAPIFY0')

main_categories = ['commercial', 'catering', 'production', 'service', 'office']

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')



def set_category_list():
    pass

# Define routes
@app.route('/')
def home():
    return jsonify(message="Hello, Barter Energy!")

@app.route('/get_places')
def get_places():
    pass

#Below the authentication routes and hashing I used for my capstone, we can modify them later as per our database schema -Andres
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