import React from "react";
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

export default function DashboardPage() {
  const data = new Array(10).fill({
    username: "LapDuy",
    email: "lapduy111201@gmail.com",
    role: "User",
    verify: "Verified",
  });

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        {" "}
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
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
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Verify</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.verify}</TableCell>
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
    </MainLayout>
  );
}
