"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const customIcon = L.icon({
  iconUrl: "/images/marker_black.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapComponentProps {
  startPort: [number, number];
  endPort: [number, number];
}

const MapLeaflet: React.FC<MapComponentProps> = ({ startPort, endPort }) => {
  const center: [number, number] = [15.120963, 108.781383];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={startPort} icon={customIcon}>
        <Popup>Điểm đi: {`[${startPort[0]}, ${startPort[1]}]`}</Popup>
      </Marker>

      <Marker position={endPort} icon={customIcon}>
        <Popup>Điểm đến: {`[${endPort[0]}, ${endPort[1]}]`}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(MapLeaflet), {
  ssr: false,
});
