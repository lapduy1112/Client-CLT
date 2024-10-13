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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../MainLayout";
import AddPort from "@/components/admin/AddPort";
import { getPorts, searchPorts } from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PortManagePage() {
  const [open, setOpen] = useState(false);
  const [ports, setPorts] = useState<any[]>([]);
  const [filteredPorts, setFilteredPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [portToDelete, setPortToDelete] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const fetchedPorts = await getPorts();
        setPorts(fetchedPorts.data);
        setFilteredPorts(fetchedPorts.data);
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
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      router.push(`/admin/portmanage?search=${searchQuery}`);
    }
  };

  useEffect(() => {
    const fetchSearchedPorts = async () => {
      const searchParam = searchParams.get("search") || "";
      if (searchParam) {
        try {
          const fetchedPorts = await searchPorts(searchParam);
          setFilteredPorts(fetchedPorts || []);
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

  const handleDeleteClick = (port: any) => {
    setPortToDelete(port);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (portToDelete) {
      console.log(`Deleting port with ID: ${portToDelete.id}`);
      setFilteredPorts((prev) =>
        prev.filter((port) => port.id !== portToDelete.id)
      );
      setPortToDelete(null);
      toast.success("Port deleted successfully");
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPortToDelete(null);
  };

  const handlePortAdded = (newPort: any) => {
    setPorts((prevPorts) => [...prevPorts, newPort]);
    setFilteredPorts((prevPorts) => [...prevPorts, newPort]);
    // toast.success("Port added successfully");
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
          onKeyDown={handleKeyDown}
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
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(port)}>
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Bạn có chắc chắn muốn xóa port này?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will not be undone. Are you sure you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} className="text-gray-500">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <AddPort
        open={open}
        onClose={handleClose}
        onPortAdded={handlePortAdded}
      />
      <ToastContainer />
    </MainLayout>
  );
}
