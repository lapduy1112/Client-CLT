export interface Route {
  startPort: {
    address: string;
  };
  endPort: {
    address: string;
  };
  distance: number;
  departureDate: string;
  arrivalDate: string;
  status: string;
}
