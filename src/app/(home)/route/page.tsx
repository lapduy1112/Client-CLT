"use client";
import Link from "next/link";
import MainLayout from "../MainLayout";
import React, { useState, useEffect } from "react";
import { Typography, Box, Grid, Paper, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoutes, searchRoutes } from "@/services/api";
import Pagination from "@/components/route/Pagination";
import Search from "@/components/route/Search";

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
  const [sortOption, setSortOption] = useState<string>("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const routePerPage = 9;
  // Fetch all routes on component mount
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // const fetchedRoutes = await getRoutes();
        const fetchedRoutes: RouteResponse = await getRoutes(
          currentPage,
          routePerPage,
          sortBy,
          sortOrder
        );
        setRoutes(fetchedRoutes.data);
        setFilteredRoutes(fetchedRoutes.data);
        console.log(fetchedRoutes.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, [currentPage, sortBy, sortOrder]);
  useEffect(() => {
    const savedPage = localStorage.getItem("currentRoutePage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);
  // Search logic
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      router.push(`/route?search=${searchQuery}`);
    }
  };

  // Fetch routes based on search query
  useEffect(() => {
    const fetchSearchedRoutes = async () => {
      const searchParam = searchParams.get("search") || "";
      if (searchParam) {
        try {
          const fetchedRoutes = await searchRoutes(searchParam);
          setFilteredRoutes(fetchedRoutes || []);
        } catch (error) {
          console.error("Error fetching searched routes:", error);
          setFilteredRoutes([]);
        }
      } else {
        const fetchedRoutes: RouteResponse = await getRoutes(
          currentPage,
          routePerPage,
          sortBy,
          sortOrder
        );
        setRoutes(fetchedRoutes.data);
        setFilteredRoutes(fetchedRoutes.data);
        setTotalPages(fetchedRoutes.lastPage);
        // setFilteredRoutes(routes);
      }
    };

    fetchSearchedRoutes();
  }, [searchParams, currentPage, sortBy, sortOrder]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        localStorage.setItem("currentRoutePage", newPage.toString());
        return newPage;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        localStorage.setItem("currentRoutePage", newPage.toString());
        return newPage;
      });
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem("currentRoutePage", page.toString());
  };
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      router.push("/port");
    } else {
      router.push(`/port?search=${searchQuery}`);
    }
  };
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setLoading(true);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
    setCurrentPage(1);
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
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Route Available
            </h2>
            <span>
              You can browse our direct routes here or you can find the schedule
              which fits your supply chain.
            </span>
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
            <div className="flex items-center space-x-2">
              <select
                value={sortOption}
                // onChange={handleSortChange}
                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">SORT</option>
                <option value="availableRoute">Available Route</option>
                <option value="transitRoute">Transit Route</option>
                <option value="completeRoute">Complete Route</option>
              </select>
              <svg
                className="w-5 h-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <Grid
          container
          spacing={3}
          style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          {Array.isArray(filteredRoutes) && filteredRoutes.length > 0 ? (
            filteredRoutes.map((route, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Link href={`/route/${route.id}`} passHref>
                  <Paper
                    elevation={3}
                    style={{
                      padding: "16px",
                      cursor: "pointer",
                      backgroundColor:
                        route.status === "Completed"
                          ? "#c8e6c9"
                          : route.status === "Transit"
                          ? "#ffe082"
                          : "#ffccbc",
                      border:
                        route.status === "Completed"
                          ? "1px solid green"
                          : route.status === "Transit"
                          ? "1px solid orange"
                          : "1px solid red",
                    }}>
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
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </MainLayout>
  );
}
