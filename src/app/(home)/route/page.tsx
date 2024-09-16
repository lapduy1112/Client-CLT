"use client";
import Link from "next/link";
import MainLayout from "../MainLayout";
import React, { useState } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";

export default function RoutePage() {
  const routes = [
    { id: "IA3 BKI Loop", from: "Kaohsiung", to: "Kaohsiung" },
    { id: "IA3 BTU Loop", from: "Kaohsiung", to: "Kaohsiung" },
    { id: "CTX", from: "Ho Chi Minh City (Saigon)", to: "Shanghai" },
    { id: "TP17 Eastbound", from: "Hong Kong", to: "Freeport" },
    { id: "TP6 Eastbound", from: "Vung Tau", to: "Los Angeles" },
    { id: "HP2", from: "Busan", to: "Busan" },
  ];
  const [sortOption, setSortOption] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState(routes);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = routes.filter(
      (route) =>
        route.from.toLowerCase().includes(query) ||
        route.to.toLowerCase().includes(query) ||
        route.id.toLowerCase().includes(query)
    );
    setFilteredRoutes(filtered);
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    console.log(`Sắp xếp theo: ${event.target.value}`);
  };

  return (
    <MainLayout>
      <Box className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <div className="">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Route Available
            </h2>
            <span>
              You can browse our direct routes here or you can find the schedule
              which fits your supply chain.
            </span>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search routes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="relative inline-block text-left">
            <div className="flex items-center space-x-2">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">SORT</option>
                <option value="mostPopular">Most Popular</option>
                <option value="bestRating">Best Rating</option>
                <option value="newest">Newest</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
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

            {sortOption && (
              <ul className="py-1">
                <li className="text-gray-900 block px-4 py-2 text-sm">
                  Selected: {sortOption}
                </li>
              </ul>
            )}
          </div>
        </div>
        <Grid container spacing={3} style={{ paddingTop: "16px" }}>
          {routes.map((route, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Link href={`/routedetail`} passHref>
                <Paper
                  elevation={3}
                  style={{ padding: "16px", cursor: "pointer" }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {route.id}
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
                        {route.from}
                      </Typography>
                      <Typography style={{ fontSize: "1.2rem" }}>
                        {route.to}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
}
