import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TileLayer, Marker, Circle } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';

// Dynamically import react-leaflet to prevent SSR issues
const DynamicMap = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const center: LatLngExpression = [40.4168, -3.7038]; // Madrid coordinates

const fetchCsvData = async (filePath: string) => {
  const response = await fetch(filePath);
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
    fetchCsvData('../backend/app/services.csv').then(setBusinesses);
  }, []);

  return (
    <div className="relative" style={{ height: '500px', width: '100%' }}>
      <div className="absolute top-2 left-2 z-10 bg-white p-4 shadow-md rounded-md">
        <label htmlFor="radius">Radius (km): </label>
        <input
          type="range"
          id="radius"
          name="radius"
          min="0"
          max="5"
          step="0.1"
          value={radius / 1000}
          onChange={(e) => setRadius(Number(e.target.value) * 1000)}
        />
        <div className="mt-4">
          <h4>Filters (coming soon):</h4>
          <p>Filter 1</p>
          <p>Filter 2</p>
          <p>Filter 3</p>
        </div>
      </div>
      <DynamicMap center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {businesses.map((business, idx) => (
          <Marker
            key={idx}
            position={[parseFloat(business.latitude), parseFloat(business.longitude)] as LatLngExpression}
            icon={L.icon({
              iconUrl: '/marker.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Circle
              center={[parseFloat(business.latitude), parseFloat(business.longitude)] as LatLngExpression}
              radius={radius}
              color="blue"
            />
          </Marker>
        ))}
      </DynamicMap>
    </div>
  );
};

export default MapComponent;