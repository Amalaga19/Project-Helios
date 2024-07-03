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
  const [showModal, setShowModal] = useState(false);

  const handleMapClick = async (e: L.LeafletMouseEvent) => {
    if (Object.values(selectedCategories).every((value) => value === 0)) {
      setShowModal(true);
      return;
    }

    const { lat, lng } = e.latlng;
    setMapCenter([lat, lng]);
    fetchData(lat, lng, selectedCategories);
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
      BARRIO: place.suburb || place.district || "",
      ADDRESS: `${place.street}, ${place.city}, ${place.postcode}`,
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
      const data = await getPlaces(lat, lon, radius, convertCategories(categories));
      const transformedData = transformData(data);
      setLocalBusinesses(transformedData);
      setBusinesses(transformedData);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchData(mapCenter[0], mapCenter[1], selectedCategories);
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

  return (
    <div className="relative" style={{ height: "500px", width: "100%" }}>
      <div className="absolute top-2 left-2 z-10 bg-white p-4 shadow-md rounded-md">
        <label htmlFor="radius">Radius (km): </label>
        <input
          id="radius"
          max="5"
          min="1"
          name="radius"
          step="0.1"
          type="range"
          value={radius / 2000}
          onChange={(e) => {
            const newRadius = Number(e.target.value) * 1000;
            setRadius(newRadius);
            fetchData(mapCenter[0], mapCenter[1], selectedCategories);
          }}
        />
      </div>
      <DynamicMap
        center={mapCenter}
        style={{ height: "100%", width: "100%" }}
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
        console.error("Error fetching solar data:", error);
      }
    };

    fetchSolarData();
  }, [business]);

  return (
    <div>
      <h3>{business.NAME}</h3>
      <p>Categories: {business.categories?.join(", ")}</p>
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