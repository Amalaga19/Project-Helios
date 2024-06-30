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
    RADIUS = db.Column(db.Integer, nullable=False)
    DATE_TIME = db.Column(db.DateTime, nullable=False)
    CATERING = db.Column(db.Boolean, nullable=False)
    COMMERCIAL = db.Column(db.Boolean, nullable=False)
    OFFICE = db.Column(db.Boolean, nullable=False)
    PRODUCTION = db.Column(db.Boolean, nullable=False)
    SERVICE = db.Column(db.Boolean, nullable=False)
    user = db.relationship("Users", back_populates="requests_log")

    def request_dict(self):
        return {"id": self.REQUEST_ID, "user_id": self.USER_ID, "longitude": self.LONGITUDE, "latitude": self.LATITUDE, "date_time": self.DATE_TIME, "catering": self.CATERING, "commercial": self.COMMERCIAL, "office": self.OFFICE, "production": self.PRODUCTION, "service": self.SERVICE}


class Places(db.Model):
    __tablename__ = 'PLACES'
    PLACE_ID = db.Column(db.BigInteger, primary_key=True, nullable=False)
    NAME = db.Column(db.String(100), nullable=False)
    LONGITUDE = db.Column(db.Float, nullable=False)
    LATITUDE = db.Column(db.Float, nullable=False)
    LOCATION = db.Column(db.Text, nullable=False)
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
        return {"id": self.PLACE_ID, "name": self.NAME, "longitude": self.LONGITUDE, "latitude": self.LATITUDE, "country": self.COUNTRY, "state": self.STATE, "city": self.CITY, "district": self.DISTRICT, "neighbourhood": self.NEIGHBOURHOOD, "suburb": self.SUBURB, "street": self.STREET, "postcode": self.POSTCODE, "categories":{"catering": self.CATERING, "commercial": self.COMMERCIAL, "office": self.OFFICE, "production": self.PRODUCTION, "service": self.SERVICE}}#, "subcategories":{"service_recycling": self.SERVICE_RECYCLING, "service_vehicle": self.SERVICE_VEHICLE, "service_police": self.SERVICE_POLICE, "service_social_facility": self.SERVICE_SOCIAL_FACILITY, "service_financial": self.SERVICE_FINANCIAL, "service_funeral_directors": self.SERVICE_FUNERAL_DIRECTORS, "service_post": self.SERVICE_POST, "service_beauty": self.SERVICE_BEAUTY, "service_estate_agent": self.SERVICE_ESTATE_AGENT, "service_taxi": self.SERVICE_TAXI, "service_travel_agency": self.SERVICE_TRAVEL_AGENCY, "service_cleaning": self.SERVICE_CLEANING, "service_bookmaker": self.SERVICE_BOOKMAKER, "service_tailor": self.SERVICE_TAILOR, "service_locksmith": self.SERVICE_LOCKSMITH, "commercial_houseware_and_hardware": self.COMMERCIAL_HOUSEWARE_AND_HARDWARE, "commercial_elektronics": self.COMMERCIAL_ELEKTRONICS, "commercial_trade": self.COMMERCIAL_TRADE, "commercial_outdoor_and_sport": self.COMMERCIAL_OUTDOOR_AND_SPORT, "commercial_shopping_mall": self.COMMERCIAL_SHOPPING_MALL, "commercial_supermarket": self.COMMERCIAL_SUPERMARKET, "commercial_marketplace": self.COMMERCIAL_MARKETPLACE, "commercial_department_store": self.COMMERCIAL_DEPARTMENT_STORE, "commercial_tickets_and_lottery": self.COMMERCIAL_TICKETS_AND_LOTTERY, "commercial_furniture_and_interior": self.COMMERCIAL_FURNITURE_AND_INTERIOR, "commercial_books": self.COMMERCIAL_BOOKS, "commercial_convenience": self.COMMERCIAL_CONVENIENCE, "commercial_garden": self.COMMERCIAL_GARDEN, "commercial_vehicle": self.COMMERCIAL_VEHICLE, "commercial_health_and_beauty": self.COMMERCIAL_HEALTH_AND_BEAUTY, "commercial_florist": self.COMMERCIAL_FLORIST, "commercial_smoking": self.COMMERCIAL_SMOKING, "commercial_food_and_drink": self.COMMERCIAL_FOOD_AND_DRINK, "commercial_kiosk": self.COMMERCIAL_KIOSK, "commercial_clothing": self.COMMERCIAL_CLOTHING, "commercial_hobby": self.COMMERCIAL_HOBBY, "commercial_toy_and_game": self.COMMERCIAL_TOY_AND_GAME, "commercial_discount_store": self.COMMERCIAL_DISCOUNT_STORE, "commercial_newsagent": self.COMMERCIAL_NEWSAGENT, "commercial_pet": self.COMMERCIAL_PET, "commercial_gift_and_souvenir": self.COMMERCIAL_GIFT_AND_SOUVENIR, "commercial_stationery": self.COMMERCIAL_STATIONERY, "commercial_jewelry": self.COMMERCIAL_JEWELRY, "commercial_bag": self.COMMERCIAL_BAG, "commercial_chemist": self.COMMERCIAL_CHEMIST, "commercial_art": self.COMMERCIAL_ART, "commercial_erotic": self.COMMERCIAL_EROTIC, "commercial_watches": self.COMMERCIAL_WATCHES, "commercial_second_hand": self.COMMERCIAL_SECOND_HAND, "commercial_video_and_music": self.COMMERCIAL_VIDEO_AND_MUSIC, "commercial_antiques": self.COMMERCIAL_ANTIQUES, "commercial_gas": self.COMMERCIAL_GAS, "commercial_baby_goods": self.COMMERCIAL_BABY_GOODS, "commercial_energy": self.COMMERCIAL_ENERGY, "commercial_wedding": self.COMMERCIAL_WEDDING, "commercial_weapons": self.COMMERCIAL_WEAPONS, "catering_restaurant": self.CATERING_RESTAURANT, "catering_pub": self.CATERING_PUB, "catering_fast_food": self.CATERING_FAST_FOOD, "catering_bar": self.CATERING_BAR, "catering_cafe": self.CATERING_CAFE, "catering_taproom": self.CATERING_TAPROOM, "catering_biergarten": self.CATERING_BIERGARTEN, "catering_ice_cream": self.CATERING_ICE_CREAM, "catering_food_court": self.CATERING_FOOD_COURT, "office_government": self.OFFICE_GOVERNMENT, "office_educational_institution": self.OFFICE_EDUCATIONAL_INSTITUTION, "office_foundation": self.OFFICE_FOUNDATION, "office_company": self.OFFICE_COMPANY, "office_research": self.OFFICE_RESEARCH, "office_diplomatic": self.OFFICE_DIPLOMATIC, "office_insurance": self.OFFICE_INSURANCE, "office_political_party": self.OFFICE_POLITICAL_PARTY, "office_employment_agency": self.OFFICE_EMPLOYMENT_AGENCY, "office_non_profit": self.OFFICE_NON_PROFIT, "office_estate_agent": self.OFFICE_ESTATE_AGENT, "office_association": self.OFFICE_ASSOCIATION, "office_financial": self.OFFICE_FINANCIAL, "office_it": self.OFFICE_IT, "office_notary": self.OFFICE_NOTARY, "office_energy_supplier": self.OFFICE_ENERGY_SUPPLIER, "office_coworking": self.OFFICE_COWORKING, "office_lawyer": self.OFFICE_LAWYER, "office_charity": self.OFFICE_CHARITY, "office_security": self.OFFICE_SECURITY, "office_travel_agent": self.OFFICE_TRAVEL_AGENT, "office_architect": self.OFFICE_ARCHITECT, "office_tax_advisor": self.OFFICE_TAX_ADVISOR, "office_accountant": self.OFFICE_ACCOUNTANT, "office_religion": self.OFFICE_RELIGION, "office_newspaper": self.OFFICE_NEWSPAPER, "office_telecommunication": self.OFFICE_TELECOMMUNICATION, "office_consulting": self.OFFICE_CONSULTING, "office_advertising_agency": self.OFFICE_ADVERTISING_AGENCY, "office_logistics": self.OFFICE_LOGISTICS, "office_financial_advisor": self.OFFICE_FINANCIAL_ADVISOR, "production_factory": self.PRODUCTION_FACTORY, "production_brewery": self.PRODUCTION_BREWERY, "production_pottery": self.PRODUCTION_POTTERY, "production_winery": self.PRODUCTION_WINERY}}
        #Very long dictionary, but it is necessary to have all the columns in the database to send the JSON to the frontend and to make the CSV file afterwards


    # with app.app_context():
    # db.create_all()
    # print("Tables created successfully.")
    
    # # Use raw SQL to change LOCATION column to geography type
    # alter_table_sql = """
    # ALTER TABLE Places
    # ALTER COLUMN LOCATION geography;
    # """
    # db.session.execute(alter_table_sql)
    # db.session.commit()

    # # Populate the LOCATION column with the latitude and longitude values
    # update_location_sql = """
    # UPDATE Places
    # SET LOCATION = geography::Point(LATITUDE, LONGITUDE, 4326);
    # """
    # db.session.execute(update_location_sql)
    # db.session.commit()

    # # Check if the spatial index exists and drop it if it does
    # drop_index_sql = """
    # IF EXISTS (SELECT name FROM sys.indexes WHERE name = 'SI_Location' AND object_id = OBJECT_ID('Places'))
    # DROP INDEX SI_Location ON Places;
    # """
    # db.session.execute(drop_index_sql)
    # db.session.commit()

    # # Create the spatial index on the LOCATION column
    # create_spatial_index_sql = """
    # CREATE SPATIAL INDEX SI_Location ON Places(LOCATION);
    # """
    # db.session.execute(create_spatial_index_sql)
    # db.session.commit()

