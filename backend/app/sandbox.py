# import requests

# # Define the API endpoint and your API key
# url = "https://api.goolzoom.com/v1/cadastre/provinces"
# api_key = "BoLL4cJLt74PrIY62z9Qz5srA9wAzH6P9WDFxwkL"

# # Set up the headers with the API key
# headers = {
#     "x-api-key": api_key
# }

# # Make the GET request
# response = requests.get(url, headers=headers)

# # Check if the request was successful
# if response.status_code == 200:
#     data = response.json()
#     print(data)
# else:
#     print(f"Request failed with status code: {response.status_code}")

import requests
import json
import pandas as pd


def get_json_data(url, chunk_size=1024, error_limit=3, timeout=10, max_retries=3):
    """Downloads a JSON file from a URL in chunks, with robust error handling and data summary.

    Args:
        url: The URL of the JSON file.
        chunk_size: The size of the chunks to download in bytes.
        error_limit: The maximum number of consecutive parsing errors allowed.
        timeout: The maximum number of seconds to wait for a server response.
        max_retries: The maximum number of retries to attempt download in case of errors.

    Returns:
        A dictionary containing the JSON data, or None if an error occurs after retries.
    """

    errors = 0
    data = {}
    num_chunks = 0

    for attempt in range(1, max_retries + 1):
        try:
            response = requests.get(url, stream=True, timeout=timeout)
            response.raise_for_status()

            for chunk in response.iter_content(chunk_size):
                num_chunks += 1
                if chunk:  # filter out keep-alive new chunks
                    try:
                        data.update(json.loads(chunk))
                        errors = 0  # Reset error counter on successful parse
                    except json.JSONDecodeError:
                        errors += 1
                        if errors >= error_limit:
                            print(f"Reached error limit ({error_limit}) while parsing JSON from {url}.")
                            return None

            # Download successful, break out of retry loop
            break

        except (requests.exceptions.RequestException, TimeoutError) as e:
            print(f"Error downloading JSON from {url} (attempt {attempt}/{max_retries}): {e}")
            if attempt == max_retries:
                print(f"Failed to download JSON after {max_retries} attempts.")
                return None

    # Calculate and print estimated total size (human-readable units)
    total_size_bytes = num_chunks * chunk_size
    total_size_kb = total_size_bytes / 1024
    total_size_mb = total_size_kb / 1024
    total_size_gb = total_size_mb / 1024

    if total_size_gb >= 1:
        print(f"Estimated total downloaded data size: {total_size_gb:.2f} GB")
    elif total_size_mb >= 1:
        print(f"Estimated total downloaded data size: {total_size_mb:.2f} MB")
    else:
        print(f"Estimated total downloaded data size: {total_size_kb:.2f} KB")

    # Print the downloaded data dictionary
    print("\nDownloaded Data:")
    print(data)

    # Data Description using pandas (assuming data is a dictionary)
    if isinstance(data, dict):
        print("\nData Description:")

        try:
            # Convert data to a pandas DataFrame (if possible)
            df = pd.DataFrame(data)

            # Print total rows
            print(f"Total rows: {len(df)}")

            # Explore some basic information about the data
            print(df.info())

            # Print column names and data types
            print("\nColumn Names and Data Types:")
            print(df.dtypes)

            # Check for missing values (optional)
            # print("\nMissing Values:")
            # print(df.isnull().sum())

            # Explore descriptive statistics for numerical columns (optional)
            # print("\nDescriptive Statistics:")
            # print(df.describe(include='all'))

        except (ValueError, KeyError) as e:
            print(f"Error converting data to pandas DataFrame: {e}")

    return data


# Example usage
url = "https://servicios.ine.es/wstempus/js/ES/SERIE/CENSO1568062"
data = get_json_data(url, error_limit=5, timeout=10, max_retries=3)

if data:
    # You can now process the data further (e.g., perform more in-depth EDA)
    pass
else:
    print("Failed to download JSON data.")
