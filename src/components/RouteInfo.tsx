import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RoomIcon from "@mui/icons-material/Room";
import WavesIcon from "@mui/icons-material/Waves";
import { blue, grey } from "@mui/material/colors";
import AdjustIcon from "@mui/icons-material/Adjust";
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
        backgroundColor: "#fafafe",
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
              <strong>Departure port:</strong> {from}.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <RoomIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Destination port:</strong> {to}.
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <LocalShippingIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Distance:</strong> {distance} km 
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <AccessTimeIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Travel Time:</strong> {travelTime} days
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <AccessTimeIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Departure Time:</strong> {formattedDepartureDate} 
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" className="text-gray-700">
            <AccessTimeIcon style={{ marginRight: 8, color: blue[600] }} />
            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Arrival Time:</strong> {formattedArrivalDate}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" className="text-gray-700">
            <AdjustIcon style={{ marginRight: 8, color: blue[600] }} />

            <Typography
              variant="body1"
              className="font-semibold"
              style={{ fontSize: "1.1rem", fontWeight: 500, color: grey[800] }}>
              <strong>Status:</strong> {status} 
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteInfo;
