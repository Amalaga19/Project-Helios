# Project Helios


## Introduction
Barter Energy is revolutionizing the energy industry by integrating electricity generation and demand through shared solar rooftop installations in a decentralized manner. This project aims to help Barter Energy identify optimal locations for solar panel installations and potential business customers within a specific radius in Madrid. The deployed version can be accessed by clicking [here](https://project-helios-2024.vercel.app/).

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
4. Set up environment variables in a .env file. In Azure, [create a database in a Microsoft SQL Server](https://learn.microsoft.com/en-us/azure/azure-sql/database/single-database-create-quickstart?view=azuresql&tabs=azure-portal) and format the connection as is in this example:
```
DB_CONNECTION_STRING: "mssql+pyodbc://username:password@database_server_name.database.windows.net:1433/database_name?driver=ODBC+Driver+18+for+SQL+Server"
SECRET_KEY="your_secret_key"
```
For this project we used the following connection string:
```
DB_CONNECTION_STRING: "lbarbion:Corporateproject!@corporateproject.database.windows.net:1433/CorporateProject?driver=ODBC+Driver+18+for+SQL+Server"

```

#### Obtaining, Processing and Uploading the Data to the Database

1. Add your GeoApify API key to your .env file. Name your GeoApify key `API_KEY_GEOAPIFY0`, replacing the `0` with the next numbers if you have multiple keys.
   ```
   API_KEY_GEOAPIFY0="YOUR_KEY_GOES_HERE"
   API_KEY_GEOAPIFY1="YOUR_KEY_GOES_HERE"
   ```
2. Modify the coordinates and parameters of the file `places_data.py` to suit the area that will be searched and run the script. It will take several minutes or even hours. A success message will be printed once the CSV file has been created. The CSV file will be named `all_data.csv` and will be in the same folder as the rest of the scripts. Once modified, run the file with:
```
python places_data.py
```
4. Run the `process_data.py` file, which will create a CSV file that is ready to be uploaded into the database called `clean_data.csv`.
```
python process_data.py
```
6. Load the data to the database by running `load_to_db.py`, it will use the `clean_data.csv` file.
```
python load_to_db.py
```

#### Database

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


##Run the Backend Application:

Enter the following command on your preferred command line or terminal:
```
python main.py
```

## Frontend

The frontend of this applicaiton was built using Next.js, Typescript, and the Next.UI library. 
Below you will find the details on how to set up the run the frontend part of the application. 

### Frotend Description 

The frontend is responsible for the user interface and client-side logic. It interacts with the backend API to fetch and display data, 
providing a responsive and user-friendly experience on computer screens. The use of Next.js ensures server-side rendering and optimized 
performance, while TypeScript provides type safety and a better developer experience.

The frontend application features a top navigation bar, allowing users to quickly navigate between pages. The home page details the 
purpose of the project with three cards explaining the “Why,” “What,” and “How.” The team page provides an overview of our team members 
and their roles in the project.

The Dashboard page, accessible only to logged-in users, offers a detailed dashboard view. Within this dashboard, a map component displays 
circle markers representing businesses within a 2km radius. Users can filter businesses by category, and clicking on a specific marker brings 
up a pop-up with more details (business name, address, longitude, latitude, and category).

For accessibility, a legend on the right side of the map explains the colors used for the markers. Additionally, a table beneath the map lists 
the businesses displayed on the map in text form. Users can download this data as a CSV file for further analysis in their preferred platform.

### Prerequisites 

Ensure you have the following installed before setting up the frontend: 
```
Node.js 
npm or yarn 
```

### Installation 

1. Clone the Git Repository: 

```
git clone https://github.com/yourusername/barter-energy.git
cd barter-energy/frontend
```

2. Navigate to the frontend directory: 

```
cd your-project/frontend
```

3. Install dependencies

```
npm install 
# or
yarn install 
```

### Environment Variables 
The front end requires environment variables to be configured. Create a .env.local file in the frontend directory with the following content: 

```
1. If backend is on cloud: NEXT_PUBLIC_API_URL=https://barter-corporateproject.ew.r.appspot.com/ #or your own link to a deployed backend of this project
2. If the backend is local: NEXT_PUBLIC_API_URL= http://localhost:5000/api
```

### Running the Frontend

To start the front in development mode, use the following command: 

```
npm run dev
# or
yarn dev 
```

These commands start the Next.js development server, which is accessible at http://localhost:3000. The development server supports hot reloading, 
so any changes you make will be reflected immediately. 

### Building for Production 

To build the front for production deployment, run the following: 

```
npm run build
# or
yarn build 
```
These commands create an optimized production build in the .next folder. To start the server use the following: 

```
npm start 
# or
yarn start 
```

These commands will run the application in production mode at http://localhost:3000

### Frontend Scripts 

Here are the available scripts for the frontend, defined in the package.json file: 

```
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

- npm run dev: Stars the development server
- npm run build: Builds the project for production 
- npm start: Starts the production server. 
- npm run lint: Lints the codebase to ensure code quality 

### Project Structure 

Understanding the project structure can help you navigate more effectively: 

### Example of using Next.UI components 

We utilize the Next.UI for building user interfaces. Here is an example of how to integrate a Next.UI component: 

```
import { Button } from '@nextui-org/react';

const ExampleComponent = () => (
  <Button auto color="primary">
    Click Me
  </Button>
);
export default ExampleComponent;
```

###Using the Website


### Acknowledgements

This project was made possible by leveraging the following open-source tools and templates: 

- Next.js
- TypeScript
- Next.UI
- https://github.com/Siumauricio/nextui-dashboard-template
