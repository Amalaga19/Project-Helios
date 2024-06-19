import requests
import csv

def fetch_solar_radiation_csv(lat, lon, horirrad, output_file):
    base_url = "https://re.jrc.ec.europa.eu/api/MRcalc"
    # Parameters for  the API request
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
            
            # Open CSV file for writing
            with open(output_file, 'w', newline='') as file:
                writer = csv.writer(file)
                
                # Write the header row to the CSV
                writer.writerow(["year", "month", "H(h)_m"])
                
                # Write the data rows to the CSV
                for entry in monthly_data:
                    writer.writerow([entry.get('year'), entry.get('month'), entry.get('H(h)_m')])
            
            print(f"Data fetched and saved to {output_file} successfully.")
        else:
            print("Error: 'outputs' or 'monthly' key not found in the response.")
    else:
        print("Error:", response.status_code)
        print("Response Content:", response.content.decode('utf-8'))

latitude = 40.437974990337075
longitude = -3.682171303527823
# Horizontal irradiation flag (1 for including, 0 for excluding)
horirrad = 1

output_file = 'solar_radiation_data.csv'

fetch_solar_radiation_csv(latitude, longitude, horirrad, output_file)

def calculate_average_irradiation(csv_file):
    total_irradiation = 0
    count = 0

    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header row

        for row in reader:
            if len(row) == 3:
                try:
                    # Convert the irradiation value to float and add it to the total
                    irradiation_value = float(row[2])
                    total_irradiation += irradiation_value
                    count += 1
                except ValueError as e:
                    # Skip rows with invalid data and print an error message
                    print(f"Skipping row due to error: {e}, row content: {row}")

    # Calculate and return the average irradiation
    if count == 0:
        return 0

    return total_irradiation / count

# Calculate the average irradiation from the CSV data
average_irradiation = calculate_average_irradiation(output_file)

print(f"Average Irradiation (kWh/m²): {average_irradiation:.2f}")
