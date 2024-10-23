import { BE_API_URL } from '@/libs/common/constants/api';
import { PortsResponse, RouteResponse } from '@/services/interface';
import axios from 'axios';
import { toast } from 'react-toastify';
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/route-api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BE_API_URL}/users`);
    console.log(response.data.users);
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
export const getRoutes = async (
  page: number = 1,
  limit: number = 9,
  sortBy: string = 'createdAt',
  sortOrder: string = 'DESC'
): Promise<RouteResponse> => {
  try {
    const response = await api.get('/routes', {
      params: {
        page,
        limit,
        sortBy,
        sortOrder,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};
// export const searchRoutes = async (
//   searchQuery: string,
//   page: number = 1,
//   limit: number = 10,
//   sortBy: string = "createdAt",
//   sortOrder: string = "DESC"
// ) => {
//   try {
//     const response = await api.get("/routes", {
//       params: {
//         search: searchQuery,
//         limit: limit,
//         page: page,
//         sortBy: sortBy,
//         sortOrder: sortOrder,
//       },
//     });

//     // Ensure response has 'data'
//     if (response && response.data && response.data.data) {
//       return response.data; // Return the full response object
//     } else {
//       return { data: [], total: 0, currentPage: 1, lastPage: 1 }; // Return a default structure if no data
//     }
//   } catch (error) {
//     console.error("Error searching routes:", error);
//     throw error;
//   }
// };
export const searchRoutes = async (
  searchQuery: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'createdAt', // Default sort field
  sortOrder: string = 'DESC' // Default sort order
) => {
  try {
    const response = await api.get('/routes', {
      params: {
        search: searchQuery,
        limit: limit,
        page: page,
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
    });

    return response.data; // Ensure the correct data structure is returned
  } catch (error) {
    console.error('Error searching routes:', error);
    throw error;
  }
};

export const getPorts = async (
  page: number = 1,
  limit: number = 4,
  sortBy: string = 'createdAt',
  sortOrder: string = 'DESC'
): Promise<PortsResponse> => {
  try {
    const response = await api.get('/port', {
      params: {
        page,
        limit,
        sortBy,
        sortOrder,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ports:', error);
    throw new Error('Could not fetch ports. Please try again later.');
  }
};
export const searchPorts = async (
  searchQuery: string,
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'createdAt',
  sortOrder: string = 'DESC'
) => {
  try {
    const response = await api.get('/port', {
      params: {
        search: searchQuery,
        limit: limit,
        page: page,
        sortBy: sortBy,
        sortOrder: sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching Ports:', error);
    throw error;
  }
};
export const uploadImage = async (formData: FormData) => {
  console.log(formData);
  try {
    const response = await api.post("/cloudinary/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error upload Image:", error);
    throw error;
  }
};
export const addPort = async (data: { address: string; imageUrl: string }) => {
  try {
    const response = await api.post('/port/create', data);
    console.log(response.data);
    toast.success('Port created successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to create port.');
    console.error('Error searching Ports:', error);
    throw error;
  }
};

export const addRoute = async (newRoute: {
  startPort_id: string;
  endPort_id: string;
  departureDate: string;
}) => {
  try {
    const response = await api.post('/routes/create', newRoute);
    toast.success('Route created successfully!');
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error('Failed to create route.');
    console.error('Error adding new route:', error);
    throw error;
  }
};

export const createBooking = async (
  routeId: string,
  userId: string,
  goodsDetails: string,
  weightRange: string
) => {
  try {
    const response = await api.post('/booking', {
      routeId,
      userId,
      goodsDetails,
      weightRange,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export default api;
