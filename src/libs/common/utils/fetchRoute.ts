import axios from "axios";
import { BE_ROUTE_API_URL } from "@/libs/common/constants/api";
import { SearchPortQueryInterface } from "@/libs/common/interfaces/search_port_query.interface copy";
import { SearchRouteQueryInterface } from "@/libs/common/interfaces/search_route_query.interface";

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
    searchQuery = query.searchTerm
      ? `${searchQuery}searchTerm=${query.searchTerm}&`
      : searchQuery;
    searchQuery = query.page
      ? `${searchQuery}page=${query.page}&`
      : searchQuery;
    searchQuery = query.sort
      ? `${searchQuery}sort=${query.sort}&`
      : searchQuery;
    searchQuery = searchQuery.slice(0, -1);
    return customAxiosWithCredentials.get(searchQuery).then((res) => res.data);
  }
  return customAxiosWithCredentials.get(`/port`).then((res) => res.data);
}

export function searchRoutes(query?: SearchRouteQueryInterface) {
  if (query) {
    let searchQuery = `/routes?`;
    searchQuery = query.searchTerm
      ? `${searchQuery}searchTerm=${query.searchTerm}&`
      : searchQuery;
    searchQuery = query.page
      ? `${searchQuery}page=${query.page}&`
      : searchQuery;
    searchQuery = query.sort
      ? `${searchQuery}sort=${query.sort}&`
      : searchQuery;
    searchQuery = searchQuery.slice(0, -1);
    return customAxiosWithCredentials.get(searchQuery).then((res) => res.data);
  }
  return customAxiosWithCredentials.get(`/routes`).then((res) => res.data);
}
