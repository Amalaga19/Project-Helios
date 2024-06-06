import requests
import json
from dotenv import load_dotenv
import os
import csv
import numpy as np

load_dotenv()

api_key = os.getenv('API_KEY_GEOAPIFY') # API key for Geoapify, get yours at https://myprojects.geoapify.com/ and insert it in the .env file 

api_url = "https://api.geoapify.com/v2/places?categories=commercial&filter=circle:"

radius_meters = 2000

results_number = 500

#The four furthest points in the community of Madrid, used to create a bounding box for the search

furthest_north = 41.16570922250841

furthest_south = 39.884619908455534

furthest_west = -4.578508218989555

furthest_east = -3.0529962851916252

steps = 200

x_step = (furthest_east-furthest_west)/steps
y_step = (furthest_north-furthest_south)/steps

businesses_dict = {}

counter = 0


#Coordinates corresponding to IE University's Maria de Molina campus
longitude = -3.681917087641409
latitude = 40.437654856444254

print(api_key)

def get_businesses(lon, lat): #Function to get businesses from Geoapify 
    url = f"{api_url}{lon},{lat},{radius_meters}&bias=proximity:{lon},{lat}&limit={results_number}&apiKey={api_key}"
    response = requests.get(url)
    data = response.json()
    return data

def data_to_dict(data): #Function to add the data to a dictionary
    businesses = data['features']
    for business in businesses:
        # Check if the business is in Spain (in case the area covered by the circle includes other countries) and if certain information is present
        if "country" in business["properties"] and business["properties"]["country"] == "Spain" and "name" in business['properties'] and "postcode" in business['properties'] and "categories" in business['properties']:
            # Check if less crucial information is present and assign an empty string if it is not
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
            # Assign the information to variables
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
            # Add the information to the dictionary
            businesses_dict[id] = {
                'id': id,
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
    return businesses_dict

def dict_to_csv(dict): #Function to write the inner dictionary to a CSV file
    with open('businesses.csv', 'w') as file:
        file.write("id,name,latitude,longitude,country,state,city,district,neighbourhood,suburb,street,postcode,address,categories\n")
        for business in dict:
            file.write(f"{dict[business]['id']},{dict[business]['name']},{dict[business]['latitude']},{dict[business]['longitude']},{dict[business]['country']},{dict[business]['state']},{dict[business]['city']},{dict[business]['district']},{dict[business]['neighbourhood']},{dict[business]['suburb']},{dict[business]['street']},{dict[business]['postcode']},{dict[business]['address']},{dict[business]['categories']}\n")
    return "CSV file created successfully"    

for y in np.arange(furthest_north, furthest_south, -y_step):
    x_counter = 0
    for x in np.arange(furthest_west, furthest_east, x_step):
        business_data = get_businesses(x, y)
        businesses_dict.update(data_to_dict(business_data))
        x_counter += 1
        print(f"Column {x_counter} done")
    counter += 1
    print(f"Row {counter} done")
dict_to_csv(businesses_dict)




# business_data = get_businesses(longitude, latitude)
# business_dict = json_to_csv(business_data)


