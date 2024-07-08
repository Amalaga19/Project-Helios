import requests
import numpy as np
import threading
from dotenv import load_dotenv
import os

load_dotenv()

# List of API keys
api_keys_list = [os.getenv(f'API_KEY_GEOAPIFY{i}') for i in range(1)] #This can be adjusted to use multiple API keys, here we are using only one

category_list = ["catering", "commercial", "offices", "production", "services"]

api_url = "https://api.geoapify.com/v2/places?"

radius_meters = 2000

results_number = 500

# Coordinates for the bounding box - The approxiate coordinates for the furthest points north, south, east and west of the City of Madrid
# For other cities or areas, replace accordingly
furthest_north = 40.64379259948183

furthest_south = 40.31261487936527

furthest_west = -3.8347824802642663

furthest_east = -3.5251321045585655


#Number of steps to divide the grid into
#This can be adjusted depending on the size of the area needed to be covered. Ideally every step should equal around 1/4 of the radius in meters.
#the total distance to be covered can be estimated by measuring the straight line distance between the furthest points east and west of the area to be covered.
#The total distance can then be divided by a quarter of the radius in meters to get the number of steps needed to cover the area.
steps = 80

x_step = (furthest_east - furthest_west) / steps

y_step = (furthest_north - furthest_south) / steps

businesses_dict = {}

if len(api_keys_list) > 1:
    semaphore = threading.Semaphore(len(api_keys_list))
    lock = threading.Lock()

# Function to get businesses from Geoapify
def get_businesses(lon, lat, api_key, categories):
    for category in categories:
        url = f"categories={category}&filter=circle:{api_url}{lon},{lat},{radius_meters}&bias=proximity:{lon},{lat}&limit={results_number}&apiKey={api_key}"
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
    for business in businesses: #Here we are filtering the data to only include businesses in Madrid, Spain. To include businesses from other cities or countries, adjust or delete the business["properties"]["country"] or business["properties"]["city"] conditions accordingly
        if "country" in business["properties"] and business["properties"]["country"] == "Spain" and business["properties"]["city"] == "Madrid" and "name" in business['properties'] and "postcode" in business['properties'] and "categories" in business['properties']:
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
                'categories': categories,
            }
    return result_dict

# Function to write the dictionary to a CSV file
def dict_to_csv(dict):
    #First check if the file exists, if it does, append to it, if it doesn't, create it
    if os.path.exists('backend/app/all_data.csv') == False:
        with open('backend/app/all_data.csv', 'w', encoding="utf-8") as file:
            file.write("id,name,latitude,longitude,country,state,city,district,neighbourhood,suburb,street,postcode,categories\n")
            for business in dict.values():
                file.write(f"\"{business['id']}\",\"{business['name']}\",\"{business['latitude']}\",\"{business['longitude']}\",\"{business['country']}\",\"{business['state']}\",\"{business['city']}\",\"{business['district']}\",\"{business['neighbourhood']}\",\"{business['suburb']}\",\"{business['street']}\",\"{business['postcode']}\",\"{(business['categories'])}\"\n")
    else:
        with open('backend/app/all_data.csv', 'a', encoding="utf-8") as file:
            for business in dict.values():
                file.write(f"\"{business['id']}\",\"{business['name']}\",\"{business['latitude']}\",\"{business['longitude']}\",\"{business['country']}\",\"{business['state']}\",\"{business['city']}\",\"{business['district']}\",\"{business['neighbourhood']}\",\"{business['suburb']}\",\"{business['street']}\",\"{business['postcode']}\",\"{(business['categories'])}\"\n")
    return "CSV file created successfully"

# Thread function to process a portion of the grid
def process_grid_section(x_start, x_end, y_start, y_end, api_key):
    global businesses_dict
    local_dict = {}
    try:
        for y in np.arange(y_start, y_end, y_step):
            for x in np.arange(x_start, x_end, x_step):
                business_data = get_businesses(x, y, api_key, category_list)
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
    #column_counter = 0
    for x in np.arange(furthest_west, furthest_east, x_step):
        semaphore.acquire() 
        api_key = api_keys_list[api_key_index % len(api_keys_list)] # Use a different API key for each thread
        if len(api_keys_list) > 1: #If multiple api keys are used, the requests will run in threads and each thread will use a different api key
            api_key_index += 1
            thread = threading.Thread(target=process_grid_section, args=(x, x + x_step, y, y + y_step, api_key)) #Create a section of the grid for each thread
            threads.append(thread)
            thread.start()
        #column_counter += 1
    print(row_counter)
    if row_counter % 10 == 0: # Write to CSV every 10 rows and wait for threads to finish
        dict_to_csv(businesses_dict)
        if len(api_keys_list) > 1:
            for thread in threads:
                thread.join()
                threads = []
                print(f"{thread} finished")
    row_counter += 1

# Wait for all threads to finish in case they haven't finished yet
if len(api_keys_list) > 1:
    for thread in threads:
        thread.join()
        print(f"{thread} finished")
    print("All threads completed. Writing to CSV...")
dict_to_csv(businesses_dict) # Write to CSV one last time
print("Processing complete. CSV file created successfully.")