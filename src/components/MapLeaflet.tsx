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
  startPosition: [number, number];
  endPosition: [number, number];
}

const MapLeaflet: React.FC<MapComponentProps> = ({
  startPosition,
  endPosition,
}) => {
  const center: [number, number] = [
    (startPosition[0] + endPosition[0]) / 2,
    (startPosition[1] + endPosition[1]) / 2,
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={startPosition} icon={customIcon}>
        <Popup>Điểm đi: {`[${startPosition[0]}, ${startPosition[1]}]`}</Popup>
      </Marker>

      <Marker position={endPosition} icon={customIcon}>
        <Popup>Điểm đến: {`[${endPosition[0]}, ${endPosition[1]}]`}</Popup>
      </Marker>
    </MapContainer>
  );
};

// sửa lỗi chạy window trong môi trường SSR
export default dynamic(() => Promise.resolve(MapLeaflet), {
  ssr: false,
});
