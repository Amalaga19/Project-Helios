import pandas as pd
#Load the 5 CSVs
file_name_1 = 'backend/app/catering.csv'
file_name_2 = 'backend/app/businesses.csv'
file_name_3 = 'backend/app/offices.csv'
file_name_4 = 'backend/app/production.csv'
file_name_5 = 'backend/app/services.csv'

file_name_list = [file_name_1, file_name_2, file_name_3, file_name_4, file_name_5]

# Load the CSVs into dataframes
df_list = [pd.read_csv(file_name) for file_name in file_name_list]

# Concatenate the dataframes without duplicate IDs
df = pd.concat(df_list).drop_duplicates(subset=['id'])
#Order by ID number
df = df.sort_values(by='id')

# Save the concatenated dataframe to a new CSV file
df.to_csv('backend/app/all_data.csv', index=False)