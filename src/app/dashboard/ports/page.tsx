"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import AddIcon from "@mui/icons-material/Add";
import PortTable from "@/components/portmanage/PortTable";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPort from "@/components/admin/AddPort";
interface Port {
  id: string;
  address: string;
  lat: string;
  lon: string;
  createdAt: string;
  updatedAt: string;
}
export default function PortManagement() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ports, setPorts] = useState<Port[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePortAdded = (newPort: any) => {
    setPorts((prevPorts) => [...prevPorts, newPort]);
    toast.success("Port added successfully");
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
            Ports Management
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
          Ports Management
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddIcon />}
          onClick={handleClickOpen}
          size="sm">
          Create Port
        </Button>
      </Box>
      <PortTable ports={ports} />
      <AddPort
        open={open}
        onClose={handleClose}
        onPortAdded={handlePortAdded}
      />
    </Box>
  );
}
