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

interface AddRouteProps {
  open: boolean;
  onClose: () => void;
}

const AddRoute: React.FC<AddRouteProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Route</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="start"
          label="StartPort"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-4"
        />
        <TextField
          margin="dense"
          id="end"
          label="EndPort"
          type="text"
          fullWidth
          variant="outlined"
          className="mb-4"
        />
        <TextField
          margin="dense"
          id="end"
          label="ArrivalDate"
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

export default AddRoute;
