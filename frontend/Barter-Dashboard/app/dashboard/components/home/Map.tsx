"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import { categoryColors, getColorForCategory } from './utils';

// Dynamically import react-leaflet to prevent SSR issues
const DynamicMap = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const center: LatLngExpression = [40.4168, -3.7038]; // Madrid coordinates

const fetchCsvData = async () => {
  const response = await fetch('../public/clean_data.csv'); // Ensure this path is correct
  const reader = response.body?.getReader();
  const result = await reader?.read();
  const decoder = new TextDecoder('utf-8');
  const csv = decoder.decode(result?.value);
  return Papa.parse(csv, { header: true }).data;
};

const MapComponent: React.FC = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [radius, setRadius] = useState<number>(2000); // 2km default

  useEffect(() => {
    // Fetch CSV data
    fetchCsvData().then(setBusinesses);
  }, []);

  return (
    <div className="relative" style={{ height: '500px', width: '100%' }}>
      <div className="absolute top-2 left-2 z-10 bg-white p-4 shadow-md rounded-md">
        <label htmlFor="radius">Radius (km): </label>
        <input
          type="range"
          id="radius"
          name="radius"
          min="1"
          max="5"
          step="0.1"
          value={radius / 1000}
          onChange={(e) => setRadius(Number(e.target.value) * 1000)}
        />
      </div>
      <DynamicMap center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {businesses.map((business, idx) => {
          const position: LatLngExpression = [parseFloat(business.latitude), parseFloat(business.longitude)];
          const categories = business.categories.split(',').map(category => category.trim());
          const color = getColorForCategory(categories);

          return (
            <Marker key={idx} position={position}>
              <Popup>
                <div>
                  <h3>{business.name}</h3>
                  <p>Category: {business.categories}</p>
                  <p>Barrio: {business.barrio}</p>
                  <p>Address: {business.address}</p>
                  <p>Longitude: {business.longitude}</p>
                  <p>Latitude: {business.latitude}</p>
                </div>
              </Popup>
              <Circle
                center={position}
                radius={radius}
                color={color}
                fillColor={color}
              />
            </Marker>
          );
        })}
      </DynamicMap>
    </div>
  );
};

export default MapComponent;
