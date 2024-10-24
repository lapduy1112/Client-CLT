"use client";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  AppBar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useStore } from "@/providers/ZustandProvider";
import { useMutation } from "@tanstack/react-query";
import { logOut } from "@/libs/common/utils/logOut";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/libs/common/utils/error";
import axios, { AxiosError } from "axios";

const Header = () => {
  const user = useStore((state) => state.user);
  console.log(user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const deleteUser = useStore((state) => state.deleteUser);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      deleteUser();
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error: Error | AxiosError) => {
      console.log("Error", error);
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    router.push(`/profile`);
    handleClose();
  };
  const handleDashboard = () => {
    console.log("History clicked");
    router.push(`/dashboard/profile`);
    handleClose();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    mutation.mutate();
    handleClose();
  };

  return (
    <AppBar
      position="static"
      className="bg-gradient-to-r from-blue-500 to-teal-400">
      <Toolbar className="flex justify-between items-center max-w-screen-2xl container mx-auto">
        <div className="flex items-center">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button>
              <Image
                src="/images/cargo-ship.svg"
                alt="Logo"
                width={50}
                height={50}
                className="mr-2"
              />
              <Typography variant="h6" className="font-bold text-white">
                SSMS Logistics
              </Typography>
            </Button>
          </Box>
        </div>
        <Box className="flex items-center">
          <Link href="/home" passHref>
            <Button
              color="inherit"
              className="text-slate-200 mx-2 font-semibold hover:text-white">
              Home
            </Button>
          </Link>
          <Link href="/route" passHref>
            <Button
              color="inherit"
              className="text-slate-200 mx-2 font-semibold hover:text-white">
              Route
            </Button>
          </Link>
          <Link href="/port" passHref>
            <Button
              color="inherit"
              className="text-slate-200 mx-2 font-semibold hover:text-white">
              Port
            </Button>
          </Link>
        </Box>
        {user ? (
          <div className="flex items-center">
            <IconButton color="default" onClick={handleProfileClick}>
              <Avatar
                alt={user?.username}
                src={user?.profileImage}
                sx={{ width: 24, height: 24 }}
              />
              {/* <PersonIcon /> */}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}>
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link href="/login" passHref>
            <Button
              className="text-white mx-2 font-semibold"
              sx={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#000000",
                textTransform: "none",
              }}>
              Login
            </Button>
          </Link>
        )}
        {/* <div className="flex items-center">
          <IconButton color="inherit" onClick={handleProfileClick}>
            <PersonIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleHistory}>History</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
