"use client";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { getPorts, searchPorts } from "@/services/api";
import MainLayout from "../MainLayout";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import HeaderSection from "@/components/port/HeaderSection";
import Search from "@/components/port/Search";
import RentalCard from "@/components/port/RentalCard";
import Pagination from "@/components/port/Pagination";
import PortMap from "@/components/port/PortMap";
import OrderSelector from "@/components/port/OrderSelector";

interface Port {
  id: string;
  address: string;
  lat: string;
  lon: string;
}

interface PortsResponse {
  data: Port[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export default function PortPage() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [filteredPorts, setFilteredPorts] = useState<Port[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedLatLon, setSelectedLatLon] = useState<[number, number]>([
    15.120963, 108.781383,
  ]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const portsPerPage = 4;

  useEffect(() => {
    const fetchPorts = async () => {
      setLoading(true);
      try {
        const fetchedPorts: PortsResponse = await getPorts(
          currentPage,
          portsPerPage,
          sortBy,
          sortOrder
        );
        // console.log(fetchedPorts);
        setPorts(fetchedPorts.data);
        setFilteredPorts(fetchedPorts.data);
        // setTotalPages(Math.ceil(fetchedPorts.total / portsPerPage));
        setTotalPages(fetchedPorts.lastPage);
      } catch (error) {
        console.error("Error fetching Ports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPorts();
  }, [currentPage, sortBy, sortOrder]);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPortPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/port?search=${searchQuery}`);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      router.push("/port");
    } else {
      router.push(`/port?search=${searchQuery}`);
    }
  };

  useEffect(() => {
    const fetchSearchedPorts = async () => {
      const searchParam = searchParams.get("search") || "";
      if (searchParam) {
        try {
          const fetchedPorts: PortsResponse = await searchPorts(searchParam);
          setFilteredPorts(fetchedPorts.data);
          console.log(fetchedPorts.data);
          // setTotalPages(Math.ceil(fetchedPorts.total / portsPerPage));
          setTotalPages(fetchedPorts.lastPage);
        } catch (error) {
          console.error("Error fetching searched Ports:", error);
          setFilteredPorts([]);
        }
      } else {
        try {
          const fetchedPorts: PortsResponse = await getPorts(
            currentPage,
            portsPerPage,
            sortBy,
            sortOrder
          );
          setPorts(fetchedPorts.data);
          setFilteredPorts(fetchedPorts.data);
          console.log(fetchedPorts.data);
          setTotalPages(fetchedPorts.lastPage);
        } catch (error) {
          console.error("Error fetching Ports:", error);
        }
        // setFilteredPorts(filteredPorts);
        // console.log(filteredPorts);
        // setTotalPages(fetchedPorts.lastPage);
      }
    };
    fetchSearchedPorts();
  }, [searchParams, currentPage, sortBy, sortOrder]);

  const handleCardClick = (lat: string, lon: string) => {
    setSelectedLatLon([parseFloat(lat), parseFloat(lon)]);
  };

  // const indexOfLastPort = currentPage * portsPerPage;
  // const indexOfFirstPort = indexOfLastPort - portsPerPage;
  // const currentPorts = Array.isArray(filteredPorts)
  //   ? filteredPorts.slice(indexOfFirstPort, indexOfLastPort)
  //   : [];
  // console.log(totalPages);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        localStorage.setItem("currentPortPage", newPage.toString());
        return newPage;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        localStorage.setItem("currentPortPage", newPage.toString());
        return newPage;
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem("currentPortPage", page.toString());
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
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            height: "calc(100vh - 64px)",
            display: "grid",
            gridTemplateColumns: { xs: "auto", md: "60% 40%" },
            gridTemplateRows: "auto 1fr auto",
          }}>
          <Stack
            sx={{
              backgroundColor: "background.surface",
              px: { xs: 2, md: 4 },
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}>
            <HeaderSection />
            <Search
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onSearch={handleSearch}
            />
          </Stack>
          <Box
            sx={{
              gridRow: "span 3",
              display: { xs: "none", md: "flex" },
              backgroundColor: "background.level1",
              backgroundSize: "cover",
            }}>
            <PortMap lat={selectedLatLon[0]} lon={selectedLatLon[1]} />
          </Box>
          <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
            <OrderSelector onSortChange={handleSortChange} />
            <Stack spacing={2} sx={{ overflow: "auto" }}>
              {filteredPorts.length > 0 ? (
                filteredPorts.map((port, index) => (
                  <RentalCard
                    key={index}
                    address={port.address}
                    lat={port.lat}
                    lon={port.lon}
                    image="https://cdnen.thesaigontimes.vn/wp-content/uploads/2024/05/cai-mep.jpg"
                    onClick={() => handleCardClick(port.lat, port.lon)}
                  />
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    No ports found.
                  </Typography>
                </Grid>
              )}
            </Stack>
          </Stack>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            onPageChange={handlePageChange}
          />
        </Box>
      </CssVarsProvider>
    </MainLayout>
  );
}
