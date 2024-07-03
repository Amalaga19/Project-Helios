"use client";

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { TileLayer, CircleMarker, Circle, Popup, useMapEvents, MapContainer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getColorForCategory } from './utils';
import { getPlaces, getSolarData } from '@/utils/api';
import { Modal, Button } from 'react-bootstrap'; // Import React-Bootstrap components

// Dynamically import react-leaflet to prevent SSR issues
const DynamicMap = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const center: [number, number] = [40.4168, -3.7038]; // Madrid coordinates

interface MapComponentProps {
  selectedCategories: string[];
  setBusinesses: (businesses: any[]) => void;
}

interface Place {
  name: string;
  latitude: number;
  longitude: number;
  categories: { [key: string]: boolean };
  suburb?: string;
  district?: string;
  street: string;
  city: string;
  postcode: string;
}

interface PlacesData {
  places: Place[];
}

const MapComponent: React.FC<MapComponentProps> = ({ selectedCategories = [], setBusinesses }) => {
  const [localBusinesses, setLocalBusinesses] = useState<any[]>([]);
  const [radius, setRadius] = useState<number>(2000); // 2km default
  const [mapCenter, setMapCenter] = useState<[number, number]>(center); // Center of the map
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    if (selectedCategories.length === 0) {
      setShowModal(true); // Show modal if no categories are selected
      return;
    }

    const { lat, lng } = e.latlng;
    setMapCenter([lat, lng]);
    fetchData(Number(lat.toFixed(6)), Number(lng.toFixed(6)));
  };

  const transformData = (data: PlacesData) => {
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
      const categoryObject = {
        catering: false,
        commercial: false,
        production: false,
        service: false,
        office: false,
        ...selectedCategories.reduce((obj, category) => {
          obj[category] = true;
          return obj;
        }, {} as { [key: string]: boolean })
      };

      const data = await getPlaces(lat, lon, radius, categoryObject);
      const transformedData = transformData(data);
      setLocalBusinesses(transformedData);
      setBusinesses(transformedData); // Update the parent component's state
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
      return localBusinesses;
    }
    return localBusinesses.filter(business =>
      business.categories.some((category: string) => selectedCategories.includes(category))
    );
  }, [localBusinesses, selectedCategories]);

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
          onChange={(e) => {
            const newRadius = Number(e.target.value) * 1000;
            setRadius(newRadius);
            fetchData(mapCenter[0], mapCenter[1]); // Fetch data with new radius
          }}
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
              radius={2} // Adjust the size as needed
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

      {/* Modal for the message */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Business Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please select a business category to proceed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

interface PopupContentProps {
  business: {
    NAME: string;
    LATITUDE: string;
    LONGITUDE: string;
    categories: string[];
    BARRIO: string;
    ADDRESS: string;
  };
}

const PopupContent: React.FC<PopupContentProps> = ({ business }) => {
  const [solarData, setSolarData] = useState<any>(null);

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