import React from "react";
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

interface AddPortProps {
  open: boolean;
  onClose: () => void;
}

const AddPort: React.FC<AddPortProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Port</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="Port Name"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-4"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPort;
