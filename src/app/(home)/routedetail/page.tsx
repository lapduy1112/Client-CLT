import MapLeaflet from "@/components/MapLeaflet";
import MainLayout from "../MainLayout";
import RouteInfo from "@/components/RouteInfo";

const mockRouteDetail = {
  from: "Ho Chi Minh",
  to: "Ha Noi",
  distance: "1,600 km",
  travelTime: "32 hours",
  departureTime: "2024-09-18",
  arrivalTime: "2024-09-19",
  startPosition: [10.8231, 106.6297],
  endPosition: [21.0285, 105.8542],
};
export default function RouteDetailPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <div className="container mx-auto py-6 px-4">
          <RouteInfo
            from={mockRouteDetail.from}
            to={mockRouteDetail.to}
            distance={mockRouteDetail.distance}
            travelTime={mockRouteDetail.travelTime}
            departureTime={mockRouteDetail.departureTime}
            arrivalTime={mockRouteDetail.arrivalTime}
          />
        </div>
        <div className="container">
          <MapLeaflet
            startPosition={mockRouteDetail.startPosition}
            endPosition={mockRouteDetail.endPosition}
          />
        </div>
      </div>
    </MainLayout>
  );
}
