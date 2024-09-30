import axios from "axios";

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
export default api;
