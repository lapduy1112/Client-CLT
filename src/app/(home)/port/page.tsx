"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PublicIcon from "@mui/icons-material/Public";
import { blue, grey, green } from "@mui/material/colors";
import MainLayout from "../MainLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { getPorts, searchPorts } from "@/services/api";

export default function PortPage() {
  const [ports, setPorts] = useState<any[]>([]);
  const [filteredPorts, setFilteredPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const fetchedPorts = await getPorts();
        setPorts(fetchedPorts);
        setFilteredPorts(fetchedPorts);
        setLoading(false);
        console.log(fetchedPorts);
      } catch (error) {
        console.error("Error fetching Ports:", error);
        setLoading(false);
      }
    };
    fetchPorts();
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      router.push(`/port?search=${searchQuery}`);
    }
  };
  useEffect(() => {
    const fetchSearchedPorts = async () => {
      const searchParam = searchParams.get("search") || "";
      if (searchParam) {
        try {
          const fetchedPorts = await searchPorts(searchParam);
          setFilteredPorts(fetchedPorts || []);
          console.log(fetchedPorts);
        } catch (error) {
          console.error("Error fetching searched Ports:", error);
          setFilteredPorts([]);
        }
      } else {
        setFilteredPorts(ports);
      }
    };

    fetchSearchedPorts();
  }, [searchParams, ports]);

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
  return (
    <MainLayout>
      <Box padding="24px">
        <div className="flex items-center justify-between space-x-4 pb-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Ports List
            </h2>
            <span>
              You can browse our direct ports here or you can find the schedule
              which fits your supply chain.
            </span>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search port..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>

        {filteredPorts.length > 0 ? (
          filteredPorts.map((port, index) => (
            <Card
              key={index}
              style={{
                backgroundColor: blue[50],
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                marginBottom: "20px",
                fontFamily: "'Roboto', sans-serif",
              }}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  style={{ fontWeight: "bold", marginBottom: 16 }}>
                  Port of {port.address}
                </Typography>
                <Divider />
                <Box mt={3} className="space-y-4">
                  <Box
                    display="flex"
                    alignItems="center"
                    className="text-gray-700">
                    <LocationOnIcon
                      style={{ marginRight: 8, color: blue[600] }}
                    />
                    <Typography
                      variant="body1"
                      className="font-semibold"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: grey[800],
                      }}>
                      <strong>Address:</strong> {port.address}, Viet Nam
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    className="text-gray-700">
                    <MyLocationIcon
                      style={{ marginRight: 8, color: blue[600] }}
                    />
                    <Typography
                      variant="body1"
                      className="font-semibold"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: grey[800],
                      }}>
                      <strong>Longitude:</strong> {port.lon}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    className="text-gray-700">
                    <MyLocationIcon
                      style={{ marginRight: 8, color: blue[600] }}
                    />
                    <Typography
                      variant="body1"
                      className="font-semibold"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: grey[800],
                      }}>
                      <strong>Latitude:</strong> {port.lat}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    className="text-gray-700">
                    <PublicIcon style={{ marginRight: 8, color: blue[600] }} />
                    <Typography
                      variant="body1"
                      className="font-semibold"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: green[500],
                      }}>
                      <strong>Status:</strong> Active
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No ports found.
            </Typography>
          </Grid>
        )}
      </Box>
    </MainLayout>
  );
}
