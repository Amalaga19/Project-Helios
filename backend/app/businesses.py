import requests
import json
from dotenv import load_dotenv
import os
import csv
import numpy as np
import threading

load_dotenv()

# List of API keys
api_keys_list = [os.getenv(f'API_KEY_GEOAPIFY{i}') for i in range(16)]

api_url = "https://api.geoapify.com/v2/places?categories=commercial&filter=circle:"

radius_meters = 2000

results_number = 500

# Coordinates for the bounding box
furthest_north = 41.16570922250841

furthest_south = 39.884619908455534

furthest_west = -4.578508218989555

furthest_east = -3.0529962851916252

steps = 200

x_step = (furthest_east - furthest_west) / steps

y_step = (furthest_north - furthest_south) / steps

businesses_dict = {}

semaphore = threading.Semaphore(16)

lock = threading.Lock()

# Function to get businesses from Geoapify
def get_businesses(lon, lat, api_key):
    url = f"{api_url}{lon},{lat},{radius_meters}&bias=proximity:{lon},{lat}&limit={results_number}&apiKey={api_key}"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"Request error at lon: {lon}, lat: {lat} - {e}")
        return {}

# Function to add the data to a dictionary
def data_to_dict(data):
    businesses = data.get('features', [])
    result_dict = {}
    for business in businesses:
        if "country" in business["properties"] and business["properties"]["country"] == "Spain" and business["properties"]["state"] == "Community of Madrid" and "name" in business['properties'] and "postcode" in business['properties'] and "categories" in business['properties']:
            business['properties'].setdefault('neighbourhood', "")
            business['properties'].setdefault('suburb', "")
            business['properties'].setdefault('street', "")
            business['properties'].setdefault('district', "")
            business['properties'].setdefault('city', "")
            business['properties'].setdefault('state', "")
            business['properties'].setdefault('postcode', "")
            
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
            categories = business['properties']['categories']
            
            result_dict[id] = {
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
                'categories': categories
            }
    return result_dict

# Function to write the dictionary to a CSV file
def dict_to_csv(dict):
    with open('backend/app/businesses.csv', 'w', encoding="utf-8") as file:
        file.write("id,name,latitude,longitude,country,state,city,district,neighbourhood,suburb,street,postcode,categories\n")
        for business in dict.values():
            file.write(f"{business['id']},{business['name']},{business['latitude']},{business['longitude']},{business['country']},{business['state']},{business['city']},{business['district']},{business['neighbourhood']},{business['suburb']},{business['street']},{business['postcode']},{business['categories']}\n")
    return "CSV file created successfully"

# Thread function to process a portion of the grid
def process_grid_section(x_start, x_end, y_start, y_end, api_key):
    global businesses_dict
    local_dict = {}
    try:
        for y in np.arange(y_start, y_end, y_step):
            for x in np.arange(x_start, x_end, x_step):
                business_data = get_businesses(x, y, api_key)
                local_dict.update(data_to_dict(business_data))
        with lock:
            businesses_dict.update(local_dict)
    except Exception as e:
        print(f"Error processing section: x[{x_start}, {x_end}], y[{y_start}, {y_end}] - {e}")
    finally:
        semaphore.release()

# Create and start threads
threads = []
api_key_index = 0

row_counter = 1

for y in np.arange(furthest_south, furthest_north, y_step):
    column_counter = 0
    for x in np.arange(furthest_west, furthest_east, x_step):
        semaphore.acquire()
        api_key = api_keys_list[api_key_index % len(api_keys_list)]
        api_key_index += 1
        thread = threading.Thread(target=process_grid_section, args=(x, x + x_step, y, y + y_step, api_key))
        threads.append(thread)
        thread.start()
        column_counter += 1
    dict_to_csv(businesses_dict)
    row_counter += 1

# Wait for all threads to finish
for thread in threads:
    thread.join()
    print(f"{thread} finished")

print("All threads completed. Writing to CSV...")
dict_to_csv(businesses_dict)
print("Processing complete. CSV file created successfully.")
