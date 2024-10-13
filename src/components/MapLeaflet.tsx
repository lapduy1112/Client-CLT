"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
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

  const startLat =
    typeof startPort[0] === "number" ? startPort[0] : parseFloat(startPort[0]);
  const startLon =
    typeof startPort[1] === "number" ? startPort[1] : parseFloat(startPort[1]);
  const endLat =
    typeof endPort[0] === "number" ? endPort[0] : parseFloat(endPort[0]);
  const endLon =
    typeof endPort[1] === "number" ? endPort[1] : parseFloat(endPort[1]);

  if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon)) {
    console.error("Invalid coordinates:", { startPort, endPort });
    return null;
  }

  const createCurvePoints = (
    start: [number, number],
    end: [number, number],
    steps: number
  ): [number, number][] => {
    const points: [number, number][] = [];
    const deltaLat = (end[0] - start[0]) / steps;
    const deltaLon = (end[1] - start[1]) / steps;

    for (let i = 0; i <= steps; i++) {
      const lat = start[0] + deltaLat * i;
      const lon = start[1] + deltaLon * i;
      points.push([lat, lon + Math.sin((i / steps) * Math.PI) * 0.4]);
    }

    return points;
  };

  const positions: [number, number][] = createCurvePoints(
    [startLat, startLon],
    [endLat, endLon],
    20
  );

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={[startLat, startLon]} icon={customIcon}>
        <Popup>Điểm đi: {`[${startLat}, ${startLon}]`}</Popup>
      </Marker>

      <Marker position={[endLat, endLon]} icon={customIcon}>
        <Popup>Điểm đến: {`[${endLat}, ${endLon}]`}</Popup>
      </Marker>

      <Polyline positions={positions} color="blue" weight={3} />
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(MapLeaflet), {
  ssr: false,
});
