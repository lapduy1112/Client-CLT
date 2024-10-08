"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { addPort } from "@/services/api";
import { toast } from "react-toastify";

interface AddPortProps {
  open: boolean;
  onClose: () => void;
  onPortAdded: (newPort: any) => void;
}

const AddPort: React.FC<AddPortProps> = ({ open, onClose, onPortAdded }) => {
  const [portName, setPortName] = useState<string>("");

  const handleAddPort = async () => {
    if (!portName) {
      toast.error("Please insert Port name");
      return;
    }
    try {
      const response = await addPort({ address: portName });
      console.log("Add success:", response);

      onPortAdded(response);
      setPortName("");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding port");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Port</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="Tên Cổng"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-4"
          value={portName}
          onChange={(e) => setPortName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddPort} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPort;
