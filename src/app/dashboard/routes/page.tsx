"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { useState, useEffect } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import AddIcon from "@mui/icons-material/Add";
import RouteTable from "@/components/routemanage/RouteTable";
import AddRoute from "@/components/admin/AddRoute";
import { Route } from "@/services/interface";
import axios from "axios";

interface Port {
  id: string;
  address: string;
}

export default function RouteManagement() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ports, setPorts] = useState<Port[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  useEffect(() => {
    const fetchPort = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/route-api/port`
        );
        setPorts(response.data.data);
      } catch (error) {
        console.error("Error fetching route data", error);
      }
    };

    fetchPort();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddRoute = (newRoute: Route) => {
    setRoutes((prevRoutes) => [newRoute, ...prevRoutes]);
  };
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 1,
      }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="small" />}
          sx={{ pl: 0 }}>
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home">
            <HomeRoundedIcon />
          </Link>
          <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
            Routes Management
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
        <Typography level="h2" component="h1">
          Routes Management
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddIcon />}
          onClick={handleClickOpen}
          size="sm">
          Create Route
        </Button>
      </Box>
      <RouteTable />
      <AddRoute
        open={open}
        onClose={handleClose}
        ports={ports}
        onAddRoute={handleAddRoute}
      />
    </Box>
  );
}
