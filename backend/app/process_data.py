import pandas as pd
import numpy as np
from geoalchemy2 import WKTElement

# Load the data
df = pd.read_csv("all_data.csv", encoding="utf-8")
# Split the categories into a list, remove brackets from the strings that have them and the single quotation marks too
df["categories"] = df["categories"].str.replace("[", "").str.replace("]", "").str.replace("'","").str.split(", ")
df_cats = df.explode("categories")
categories = df_cats.categories.unique()
#Create a dictionary with all the main categories (before the dot) as keys and a list of all the subcategories as values
categories_dict = {}
for cat in categories:
    main_cat = cat.split(".")[0]
    #Throw out the categories that have more than one dot
    if len(cat.split(".")) > 2:
        continue
    if main_cat in categories_dict:
        categories_dict[main_cat].append(cat)
    else:
        categories_dict[main_cat] = [cat]
#From each key in the dictionary, remove all the values that do not have a period in them
for key in categories_dict:
    categories_dict[key] = [cat for cat in categories_dict[key] if "." in cat]
new_cats_dict = {k: v for k, v in categories_dict.items() if k in ["commercial", "production", "office", "service", "catering"]}
df2 = pd.read_csv("all_data.csv", encoding="utf-8")
#Remove the category list because the final dataframe will look different
df3 = df2.drop(columns="categories")
#From df2.categories, remove the brackets and the single quotation marks and split the strings into lists.
df2["categories"] = df2["categories"].str.replace("[", "").str.replace("]", "").str.replace("'","").str.split(", ")

#in the categories column, only keep those in the new_cats_dict keys or values
df2["categories"] = df2["categories"].apply(lambda x : [cat for cat in x if (any([cat in new_cats_dict[key] for key in new_cats_dict])) or (any ([cat in new_cats_dict]))])

#Create a new column for each key in the new_cats_dict and assign 1 if any of the values in the list are in the categories column, 0 otherwise

df_new_cats = pd.DataFrame()

for key in new_cats_dict:
    df_new_cats[key] = df2["categories"].apply(lambda x: 1 if any([cat in x for cat in new_cats_dict[key]]) else 0)

#create a column for every subcategory in the new_cats_dict and assign 1 if the subcategory is in the categories column, 0 otherwise
df_subcats = pd.DataFrame()

for key in new_cats_dict:
    for cat in new_cats_dict[key]:
        df_subcats[cat] = df2["categories"].apply(lambda x: 1 if cat in x else 0)
#The 0s and 1s in the columns are strings, I need 1 to be true and 0 to be false

df_new_cats = df_new_cats.astype(bool)
df_subcats = df_subcats.astype(bool)

df_clean_data = pd.concat([df3, df_new_cats, df_subcats], axis=1)

#Make the column names all caps
df_clean_data.columns = df_clean_data.columns.str.upper()
df_clean_data.rename(columns={"ID": "PLACE_ID"}, inplace=True)
df_clean_data.columns = df_clean_data.columns.str.replace(".", "_")
df_clean_data.fillna("", inplace=True)

df_clean_data.head()
#Replace accented characters with non-accented characters throughout the dataframe in the columns where the values are strings, example "é" with "e"
df_clean_data = df_clean_data.apply(lambda x: x.str.normalize("NFKD").str.encode("ascii", errors="ignore").str.decode("utf-8") if x.dtype == "object" else x)

df_clean_data["LOCATION"] = df_clean_data.apply(lambda x: WKTElement(f'POINT({x["LONGITUDE"]} {x["LATITUDE"]})', srid=4326), axis=1).astype(str)

#Save the data
df_clean_data.to_csv("clean_data.csv", index=False)