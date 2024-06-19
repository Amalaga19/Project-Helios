import requests

def fetch_solar_radiation(lat, lon, horirrad):
    base_url = "https://re.jrc.ec.europa.eu/api/MRcalc"
    # Parameters for the API request
    params = {
        "lat": lat,
        "lon": lon,
        "horirrad": horirrad,
        "startyear": 2005,
        "endyear": 2016,
        "outputformat": "json",
    }
    
    response = requests.get(base_url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        
        # Print the structure of the data to understand its format
        print("Data structure:", type(data))
        for key in data:
            print(f"Key: {key}, Type: {type(data[key])}")

        # Check if 'outputs' and 'monthly' keys exist in the data
        if 'outputs' in data and 'monthly' in data['outputs']:
            monthly_data = data['outputs']['monthly']
            return monthly_data
        else:
            print("Error: 'outputs' or 'monthly' key not found in the response.")
            return None
    else:
        print("Error:", response.status_code)
        print("Response Content:", response.content.decode('utf-8'))
        return None

def calculate_average_irradiation(data):
    if not data:
        return 0

    total_irradiation = 0
    count = 0

    for entry in data:
        if 'H(h)_m' in entry:
            try:
                # Convert the irradiation value to float and add it to the total
                irradiation_value = float(entry['H(h)_m'])
                total_irradiation += irradiation_value
                count += 1
            except ValueError as e:
                # Skip entries with invalid data and print an error message
                print(f"Skipping entry due to error: {e}, entry content: {entry}")

    # Calculate and return the average irradiation
    if count == 0:
        return 0

    return total_irradiation / count

latitude = 40.437974990337075
longitude = -3.682171303527823
# Horizontal irradiation flag (1 for including, 0 for excluding)
horirrad = 1

# Fetch the solar radiation data
solar_data = fetch_solar_radiation(latitude, longitude, horirrad)

# Calculate the average irradiation from the JSON data
average_irradiation = calculate_average_irradiation(solar_data)

print(f"Average Irradiation (kWh/m2): {average_irradiation:.2f}")
