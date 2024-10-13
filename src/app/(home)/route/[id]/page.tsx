"use client";

import MainLayout from "@/app/(home)/MainLayout";
import MapLeaflet from "@/components/MapLeaflet";
import RouteInfo from "@/components/RouteInfo";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box, Button } from "@mui/material";
import { useStore } from "@/providers/ZustandProvider";
import { createBooking } from "@/services/api";
import { toast } from "react-toastify";
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
  const user = useStore((state) => state.user);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [routeDetail, setRouteDetail] = useState<RouteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // console.log(user);
  useEffect(() => {
    const fetchRouteDetail = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/route-api/routes/${id}`
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
          height="100vh">
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

  const handleBooking = async () => {
    if (!user || !user.id) {
      toast.error("User not found or not logged in.");
      return;
    }
    if (!user || !user.isVerified) {
      toast.error("You must verify your email.");
      return;
    }
    if (routeDetail.status !== "Available") {
      toast.error("This route is not available for booking.");
      return;
    }
    try {
      await createBooking(id, user.id);
      toast.success("Booking created successfully!");
      // router.push("/history");
    } catch (error) {
      console.log(error);

      toast.error("Failed to create booking.");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row justify-between w-full px-4">
          <div className="flex-1 container mx-auto pt-5 px-4 h-full">
            <div className="h-full">
              <MapLeaflet
                startPort={[
                  routeDetail.startPort.lat,
                  routeDetail.startPort.lon,
                ]}
                endPort={[routeDetail.endPort.lat, routeDetail.endPort.lon]}
              />
            </div>
          </div>
          <div className="flex-1 container mx-auto py-6 px-4 h-full">
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
                onClick={handleBooking}
                sx={{
                  backgroundColor: "#0e243c",
                  padding: "12px 24px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}>
                Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
