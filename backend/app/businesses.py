import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('API_KEY_GEOAPIFY') # API key for GeoAPIfy, get yours at https://myprojects.geoapify.com/ and insert it in the .env file 

api_url = "https://api.geoapify.com/v2/places?categories=commercial&filter=circle:"

radius_meters = 2000

results_number = 500

#Coordinates corresponding to IE University's Maria de Molina campus
longitude = -3.681917087641409
latitude = 40.48017420167045

print(api_key)

def get_businesses(lon, lat):
    url = f"{api_url}{lon},{lat},{radius_meters}&bias=proximity:{lon},{lat}&limit={results_number}&apiKey={api_key}"
    response = requests.get(url)
    data = response.json()
    return data

def json_to_csv(data):
    businesses = data['features']
    counter = 0
    with open('businesses.csv', 'w') as file:
        businesses_dict = {}
        file.write('id,name,longitude,latitude,country,state,city,district,neighbourhood,suburb,street,postcode,address,categories\n')
        for business in businesses:
            if "country" in business["properties"] and business["properties"]["country"] == "Spain" and "name" in business['properties'] and "postcode" in business['properties'] and "categories" in business['properties']:
                if "neighbourhood" not in business['properties']:
                    business['properties']['neighbourhood'] = ""
                if "suburb" not in business['properties']:
                    business['properties']['suburb'] = ""
                if "street" not in business['properties']:
                    business['properties']['street'] = ""
                if "district" not in business['properties']:
                    business['properties']['district'] = ""
                if "city" not in business['properties']:
                    business['properties']['city'] = ""
                if "state" not in business['properties']:
                    business['properties']['state'] = ""
                if "postcode" not in business['properties']:
                    business['properties']['postcode'] = ""
                if "formatted" not in business['properties']:
                    business['properties']['formatted'] = ""
                name = business['properties']['name']
                id = business['properties']['datasource']['raw']['osm_id']
                longitude = business['geometry']['coordinates'][0]
                latitude = business['geometry']['coordinates'][1]
                country = business['properties']['country']
                state = business['properties']['state']
                city = business['properties']['city']
                district = business['properties']['district']
                neighbourhood = business['properties']['neighbourhood']
                suburb = business['properties']['suburb']
                street = business['properties']['street']
                postcode = business['properties']['postcode']
                address = business['properties']['formatted']
                categories = business['properties']['categories']
                businesses_dict[id] = {
                    'name': name,
                    'latitude': latitude,
                    'longitude': longitude,
                    'country': country,
                    'state': state,
                    'city': city,
                    'district': district,
                    'neighbourhood': neighbourhood,
                    'suburb': suburb,
                    'street': street,
                    'postcode': postcode,
                    'address': address,
                    'categories': categories
                }
                counter += 1
                file.write(f"{id},{name},{longitude},{latitude},{country},{state},{city},{district},{neighbourhood},{suburb},{street},{postcode},{address},{categories}\n")
        print(f"Total businesses: {counter}")
    return businesses_dict

business_data = get_businesses(longitude, latitude)
business_dict = json_to_csv(business_data)
