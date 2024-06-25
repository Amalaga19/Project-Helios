import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Identity

db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'USERS'
    USER_ID = db.Column(db.Integer, Identity(start=1, cycle=False), primary_key=True)
    USERNAME = db.Column(db.String(100), unique=True, nullable=False)
    PASSWORD = db.Column(db.String(1000), nullable=False) # 1000 characters because the password will be hashed
    requests_log = db.relationship("Requests", back_populates="user")

    def user_dict(self):
        return {"id": self.USER_ID, "username": self.USERNAME, "requests": [request.request_dict() for request in self.requests_log]}
    
class Requests(db.Model):
    __tablename__ = 'REQUESTS'
    REQUEST_ID = db.Column(db.Integer, Identity(start=1, cycle=False), primary_key=True)
    USER_ID = db.Column(db.Integer, db.ForeignKey('USERS.USER_ID'), nullable=False)
    LONGITUDE = db.Column(db.Float, nullable=False)
    LATITUDE = db.Column(db.Float, nullable=False)
    DATE_TIME = db.Column(db.DateTime, nullable=False)
    CATERING = db.Column(db.Boolean, nullable=False)
    COMMERCIAL = db.Column(db.Boolean, nullable=False)
    OFFICE = db.Column(db.Boolean, nullable=False)
    PRODUCTION = db.Column(db.Boolean, nullable=False)
    SERVICE = db.Column(db.Boolean, nullable=False)
    user = db.relationship("Users", back_populates="requests_log")

    def request_dict(self):
        return {"id": self.REQUEST_ID, "user_id": self.USER_ID, "longitude": self.LONGITUDE, "latitude": self.LATITUDE, "date_time": self.DATE_TIME, "categories": [category for category in self.__dict__.keys() if self.__dict__[category] == True]}


class Places(db.Model):
    __tablename__ = 'PLACES'
    PLACE_ID = db.Column(db.Integer, Identity(start = 1, cycle = False), primary_key=True)
    NAME = db.Column(db.String(100), nullable=False)
    LONGITUDE = db.Column(db.Float, nullable=False)
    LATITUDE = db.Column(db.Float, nullable=False)
    COUNTRY = db.Column(db.String(100), nullable=False)
    STATE = db.Column(db.String(100), nullable=False)
    CITY = db.Column(db.String(100), nullable=False)
    DISTRICT = db.Column(db.String(100), nullable=True)
    NEIGHBOURHOOD = db.Column(db.String(100), nullable=True)
    SUBURB = db.Column(db.String(100), nullable=True)
    STREET = db.Column(db.String(100), nullable=True)
    POSTCODE = db.Column(db.String(100), nullable=False)
    CATERING = db.Column(db.Boolean, nullable=False)
    COMMERCIAL = db.Column(db.Boolean, nullable=False)
    OFFICE = db.Column(db.Boolean, nullable=False)
    PRODUCTION = db.Column(db.Boolean, nullable=False)
    SERVICE = db.Column(db.Boolean, nullable=False)
    SERVICE_RECYCLING = db.Column(db.Boolean, nullable=False)
    SERVICE_VEHICLE = db.Column(db.Boolean, nullable=False)
    SERVICE_POLICE = db.Column(db.Boolean, nullable=False)
    SERVICE_SOCIAL_FACILITY = db.Column(db.Boolean, nullable=False)
    SERVICE_FINANCIAL = db.Column(db.Boolean, nullable=False)
    SERVICE_FUNERAL_DIRECTORS = db.Column(db.Boolean, nullable=False)
    SERVICE_POST = db.Column(db.Boolean, nullable=False)
    SERVICE_BEAUTY = db.Column(db.Boolean, nullable=False)
    SERVICE_ESTATE_AGENT = db.Column(db.Boolean, nullable=False)
    SERVICE_TAXI = db.Column(db.Boolean, nullable=False)
    SERVICE_TRAVEL_AGENCY = db.Column(db.Boolean, nullable=False)
    SERVICE_CLEANING = db.Column(db.Boolean, nullable=False)
    SERVICE_BOOKMAKER = db.Column(db.Boolean, nullable=False)
    SERVICE_TAILOR = db.Column(db.Boolean, nullable=False)
    SERVICE_LOCKSMITH = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_HOUSEWARE_AND_HARDWARE = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_ELEKTRONICS = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_TRADE = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_OUTDOOR_AND_SPORT = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_SHOPPING_MALL = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_SUPERMARKET = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_MARKETPLACE = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_DEPARTMENT_STORE = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_TICKETS_AND_LOTTERY = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_FURNITURE_AND_INTERIOR = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_BOOKS = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_CONVENIENCE = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_GARDEN = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_VEHICLE = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_HEALTH_AND_BEAUTY = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_FLORIST = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_SMOKING = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_FOOD_AND_DRINK = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_KIOSK = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_CLOTHING = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_HOBBY = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_TOY_AND_GAME = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_DISCOUNT_STORE = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_NEWSAGENT = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_PET = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_GIFT_AND_SOUVENIR = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_STATIONERY = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_JEWELRY = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_BAG = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_CHEMIST = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_ART = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_EROTIC = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_WATCHES = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_SECOND_HAND = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_VIDEO_AND_MUSIC = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_ANTIQUES = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_GAS = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_BABY_GOODS = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_ENERGY = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_WEDDING = db.Column(db.Boolean, nullable=False)
    COMMERCIAL_WEAPONS = db.Column(db.Boolean, nullable=False)
    CATERING_RESTAURANT = db.Column(db.Boolean, nullable=False)
    CATERING_PUB = db.Column(db.Boolean, nullable=False)
    CATERING_FAST_FOOD = db.Column(db.Boolean, nullable=False)
    CATERING_BAR = db.Column(db.Boolean, nullable=False)
    CATERING_CAFE = db.Column(db.Boolean, nullable=False)
    CATERING_TAPROOM = db.Column(db.Boolean, nullable=False)
    CATERING_BIERGARTEN = db.Column(db.Boolean, nullable=False)
    CATERING_ICE_CREAM = db.Column(db.Boolean, nullable=False)
    CATERING_FOOD_COURT = db.Column(db.Boolean, nullable=False)
    OFFICE_GOVERNMENT = db.Column(db.Boolean, nullable=False)
    OFFICE_EDUCATIONAL_INSTITUTION = db.Column(db.Boolean, nullable=False)
    OFFICE_FOUNDATION = db.Column(db.Boolean, nullable=False)
    OFFICE_COMPANY = db.Column(db.Boolean, nullable=False)
    OFFICE_RESEARCH = db.Column(db.Boolean, nullable=False)
    OFFICE_DIPLOMATIC = db.Column(db.Boolean, nullable=False)
    OFFICE_INSURANCE = db.Column(db.Boolean, nullable=False)
    OFFICE_POLITICAL_PARTY = db.Column(db.Boolean, nullable=False)
    OFFICE_EMPLOYMENT_AGENCY = db.Column(db.Boolean, nullable=False)
    OFFICE_NON_PROFIT = db.Column(db.Boolean, nullable=False)
    OFFICE_ESTATE_AGENT = db.Column(db.Boolean, nullable=False)
    OFFICE_ASSOCIATION = db.Column(db.Boolean, nullable=False)
    OFFICE_FINANCIAL = db.Column(db.Boolean, nullable=False)
    OFFICE_IT = db.Column(db.Boolean, nullable=False)
    OFFICE_NOTARY = db.Column(db.Boolean, nullable=False)
    OFFICE_ENERGY_SUPPLIER = db.Column(db.Boolean, nullable=False)
    OFFICE_COWORKING = db.Column(db.Boolean, nullable=False)
    OFFICE_LAWYER = db.Column(db.Boolean, nullable=False)
    OFFICE_CHARITY = db.Column(db.Boolean, nullable=False)
    OFFICE_SECURITY = db.Column(db.Boolean, nullable=False)
    OFFICE_TRAVEL_AGENT = db.Column(db.Boolean, nullable=False)
    OFFICE_ARCHITECT = db.Column(db.Boolean, nullable=False)
    OFFICE_TAX_ADVISOR = db.Column(db.Boolean, nullable=False)
    OFFICE_ACCOUNTANT = db.Column(db.Boolean, nullable=False)
    OFFICE_RELIGION = db.Column(db.Boolean, nullable=False)
    OFFICE_NEWSPAPER = db.Column(db.Boolean, nullable=False)
    OFFICE_TELECOMMUNICATION = db.Column(db.Boolean, nullable=False)
    OFFICE_CONSULTING = db.Column(db.Boolean, nullable=False)
    OFFICE_ADVERTISING_AGENCY = db.Column(db.Boolean, nullable=False)
    OFFICE_LOGISTICS = db.Column(db.Boolean, nullable=False)
    OFFICE_FINANCIAL_ADVISOR = db.Column(db.Boolean, nullable=False)
    PRODUCTION_FACTORY = db.Column(db.Boolean, nullable=False)
    PRODUCTION_BREWERY = db.Column(db.Boolean, nullable=False)
    PRODUCTION_POTTERY = db.Column(db.Boolean, nullable=False)
    PRODUCTION_WINERY = db.Column(db.Boolean, nullable=False)

    def place_dict(self):
        return {"id": self.PLACE_ID, "name": self.NAME, "longitude": self.LONGITUDE, "latitude": self.LATITUDE, "country": self.COUNTRY, "state": self.STATE, "city": self.CITY, "district": self.DISTRICT, "neighbourhood": self.NEIGHBOURHOOD, "suburb": self.SUBURB, "street": self.STREET, "postcode": self.POSTCODE, "categories": [category for category in self.__dict__.keys() if self.__dict__[category] == True]}
    






















# import pyodbc

# SERVER = 'tcp:corporateproject.database.windows.net,1433'
# DATABASE = 'CorporateProject'
# USERNAME = 'lbarbion'
# PASSWORD = 'Corporateproject!'

# connectionString = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={SERVER};DATABASE={DATABASE};UID={USERNAME};PWD={PASSWORD}'



# # Establish the connection
# conn = pyodbc.connect(connectionString)

# # Define the SQL query strings for creating the tables
# create_users_table_query = """
# CREATE TABLE USERS (
#     USER_ID INT IDENTITY(1,1) PRIMARY KEY,
#     USERNAME VARCHAR(100) UNIQUE NOT NULL,
#     PASSWORD VARCHAR(1000) NOT NULL
# );
# """

# create_requests_table_query = """
# CREATE TABLE REQUESTS (
#     REQUEST_ID INT IDENTITY(1,1) PRIMARY KEY,
#     USER_ID INT NOT NULL,
#     LONGITUDE FLOAT NOT NULL,
#     LATITUDE FLOAT NOT NULL,
#     DATE_TIME DATETIME NOT NULL,
#     CATERING BIT NOT NULL,
#     COMMERCIAL BIT NOT NULL,
#     OFFICE BIT NOT NULL,
#     PRODUCTION BIT NOT NULL,
#     SERVICE BIT NOT NULL,
#     FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID)
# );
# """

# try:
#     cursor = conn.cursor()
    
#     # Execute the queries to create the tables
#     cursor.execute(create_users_table_query)
#     cursor.execute(create_requests_table_query)
    
#     conn.commit()  # Commit the changes

#     print("Tables created successfully.")
    
# except pyodbc.Error as ex:
#     print("Error in connection: ", ex)
# finally:
#     if 'conn' in locals():
#         conn.close()













# # try:
# #     # Establish the connection
# #     conn = pyodbc.connect(connectionString)
# #     cursor = conn.cursor()
# #     # # Define the SQL query string
# #     # SQL_QUERY = "SELECT TOP 5 id, name, latitude, longitude FROM CLEANDATA;"  # Replace with your table name

# #     # cursor.execute(SQL_QUERY)
# #     # rows = cursor.fetchall()
    
# #     # # Print the results
# #     # for row in rows:
# #     #     print(f'id: {row.id}, name: {row.name}, latitude: {row.latitude}, longitude: {row.longitude}')
        
# # except pyodbc.Error as ex:
# #     print("Error in connection: ", ex)
# # finally:
# #     if 'conn' in locals():
# #         conn.close()
