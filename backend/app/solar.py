import requests
import json


'''
# Coordinates for the Community of Madrid, create two nested for loops that can iterate over the latitude and longitude values to fetch solar radiation data for each location.
furthest_north = 41.16570922250841

furthest_south = 39.884619908455534

furthest_west = -4.578508218989555

furthest_east = -3.0529962851916252

'''


# Function to fetch solar radiation data using MRcalc endpoint
def fetch_solar_radiation(lat, lon, horirrad):
    """
    Fetches solar radiation data from the MRcalc endpoint.

    Args:
        lat (float): Latitude of the location.
        lon (float): Longitude of the location.
        horirrad (int): Option to include horizontal radiation (0 or 1).

    Returns:
        dict: JSON data containing solar radiation information.
            Example:
            {
                "outputs": {
                    "monthly": [
                        {
                            "year": 2005,
                            "month": 1,
                            "H(h)_m": 1.2
                        },
                        ...
                    ]
                }
            }
    """
    base_url = "https://re.jrc.ec.europa.eu/api/MRcalc"
    params = {
        "lat": lat,
        "lon": lon,
        "horirrad": horirrad, # option to include horizontal radiation
        "startyear": 2005,
        "endyear": 2016,
        "outputformat": "json",
    }
    
    response = requests.get(base_url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print("Error:", response.status_code)
        print("Response Content:", response.content.decode('utf-8'))
        return None

# Set parameters
latitude = 52.52  # example latitude (Berlin)
longitude = 13.405  # example longitude (Berlin)
horirrad = 1  # horizontal radiation

# Fetch data
solar_data = fetch_solar_radiation(latitude, longitude, horirrad)

# Check if data was fetched successfully
if solar_data:
    with open('solar_radiation_data.json', 'w') as json_file:
        json.dump(solar_data, json_file, indent=4)
    
    print("Data fetched and saved successfully.")
else:
    print("Failed to fetch data.")


with open('solar_radiation_data.json', 'r') as json_file:
    data = json.load(json_file)

# Save data to a CSV file
with open('solar_radiation_data.csv', 'w') as csv_file:
    csv_file.write('Year,Month,Irradiation (kWh/m²)\n')
    for item in data['outputs']['monthly']:
        csv_file.write(f"{item['year']},{item['month']},{item['H(h)_m']}\n")

print("JSON data converted to CSV successfully.")

