import axios from "axios";
import { toast } from "react-toastify";
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRoutes = async () => {
  try {
    const response = await api.get("/routes");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};
export const searchRoutes = async (searchQuery: string) => {
  try {
    const response = await api.get("/routes", {
      params: {
        search: searchQuery,
        limit: 10,
        page: 1,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error searching routes:", error);
    throw error;
  }
};
export const getPorts = async () => {
  try {
    const response = await api.get("/port");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching ports:", error);
    throw error;
  }
};
export const searchPorts = async (searchQuery: string) => {
  try {
    const response = await api.get("/port", {
      params: {
        search: searchQuery,
        limit: 10,
        page: 1,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error searching Ports:", error);
    throw error;
  }
};

export const addPort = async (data: { address: string }) => {
  try {
    const response = await api.post("/port/create", data);
    console.log(response.data);
    toast.success("Port created successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to create port.");
    console.error("Error searching Ports:", error);
    throw error;
  }
};
export const addRoute = async (newRoute: {
  startPort_id: string;
  endPort_id: string;
  departureDate: string;
}) => {
  try {
    const response = await api.post("/routes/create", newRoute);
    toast.success("Route created successfully!");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Failed to create route.");
    console.error("Error adding new route:", error);
    throw error;
  }
};
export default api;
