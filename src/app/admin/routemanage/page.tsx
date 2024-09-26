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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "../MainLayout";
import AddRoute from "@/components/admin/AddRoute";

export default function RouteManagePage() {
  const [open, setOpen] = useState(false);
  const data = new Array(10).fill({
    startport: "HN",
    endport: "SG",
    distance: "100",
    departureDate: "2024/11/12",
    arrivalDate: "2024/11/12",
    status: "Transit",
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
        {" "}
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
        {" "}
        <FormControl variant="outlined" className="w-1/4">
          <InputLabel>Select column</InputLabel>
          <Select label="Select column" defaultValue="">
            <MenuItem value="username">Username</MenuItem>
            <MenuItem value="serial-code">Email</MenuItem>
            <MenuItem value="role">Verify</MenuItem>
            <MenuItem value="verify">Category</MenuItem>
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
        {" "}
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
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.startport}</TableCell>
                <TableCell>{item.endport}</TableCell>
                <TableCell>{item.distance}</TableCell>
                <TableCell>{item.departureDate}</TableCell>
                <TableCell>{item.arrivalDate}</TableCell>
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
        {" "}
        <p>Display 10 items</p>
        <Pagination count={10} color="primary" />
      </div>
      <AddRoute open={open} onClose={handleClose} />
    </MainLayout>
  );
}
