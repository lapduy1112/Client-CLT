import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RoomIcon from "@mui/icons-material/Room";
import WavesIcon from "@mui/icons-material/Waves";
import { blue, grey } from "@mui/material/colors";
import AdjustIcon from '@mui/icons-material/Adjust';
interface RouteDetailProps {
  from: string;
  to: string;
  distance: string;
  travelTime: string;
  status: string;
  departureDate: Date;
  arrivalDate: Date;
}

const RouteInfo: React.FC<RouteDetailProps> = ({
  from,
  to,
  distance,
  travelTime,
  departureDate,
  status,
  arrivalDate,
}) => {
  const formattedDepartureDate = new Date(departureDate)
    .toISOString()
    .split("T")[0];
  const formattedArrivalDate = new Date(arrivalDate)
    .toISOString()
    .split("T")[0];
  return (
    <Card
      style={{
        backgroundColor: blue[50],
        borderRadius: "16px",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        fontFamily: "'Roboto', sans-serif",
      }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <WavesIcon
            style={{ fontSize: 40, color: blue[600], marginRight: 8 }}
          />
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            style={{ fontWeight: "bold" }}>
            Route Information
          </Typography>
        </Box>
        <Divider />
        <Box mt={3} className="space-y-4">
          <Box display="flex" alignItems="center" className="text-gray-700">
            <RoomIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>From:</strong> {from} — Departure port.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <RoomIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>To:</strong> {to} — Destination port.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <LocalShippingIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Distance:</strong> {distance} km — Total distance of the
              route.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <AccessTimeIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Travel Time:</strong> {travelTime} days — Estimated time
              for the journey.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <AccessTimeIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Departure Time:</strong> {formattedDepartureDate} —
              Scheduled time for departure.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <AccessTimeIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Arrival Time:</strong> {formattedArrivalDate} — Expected
              time of arrival at the destination.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" className="text-gray-700">
            <AdjustIcon style={{ marginRight: 8, color: blue[600] }} />

            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Status:</strong> {status} — Current status of the route.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteInfo;
