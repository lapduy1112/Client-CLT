"use client";
import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../MainLayout";
import AddPort from "@/components/admin/AddPort";
import { getPorts } from "@/services/api";

export default function PortManagePage() {
  const [open, setOpen] = useState(false);
  const [ports, setPorts] = useState<any[]>([]);
  const [filteredPorts, setFilteredPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const fetchedPorts = await getPorts();
        setPorts(fetchedPorts);
        setFilteredPorts(fetchedPorts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Ports:", error);
        setLoading(false);
      }
    };
    fetchPorts();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterPorts(value);
  };

  const filterPorts = (search: string) => {
    const filtered = ports.filter((port) =>
      Object.values(port).some((field) =>
        String(field).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredPorts(filtered);
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Port Management</h2>
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
          value={searchQuery}
          onChange={handleSearchChange}
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
              <TableCell>Address</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPorts
              .slice((page - 1) * 10, page * 10)
              .map((port, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1 + (page - 1) * 10}</TableCell>
                  <TableCell>{port.address}</TableCell>
                  <TableCell>{port.lat}</TableCell>
                  <TableCell>{port.lon}</TableCell>
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
        <Pagination
          count={Math.ceil(filteredPorts.length / 10)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>

      <AddPort open={open} onClose={handleClose} />
    </MainLayout>
  );
}
