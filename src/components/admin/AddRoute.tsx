import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { addRoute } from "@/services/api";
import { Route } from "@/libs/common/interfaces/route.interface";

interface Port {
  id: string;
  address: string;
}

interface AddRouteProps {
  open: boolean;
  onClose: () => void;
  ports: Port[];
  onAddRoute: (newRoute: Route) => void; 
}

const AddRoute: React.FC<AddRouteProps> = ({
  open,
  onClose,
  ports,
  onAddRoute,
}) => {
  const [startPort, setStartPort] = useState("");
  const [endPort, setEndPort] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleAddRoute = async () => {
    const newRoute = {
      startPort_id: startPort,
      endPort_id: endPort,
      departureDate: departureDate,
    };
    console.log(newRoute);
    try {
      const addedRoute = await addRoute(newRoute); 
         onAddRoute({
      ...addedRoute,
      arrivalDate: addedRoute.arrivalDate.split('T')[0], 
    });
      setStartPort("");
      setEndPort("");
      setDepartureDate("");
      onClose();
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Route</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Start Port</InputLabel>
          <Select
            value={startPort}
            onChange={(e) => setStartPort(e.target.value as string)}
            label="Start Port">
            {ports.map((port) => (
              <MenuItem key={port.id} value={port.id}>
                {port.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>End Port</InputLabel>
          <Select
            value={endPort}
            onChange={(e) => setEndPort(e.target.value as string)}
            label="End Port">
            {ports.map((port) => (
              <MenuItem key={port.id} value={port.id}>
                {port.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="departure-date"
          label="Departure Date"
          type="date"
          fullWidth
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddRoute} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoute;
