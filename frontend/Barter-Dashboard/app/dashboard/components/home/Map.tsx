"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TileLayer, Marker, Circle, Popup, useMapEvents, MapContainer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getColorForCategory } from './utils';
import { getPlaces } from '@/utils/api';

// Dynamically import react-leaflet to prevent SSR issues
const DynamicMap = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const center: LatLngExpression = [40.4168, -3.7038]; // Madrid coordinates

const MapComponent: React.FC = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [radius, setRadius] = useState<number>(2000); // 2km default
  const [selectedCategories, setSelectedCategories] = useState({
    catering: 1,
    commercial: 1,
    production: 1,
    service: 1,
    office: 1
  });

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    fetchData(Number(lat.toFixed(6)), Number(lng.toFixed(6)));
  };

  const fetchData = async (lat: number, lon: number) => {
    try {
      const data = await getPlaces(lat, lon, radius, selectedCategories);
      setBusinesses(data.places);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  // Use a wrapper component to handle map events
  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

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
        <MapEvents /> {/* Add MapEvents component here */}
        {businesses.map((business, idx) => {
          const position: LatLngExpression = [parseFloat(business.LATITUDE), parseFloat(business.LONGITUDE)];
          const categories = business.categories?.split(',').map(category => category.trim());
          const color = getColorForCategory(categories);

          return (
            <Marker key={idx} position={position}>
              <Popup>
                <div>
                  <h3>{business.NAME}</h3>
                  <p>Categories: {categories?.join(', ')}</p>
                  <p>Barrio: {business.BARRIO}</p>
                  <p>Address: {business.ADDRESS}</p>
                  <p>Longitude: {business.LONGITUDE}</p>
                  <p>Latitude: {business.LATITUDE}</p>
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
