"use client";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  AppBar,
} from "@mui/material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl); // check menu open

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    handleClose();
  };
  const handleHistory = () => {
    console.log("History clicked");
    handleClose();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    handleClose();
  };

  return (
    <AppBar
      position="static"
      className="bg-gradient-to-r from-blue-500 to-teal-400">
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button>
              <Image
                src="/images/logistic.png"
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
          <Button color="inherit" className="text-white mx-2">
            Home
          </Button>
          <Button color="inherit" className="text-white mx-2">
            Services
          </Button>
          <Button color="inherit" className="text-white mx-2">
            Route
          </Button>
          <Button color="inherit" className="text-white mx-2">
            About Us
          </Button>

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
            }}>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleHistory}>History</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
