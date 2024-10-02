"use client";

import MainLayout from "@/app/(home)/MainLayout";
import MapLeaflet from "@/components/MapLeaflet";
import RouteInfo from "@/components/RouteInfo";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box, Button } from "@mui/material";
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
            `http://localhost:3001/routes/${id}`,
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={60} />
        </Box>
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
            <div className="flex justify-center mt-4">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  backgroundColor: "#007BFF",
                  padding: "12px 24px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                Booking
              </Button>
            </div>
          </div>

          <div className="container mx-auto pt-5">
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
