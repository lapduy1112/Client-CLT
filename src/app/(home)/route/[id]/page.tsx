"use client";

import MainLayout from "@/app/(home)/MainLayout";
import MapLeaflet from "@/components/MapLeaflet";
import RouteInfo from "@/components/RouteInfo";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Port {
  address: string;
  lat: number;
  lon: number;
}

interface RouteDetail {
  startPort: Port;
  endPort: Port;
  distance: string;
  travelTime: string;
  status: string;
  departureDate: Date;
  arrivalDate: Date;
}

export default function RouteDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [routeDetail, setRouteDetail] = useState<RouteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRouteDetail = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3001/routes/${id}`
          );

          setRouteDetail(response.data);
          // console.log(response.data);
        } catch (err: any) {
          console.error("Error fetching route data", err);
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRouteDetail();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!routeDetail) {
    return (
      <MainLayout>
        <div>No route details found.</div>
      </MainLayout>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleBooking = () => {
    router.push("/booking");
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row justify-between w-full">
          <div className="container mx-auto py-6 px-4">
            <RouteInfo
              from={routeDetail.startPort.address}
              to={routeDetail.endPort.address}
              distance={routeDetail.distance}
              travelTime={routeDetail.travelTime}
              status={routeDetail.status}
              departureDate={routeDetail.departureDate}
              arrivalDate={routeDetail.arrivalDate}
            />
            {/* <button onClick={handleBack} className="mr-2">
              Back
            </button>
            <button onClick={handleBooking}>Book Now</button> */}
          </div>
          <div className="container mx-auto">
            <MapLeaflet
              startPort={[routeDetail.startPort.lat, routeDetail.startPort.lon]}
              endPort={[routeDetail.endPort.lat, routeDetail.endPort.lon]}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
