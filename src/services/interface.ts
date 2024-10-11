export interface Port {
  id: string;
  address: string;
  lat: string;
  lon: string;
}

export interface PortsResponse {
  data: Port[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export interface Route {
  id: string;
  startPort: Port;
  endPort: Port;
  distance: number;
  departureDate: Date;
  arrivalDate: Date;
  travelTime: number;
  status:string;
}
export interface RouteResponse {
  data: Route[];
  total: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}
