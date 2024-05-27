from flask import Flask, jsonify
from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Define routes
@app.route('/')
def home():
    return jsonify(message="Hello, Barter Energy!")

if __name__ == "__main__":
    app.run(debug=True)
