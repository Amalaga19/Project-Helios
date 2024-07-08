# Barter-Project
## Introduction
Barter Energy is revolutionizing the energy industry by integrating electricity generation and demand through shared solar rooftop installations in a decentralized manner. This project aims to help Barter Energy identify optimal locations for solar panel installations and potential business customers within a specific radius in Madrid.

## Project Objectives and Scope
Our primary objective is to help Barter identify potential energy consumers by providing strategic information of those possible clients near a specific point on a map of Madrid within a 2 to 5 km radius. This project involves detailed area analyses to identify potential customer bases and ideal locations for new installations, adhering to legislative constraints restricting energy sales to a 2km diameter.

## Technical Methodology
Our solution leverages data from two APIs:
1. PVGIS for solar data
2. GeoApify for business locations and details

### Backend
Flask: Serves as the backend framework, providing endpoints for the frontend to fetch data.
SQLAlchemy: Used for database interactions with the Azure-hosted MSSQL database.
Google App Engine: Hosts the backend, ensuring scalability and availability.

### Frontend
React.js: Used to build a dynamic and interactive user interface.
TypeScript: Ensures type safety and robustness in the frontend code.
Next.js: Provides server-side rendering and static site generation for improved performance.
Vercel: Deploys the frontend application, ensuring a fast and reliable user experience.

### Database
Microsoft SQL Server on Azure: Stores places and user data, chosen for its cost efficiency, availability, and performance.

## Setup Instructions
### Prerequisites
Node.js and npm installed
Python 3.9+
Azure account
Google Cloud account

### Backend Setup
1. Clone the repository:
```
git clone https://github.com/yourusername/barter-energy.git
cd barter-energy/backend
```
2. Create a virtual environment and activate it:
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
3. Install the required packages:
```
pip install -r requirements.txt
```
4. Set up environment variables in a .env file:
```
DB_CONNECTION_STRING: "mssql+pyodbc://lbarbion:Corporateproject!@corporateproject.database.windows.net:1433/CorporateProject?driver=ODBC+Driver+18+for+SQL+Server"
SECRET_KEY="your_secret_key"
```

5. Run the application:

python main.py

## Frontend

## Database

To turn longitude and latitude data points into usable coordinates, we need a column that converts those data points into geographical coordinates. After uploading the clean CSV file found in the backend directory, you can use the following command in your SQL code editor to create the desired `LOCATION` column:

-- Change the ID column to bigint to handle larger values
```
ALTER TABLE Places
ALTER COLUMN PLACE_ID BIGINT NOT NULL;
```
-- Add the primary key constraint
```
ALTER TABLE Places
ADD CONSTRAINT PK_Places PRIMARY KEY CLUSTERED (PLACE_ID);
```
-- Add the Location column
```
ALTER TABLE Places ADD Location GEOGRAPHY;
```
-- Populate the Location column with the latitude and longitude values
```
UPDATE Places
SET Location = geography::Point(LATITUDE, LONGITUDE, 4326);
```
-- Create the spatial index on the Location column
```
CREATE SPATIAL INDEX SI_Location ON Places(Location);
```

