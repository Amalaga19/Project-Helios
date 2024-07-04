import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Modal, Button } from "react-bootstrap";
import { getPlaces, getSolarData } from "@/utils/api";
import { getColorForCategory } from "./utils";

const DynamicMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const center: [number, number] = [40.4168, -3.7038]; // Madrid coordinates

interface MapComponentProps {
  selectedCategories: { [key: string]: number };
  setSelectedCategories: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  setBusinesses: (businesses: any[]) => void;
}

interface Place {
  name: string;
  latitude: number;
  longitude: number;
  categories: { [key: string]: boolean };
  suburb?: string;
  neighbourhood?: string;
  district?: string;
  street: string;
  city: string;
  postcode: string;
}

interface PlacesData {
  places: Place[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  selectedCategories,
  setSelectedCategories,
  setBusinesses,
}) => {
  const [localBusinesses, setLocalBusinesses] = useState<any[]>([]);
  const [radius, setRadius] = useState<number>(2000);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSolarModal, setShowSolarModal] = useState(false);
  const [solarData, setSolarData] = useState<any>(null);
  const [clickedLocation, setClickedLocation] = useState<[number, number] | null>(null);

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    if (Object.values(selectedCategories).every((value) => value === 0)) {
      setShowCategoryModal(true);
      return;
    }
    const { lat, lng } = e.latlng;
    setClickedLocation([lat, lng]);
    fetchSolarData(lat, lng);
  };

  const fetchSolarData = async (lat: number, lng: number) => {
    try {
      const data = await getSolarData(lat, lng);
      setSolarData(data);
      setShowSolarModal(true);
    } catch (error) {
      console.error("Error fetching solar data:", error);
    }
  };

  const handleCategoryClick = (category: string) => {
    const updatedCategories = { ...selectedCategories };
    updatedCategories[category] = updatedCategories[category] ? 0 : 1;
    setSelectedCategories(updatedCategories);
    fetchData(mapCenter[0], mapCenter[1], updatedCategories);
  };

  const transformData = (data: PlacesData) => {
    return data.places.map((place) => ({
      NAME: place.name,
      LATITUDE: place.latitude.toString(),
      LONGITUDE: place.longitude.toString(),
      categories: Object.keys(place.categories).filter(
        (key) => place.categories[key]
      ),
      BARRIO: place.suburb || place.neighbourhood || place.district || "",
      LOCATION: `${place.street}, ${place.city}, ${place.postcode}`,
    }));
  };

  const convertCategories = (categories: { [key: string]: number }) => {
    return {
      catering: !!categories.catering,
      commercial: !!categories.commercial,
      production: !!categories.production,
      service: !!categories.service,
      office: !!categories.office,
    };
  };

  const fetchData = async (
    lat: number,
    lon: number,
    categories: { [key: string]: number }
  ) => {
    console.log("Categories received:", categories);

    try {
      const data = await getPlaces(lat, lon, convertCategories(categories));
      const transformedData = transformData(data);
      setLocalBusinesses(transformedData);
      setBusinesses(transformedData);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    if (Object.values(selectedCategories).some((value) => value === 1)) {
      fetchData(mapCenter[0], mapCenter[1], selectedCategories);
    }
  }, [mapCenter, selectedCategories]);

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const filteredBusinesses = useMemo(() => {
    return localBusinesses;
  }, [localBusinesses]);

  const modalStyles = {
    dark: {
      backgroundColor: '#1a202c', // Dark background color
      color: '#f7fafc', // Light text color
      border: '1px solid #2d3748', // Border color
      borderRadius: '0.5rem',
      padding: '1rem',
    },
    light: {
      backgroundColor: '#f7fafc', // Light background color
      color: '#1a202c', // Dark text color
      border: '1px solid #e2e8f0', // Border color
      borderRadius: '0.5rem',
      padding: '1rem',
    },
    button: {
      border: '1px solid',
      textAlign: 'center' as const,
      display: 'block',
      margin: '0 auto',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#2d3748', // Darker background color on hover
      borderColor: '#4a5568', // Darker border color on hover
      color: '#f7fafc', // Light text color on hover
    }
  };

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <div className="relative" style={{ height: "500px", width: "100%" }}>
      <DynamicMap
        center={mapCenter}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <Circle
          center={mapCenter}
          color="grey"
          fillColor="grey"
          fillOpacity={0.5}
          radius={radius}
        />

        {filteredBusinesses.map((business, idx) => {
          const position: [number, number] = [
            parseFloat(business.LATITUDE),
            parseFloat(business.LONGITUDE),
          ];
          const color = getColorForCategory(business.categories);

          return (
            <CircleMarker
              key={`${business.NAME}-${idx}`}
              center={position}
              color={color}
              fillColor={color}
              fillOpacity={0.8}
              radius={2}
            >
              <Popup>
                <PopupContent business={business} />
              </Popup>
            </CircleMarker>
          );
        })}
      </DynamicMap>

      <Modal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        centered
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          width: '100%',
          zIndex: 1000,
          ...isDarkMode ? modalStyles.dark : modalStyles.light,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          border: 'none',
        }}
        backdrop="static"
      >
        <div style={{ ...isDarkMode ? modalStyles.dark : modalStyles.light, border: 'none' }}>
          <Modal.Header closeButton style={{ textAlign: 'center', borderBottom: 'none' }}>
            <Modal.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Select Business Category</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center" style={{ borderBottom: 'none' }}>
            Please select one or more business categories to proceed.
          </Modal.Body>
          <Modal.Footer style={{ textAlign: 'center', borderTop: 'none', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Button 
              variant="secondary" 
              onClick={() => setShowCategoryModal(false)} 
              style={{ ...modalStyles.button, ...isDarkMode ? { borderColor: '#f7fafc' } : { borderColor: '#1a202c' } }}
              onMouseOver={(e) => { 
                e.currentTarget.style.backgroundColor = modalStyles.buttonHover.backgroundColor; 
                e.currentTarget.style.borderColor = modalStyles.buttonHover.borderColor; 
                e.currentTarget.style.color = modalStyles.buttonHover.color; 
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.backgroundColor = ''; 
                e.currentTarget.style.borderColor = ''; 
                e.currentTarget.style.color = ''; 
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal
        show={showSolarModal}
        onHide={() => setShowSolarModal(false)}
        centered
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          width: '100%',
          zIndex: 1000,
          ...isDarkMode ? modalStyles.dark : modalStyles.light,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          border: 'none',
        }}
        backdrop="static"
      >
        <div style={{ ...isDarkMode ? modalStyles.dark : modalStyles.light, border: 'none' }}>
          <Modal.Header closeButton style={{ textAlign: 'center', borderBottom: 'none' }}>
            <Modal.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Solar Data</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center" style={{ borderBottom: 'none' }}>
            <h4>Average Monthly Solar Radiation for the Area:</h4>
            <p>{solarData?.radiation} KWh/m²</p>
            <p>Do you want to proceed with the search?</p>
          </Modal.Body>
          <Modal.Footer style={{ textAlign: 'center', borderTop: 'none', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
            <Button 
              variant="secondary" 
              onClick={() => setShowSolarModal(false)} 
              style={{ ...modalStyles.button, ...isDarkMode ? { borderColor: '#f7fafc' } : { borderColor: '#1a202c' } }}
              onMouseOver={(e) => { 
                e.currentTarget.style.backgroundColor = modalStyles.buttonHover.backgroundColor; 
                e.currentTarget.style.borderColor = modalStyles.buttonHover.borderColor; 
                e.currentTarget.style.color = modalStyles.buttonHover.color; 
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.backgroundColor = ''; 
                e.currentTarget.style.borderColor = ''; 
                e.currentTarget.style.color = ''; 
              }}
            >
              No
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (clickedLocation) {
                  setMapCenter(clickedLocation);
                  setShowSolarModal(false);
                }
              }}
              style={{ ...modalStyles.button, ...isDarkMode ? { borderColor: '#f7fafc' } : { borderColor: '#1a202c' } }}
              onMouseOver={(e) => { 
                e.currentTarget.style.backgroundColor = modalStyles.buttonHover.backgroundColor; 
                e.currentTarget.style.borderColor = modalStyles.buttonHover.borderColor; 
                e.currentTarget.style.color = modalStyles.buttonHover.color; 
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.backgroundColor = ''; 
                e.currentTarget.style.borderColor = ''; 
                e.currentTarget.style.color = ''; 
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </div>
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
    LOCATION: string;
  };
}

const PopupContent: React.FC<PopupContentProps> = ({ business }) => {
  return (
    <div>
      <h3>{business.NAME}</h3>
      <p>Categories: {business.categories?.join(", ")}</p>
      <p>Barrio: {business.BARRIO}</p>
      <p>Location: {business.LOCATION}</p>
      <p>Longitude: {business.LONGITUDE}</p>
      <p>Latitude: {business.LATITUDE}</p>
    </div>
  );
};

export default MapComponent;