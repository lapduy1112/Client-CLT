"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../MainLayout";
import AddRoute from "@/components/admin/AddRoute";
import { getRoutes } from "@/services/api";

export default function RouteManagePage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const fetchedRoutes = await getRoutes();

        const processedRoutes = fetchedRoutes.map((route) => ({
          ...route,
          departureDate: route.departureDate.split("T")[0],
          arrivalDate: route.arrivalDate.split("T")[0],
        }));

        setRoutes(processedRoutes);
        console.log(processedRoutes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching routes:", error);
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Route Management</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}>
          Add new
        </Button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <TextField
          variant="outlined"
          label="Search list..."
          className="w-1/4"
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </div>

      <TableContainer component={Paper} className="max-h-96 overflow-y-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>StartPort</TableCell>
              <TableCell>EndPort</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell>ArrivalDate</TableCell>
              <TableCell>DepartureDate</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.startPort.address}</TableCell>
                <TableCell>{item.endPort.address}</TableCell>
                <TableCell>{item.distance}</TableCell>
                <TableCell>{item.arrivalDate}</TableCell>{" "}
                <TableCell>{item.departureDate}</TableCell>{" "}
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex justify-between items-center mt-6">
        <p>Display 10 items</p>
        <Pagination count={10} color="primary" />
      </div>
      <AddRoute open={open} onClose={handleClose} />
    </MainLayout>
  );
}
