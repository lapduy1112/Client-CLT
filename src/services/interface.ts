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