"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const customIcon = L.icon({
  iconUrl: "/images/marker_black.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapComponentProps {
  lat: number;
  lon: number;
}

const PortMap: React.FC<MapComponentProps> = ({ lat, lon }) => {
  const center: [number, number] = [lat, lon];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <MapContainer center={center} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={center} icon={customIcon}>
          <Popup>{`[Lat: ${lat}, Lon: ${lon}]`}</Popup>
        </Marker>
      </MapContainer>
    )
  );
};

export default dynamic(() => Promise.resolve(PortMap), {
  ssr: false,
});
