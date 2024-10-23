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
