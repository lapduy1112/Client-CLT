import React, { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Sheet,
  Select,
  Option,
  Input,
  Stack,
  Alert,
} from "@mui/joy";
import { addRoute } from "@/services/api";
import { Route } from "@/services/interface";

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
  const [error, setError] = useState<string | null>(null); // Thêm state để lưu thông báo lỗi

  const handleAddRoute = async () => {
    if (startPort === endPort) {
      setError("Start Port and End Port cannot be the same!"); // Thiết lập thông báo lỗi
      return;
    }

    const newRoute = {
      startPort_id: startPort,
      endPort_id: endPort,
      departureDate: departureDate,
    };

    try {
      const addedRoute = await addRoute(newRoute);
      onAddRoute({
        ...addedRoute,
        arrivalDate: addedRoute.arrivalDate.split("T")[0],
      });
      setStartPort("");
      setEndPort("");
      setDepartureDate("");
      setError(null); // Reset thông báo lỗi
      onClose();
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Sheet
        variant="outlined"
        sx={{
          width: 400,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}>
        <Typography component="h2" level="h4" mb={1}>
          Add New Route
        </Typography>

        {error && (
          <Alert color="danger" component="div" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          <Select
            placeholder="Start Port"
            value={startPort}
            onChange={(e, value) => setStartPort(value as string)}>
            {ports.map((port) => (
              <Option key={port.id} value={port.id}>
                {port.address}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="End Port"
            value={endPort}
            onChange={(e, value) => setEndPort(value as string)}>
            {ports.map((port) => (
              <Option key={port.id} value={port.id}>
                {port.address}
              </Option>
            ))}
          </Select>
          <Input
            type="date"
            placeholder="Departure Date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={2} mt={2}>
          <Button onClick={handleAddRoute} variant="solid" color="primary">
            Add
          </Button>
          <Button onClick={onClose} variant="plain" color="neutral">
            Cancel
          </Button>
        </Stack>
      </Sheet>
    </Modal>
  );
};

export default AddRoute;
