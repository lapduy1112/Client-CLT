"use client";
import React, { useState } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../MainLayout";
import AddPort from "@/components/admin/AddPort";

export default function PortManagePage() {
  const [open, setOpen] = useState(false);

  const data = new Array(10).fill({
    portname: "Ha noi",
    lat: "10.001",
    lon: "100.101",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <FormControl variant="outlined" className="w-1/4">
          <InputLabel>Select column</InputLabel>
          <Select label="Select column" defaultValue="">
            <MenuItem value="portname">Address</MenuItem>
            <MenuItem value="lat">Latitude</MenuItem>
            <MenuItem value="lon">Longttitude</MenuItem>
          </Select>
        </FormControl>
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
              <TableCell>Address</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longtitude</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.portname}</TableCell>
                <TableCell>{item.lat}</TableCell>
                <TableCell>{item.lon}</TableCell>
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
      <AddPort open={open} onClose={handleClose} />
    </MainLayout>
  );
}
