import axios from "axios";
import { BE_ROUTE_API_URL } from "@/libs/common/constants/api";
import { SearchPortQueryInterface } from "@/libs/common/interfaces/search_port_query.interface";
import { SearchRouteQueryInterface } from "@/libs/common/interfaces/search_route_query.interface";
import { PortUpdateInterface } from "@/libs/common/interfaces/update-port.interface";
import {
  RouteUpdateInterface,
  RouteUpdateStatusInterface,
} from "@/libs/common/interfaces/update-route.interface";
import { SearchBookingQueryInterface } from "@/libs/common/interfaces/search_booking_query.interface";
import { toast } from "react-toastify";
const BASE_URL = BE_ROUTE_API_URL || "http://localhost:3000";
const customAxiosWithCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export function searchPorts(query?: SearchPortQueryInterface) {
  if (query) {
    let searchQuery = `/port?`;

    if (query.search) {
      searchQuery += `search=${query.search}&`;
    }

    if (query.page) {
      searchQuery += `page=${query.page}&`;
    }

    if (query.sortBy) {
      searchQuery += `sortBy=${query.sortBy}&`;
    }

    if (query.sortOrder) {
      searchQuery += `sortOrder=${query.sortOrder}&`;
    }
    searchQuery = searchQuery.endsWith("&")
      ? searchQuery.slice(0, -1)
      : searchQuery;

    return customAxiosWithCredentials.get(searchQuery).then((res) => res.data);
  }

  return customAxiosWithCredentials.get(`/port`).then((res) => res.data);
}

//add port
// export const uploadImage = async (formData: FormData) => {
//   console.log(formData);
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/cloudinary/upload",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error("Error upload Image:", error);
//     throw error;
//   }
// };

// export const addPort = async (data: { address: string; imageUrl: string }) => {
//   try {
//     const response = await api.post("/port/create", data);
//     console.log(response.data);
//     toast.success("Port created successfully!");
//     return response.data;
//   } catch (error) {
//     toast.error("Failed to create port.");
//     console.error("Error searching Ports:", error);
//     throw error;
//   }
// };

export function updatePort(data: PortUpdateInterface, id: string) {
  return customAxiosWithCredentials
    .patch(`/port/${id}`, data)
    .then((res) => res.data);
}
export function deletePort(id: string) {
  return customAxiosWithCredentials.delete(`/port/${id}`);
}
export function getPortById(id: string) {
  return customAxiosWithCredentials.get(`/port/${id}`).then((res) => res.data);
}
export function searchRoutes(query?: SearchRouteQueryInterface) {
  if (query) {
    let searchQuery = `/routes?`;

    if (query.search) {
      searchQuery += `search=${query.search}&`;
    }

    if (query.page) {
      searchQuery += `page=${query.page}&`;
    }

    if (query.sortBy) {
      searchQuery += `sortBy=${query.sortBy}&`;
    }

    if (query.sortOrder) {
      searchQuery += `sortOrder=${query.sortOrder}&`;
    }
    if (query.status) {
      searchQuery += `status=${query.status}&`;
    }
    searchQuery = searchQuery.endsWith("&")
      ? searchQuery.slice(0, -1)
      : searchQuery;

    return customAxiosWithCredentials.get(searchQuery).then((res) => res.data);
  }

  return customAxiosWithCredentials.get(`/routes`).then((res) => res.data);
}

export function searchBooking(query?: SearchBookingQueryInterface) {
  if (query) {
    let searchQuery = `/booking?`;

    if (query.search) {
      searchQuery += `search=${query.search}&`;
    }

    if (query.page) {
      searchQuery += `page=${query.page}&`;
    }

    if (query.sortBy) {
      searchQuery += `sortBy=${query.sortBy}&`;
    }

    if (query.sortOrder) {
      searchQuery += `sortOrder=${query.sortOrder}&`;
    }
    if (query.status) {
      searchQuery += `status=${query.status}&`;
    }
    searchQuery = searchQuery.endsWith("&")
      ? searchQuery.slice(0, -1)
      : searchQuery;

    return customAxiosWithCredentials.get(searchQuery).then((res) => res.data);
  }
  return customAxiosWithCredentials.get(`/routes`).then((res) => res.data);
}

export function deleteRoute(id: string) {
  return customAxiosWithCredentials.delete(`/routes/${id}`);
}
export function getRouteById(id: string) {
  return customAxiosWithCredentials
    .get(`/routes/${id}`)
    .then((res) => res.data);
}
export function updateRoute(data: RouteUpdateInterface, id: string) {
  return customAxiosWithCredentials
    .put(`/routes/${id}`, data)
    .then((res) => res.data);
}
export function updateRouteStatus(id: string) {
  return customAxiosWithCredentials
    .patch(`/routes/${id}/status`)
    .then((res) => res.data);
}

export function updateBookingStatus(id: string) {
  return customAxiosWithCredentials
    .patch(`/booking/${id}/status`)
    .then((res) => res.data);
}

// export function getBookingHistory(userId: string) {
//   return customAxiosWithCredentials
//     .get(`/booking/history/${userId}`)
//     .then((res) => res.data)
//     .catch((err) => {
//       console.log("Error fetching booking history:", err);
//       toast.error("Failed to fetch booking history.");
//     });
// }

export async function getBookingHistory(
  userId: string,
  query?: SearchBookingQueryInterface
) {
  if (query) {
    let searchQuery = `/booking/history/${userId}?`;

    if (query.search) {
      searchQuery += `search=${query.search}&`;
    }

    if (query.page) {
      searchQuery += `page=${query.page}&`;
    }

    if (query.sortBy) {
      searchQuery += `sortBy=${query.sortBy}&`;
    }

    if (query.sortOrder) {
      searchQuery += `sortOrder=${query.sortOrder}&`;
    }

    if (query.status) {
      searchQuery += `status=${query.status}&`;
    }

    searchQuery = searchQuery.endsWith("&")
      ? searchQuery.slice(0, -1)
      : searchQuery;

    const res = await customAxiosWithCredentials.get(searchQuery);
    return res.data;
  }

  const res_1 = await customAxiosWithCredentials.get(
    `/booking/history/${userId}`
  );
  return res_1.data;
}
