"use client";

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { TileLayer, CircleMarker, Circle, Popup, useMapEvents, MapContainer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getColorForCategory } from './utils';
import { getPlaces, getSolarData } from '@/utils/api';

// Dynamically import react-leaflet to prevent SSR issues
const DynamicMap = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const center: LatLngExpression = [40.4168, -3.7038]; // Madrid coordinates

const MapComponent = ({ selectedCategories = [] }) => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [radius, setRadius] = useState<number>(2000); // 2km default
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(center); // Center of the map

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setMapCenter([lat, lng]);
    fetchData(Number(lat.toFixed(6)), Number(lng.toFixed(6)));
  };

  const transformData = (data) => {
    return data.places.map(place => {
      const categories = Object.keys(place.categories)
        .filter(key => place.categories[key]); // Keeping categories as an array

      return {
        NAME: place.name,
        LATITUDE: place.latitude.toString(),
        LONGITUDE: place.longitude.toString(),
        categories: categories,
        BARRIO: place.suburb || place.district || '',
        ADDRESS: `${place.street}, ${place.city}, ${place.postcode}`
      };
    });
  };

  const fetchData = async (lat: number, lon: number) => {
    try {
      const data = await getPlaces(lat, lon, radius, selectedCategories);
      const transformedData = transformData(data);
      setBusinesses(transformedData);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  useEffect(() => {
    fetchData(mapCenter[0], mapCenter[1]);
  }, [selectedCategories, mapCenter]);

  // Use a wrapper component to handle map events
  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  // Filter businesses by selected categories
  const filteredBusinesses = useMemo(() => {
    if (!Array.isArray(selectedCategories) || selectedCategories.length === 0) {
      return businesses;
    }
    return businesses.filter(business =>
      business.categories.some(category => selectedCategories.includes(category))
    );
  }, [businesses, selectedCategories]);

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
          value={radius / 2000}
          onChange={(e) => setRadius(Number(e.target.value) * 1000)}
        />
      </div>
      <DynamicMap center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        <Circle
          center={mapCenter}
          radius={radius}
          color="grey"
          fillColor="grey"
          fillOpacity={0.5}
        />

        {filteredBusinesses.map((business, idx) => {
          const position: LatLngExpression = [parseFloat(business.LATITUDE), parseFloat(business.LONGITUDE)];
          const color = getColorForCategory(business.categories);
          console.log(`Business: ${business.NAME}, Categories: ${business.categories.join(', ')}, Color: ${color}`);

          return (
            <CircleMarker
              key={`${business.NAME}-${idx}`} // Ensure unique key
              center={position}
              radius={3} // Adjust the size as needed
              color={color}
              fillColor={color}
              fillOpacity={0.8}
            >
              <Popup>
                <PopupContent business={business} />
              </Popup>
            </CircleMarker>
          );
        })}
      </DynamicMap>
    </div>
  );
};

const PopupContent = ({ business }) => {
  const [solarData, setSolarData] = useState(null);

  useEffect(() => {
    const fetchSolarData = async () => {
      try {
        const data = await getSolarData(business.LATITUDE, business.LONGITUDE);
        setSolarData(data);
      } catch (error) {
        console.error('Error fetching solar data:', error);
      }
    };

    fetchSolarData();
  }, [business]);

  return (
    <div>
      <h3>{business.NAME}</h3>
      <p>Categories: {business.categories?.join(', ')}</p>
      <p>Barrio: {business.BARRIO}</p>
      <p>Address: {business.ADDRESS}</p>
      <p>Longitude: {business.LONGITUDE}</p>
      <p>Latitude: {business.LATITUDE}</p>
      {solarData && (
        <>
          <h4>Solar Data:</h4>
          <p>{JSON.stringify(solarData)}</p>
        </>
      )}
    </div>
  );
};

export default MapComponent;