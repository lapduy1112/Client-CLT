"use client";
import Link from "next/link";
import MainLayout from "../MainLayout";
import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Paper, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoutes, searchRoutes } from "@/services/api";
import Pagination from "@/components/route/Pagination";
import Search from "@/components/route/Search";
import OrderSelector from "@/components/route/OrderSelector";

interface Port {
  id: string;
  address: string;
}

interface Route {
  id: string;
  startPort: Port;
  endPort: Port;
  distance: number;
  departureDate: Date;
  arrivalDate: Date;
  travelTime: number;
  status: string;
}

interface RouteResponse {
  data: Route[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export default function RoutePage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const router = useRouter();
  const routePerPage = 9;

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const searchParam = searchParams.get("search") || "";
        const pageParam = searchParams.get("page") || "1";
        const page = parseInt(pageParam, 10);

        const fetchedRoutes: RouteResponse = searchParam
          ? await searchRoutes(
              searchParam,
              page,
              routePerPage,
              sortBy,
              sortOrder
            )
          : await getRoutes(page, routePerPage, sortBy, sortOrder);

        setRoutes(fetchedRoutes.data);
        setFilteredRoutes(fetchedRoutes.data);
        setTotalPages(fetchedRoutes.lastPage);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [searchParams, sortBy, sortOrder]);
  const handleSearch = () => {
    setLoading(true);
    if (searchQuery.trim() === "") {
      router.push("/route");
    } else {
      router.push(`/route?search=${searchQuery}&page=1`);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
    const handleNextPage = () => {
    setLoading(true);
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setLoading(true);
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  const handlePageChange = (page: number) => {
    setLoading(true);
    if (searchQuery) {
      router.push(`/route?search=${searchQuery}&page=${page}`);
    } else {
      router.push(`/route?page=${page}`);
    }
  };

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setLoading(true);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
    handlePageChange(1);
  };

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
      <Box className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <Typography
              variant="h4"
              component="h2"
              className="font-bold tracking-tight text-gray-900">
              Route Available
            </Typography>
            <Typography variant="body2">
              You can browse our direct routes here or you can find the schedule
              which fits your supply chain.
            </Typography>
            <div className="mt-4">
              <Search
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onSearch={handleSearch}
              />
            </div>
          </div>
          <div className="relative inline-block text-left">
            <OrderSelector onSortChange={handleSortChange} />
          </div>
        </div>
        <Grid
          container
          spacing={3}
          style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <Grid item xs={12} sm={6} lg={4} key={route.id}>
                <Link href={`/route/${route.id}`} passHref>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "16px",
                      cursor: "pointer",
                      backgroundColor: "#f7f7f0",
                      position: "relative",
                    }}>
                    {/* Status tag triangle */}
                    <Box
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 0,
                        height: 0,
                        borderTop: "70px solid #ffcccb",
                        borderLeft: "70px solid transparent",
                        zIndex: 1,
                      }}>
                      <Typography
                        style={{
                          position: "absolute",
                          top: "-51px",
                          right: "-3px",
                          transform: "rotate(45deg)",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          zIndex: 2,
                        }}>
                        {route.status}
                      </Typography>
                    </Box>

                    {/* Card content */}
                    <Typography variant="h5" color="primary" gutterBottom>
                      {route.id.substring(0, 4).toUpperCase()} -{" "}
                      {route.status.toUpperCase()}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mr={2}>
                        <Box
                          width={10}
                          height={10}
                          border="2px solid black"
                          borderRadius="50%"
                          bgcolor="white"
                        />
                        <Box height={24} borderLeft="2px solid black" />
                        <Box
                          width={10}
                          height={10}
                          border="2px solid black"
                          borderRadius="50%"
                          bgcolor="white"
                        />
                      </Box>
                      <Box>
                        <Typography style={{ fontSize: "1.2rem" }}>
                          {route.startPort.address}
                        </Typography>
                        <Typography style={{ fontSize: "1.2rem" }}>
                          {route.endPort.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Link>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No routes found.
              </Typography>
            </Grid>
          )}
        </Grid>

        <Box mt={4}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={() => handlePageChange(currentPage + 1)}
            onPreviousPage={() => handlePageChange(currentPage - 1)}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}
