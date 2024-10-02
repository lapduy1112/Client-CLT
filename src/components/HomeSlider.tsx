"use client";
import containerImg from "../../public/images/container_6.jpg";
import conatiner2Img from "../../public/images/container_5.jpg";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import {
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  AppBar,
  Container,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import Divider from "@mui/material/Divider";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import { useRouter } from "next/navigation";
import SliderCard from "./SliderCard";
import IconImage from "../../public/images/logo-no-background.png";
import { useStore } from "@/providers/ZustandProvider";
import { logOut } from "@/libs/common/utils/logOut";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/libs/common/utils/error";
import axios, { AxiosError } from "axios";
export const HomeSlider = () => {
  const user = useStore((state) => state.user);
  const deleteUser = useStore((state) => state.deleteUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
  const handleHistory = () => {
    console.log("History clicked");
    router.push(`/history`);
    handleClose();
  };

  const handleLogout = async () => {
    console.log("Logout clicked");
    mutation.mutate();
    handleClose();
  };
  return (
    <div className="bg-gradient-to-r from-[#010101] to-[#092A3D]">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          position: "relative",
          paddingTop: "1rem",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundSize: "cover",
        }}
        // className="flex flex-row justify-between pt-4 relative bg-cover"
      >
        <Image
          src={containerImg}
          alt=""
          className="w-full object-cover rounded-3xl opacity-80"
          priority></Image>

        <AppBar
          position="absolute"
          sx={{
            top: "1.75rem",
            left: "50%",
            borderRadius: "1.5rem",
            backgroundColor: "#ffffff",
            width: "94%",
            transform: "translate(-50%,0)",
          }}
          // className="bg-white top-7 w-[94%] left-1/2 transform -translate-x-1/2 rounded-3xl"
        >
          <Toolbar
            variant="dense"
            className="flex justify-between items-center max-w-screen-2xl container mx-auto">
            <div className="flex items-center">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button sx={{ padding: 0 }}>
                  <Image src={IconImage} alt="Logo" height={36} />
                  {/* <Typography variant="h6" className="font-bold text-black">
                    Ocean Wave
                  </Typography> */}
                </Button>
              </Box>
            </div>
            <Box className="flex items-center">
              <Link href="/home" passHref>
                <Button
                  className="text-black mx-2 font-semibold"
                  sx={{
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    fontWeight: 600,
                    color: "#000000",
                  }}>
                  Home
                </Button>
              </Link>
              <Link href="/services" passHref>
                <Button
                  className="text-black mx-2 font-semibold"
                  sx={{
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    fontWeight: 600,
                    color: "#000000",
                  }}>
                  Services
                </Button>
              </Link>
              <Link href="/route" passHref>
                <Button
                  className="text-black mx-2 font-semibold"
                  sx={{
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    fontWeight: 600,
                    color: "#000000",
                  }}>
                  Route
                </Button>
              </Link>
              <Link href="/port" passHref>
                <Button
                  className="text-black mx-2 font-semibold"
                  sx={{
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    fontWeight: 600,
                    color: "#000000",
                  }}>
                  Port
                </Button>
              </Link>
            </Box>
            {user ? (
              <div className="flex items-center">
                <IconButton
                  color="default"
                  onClick={handleProfileClick}
                  sx={{ padding: 0 }}>
                  <Avatar
                    alt={user?.username}
                    src={user?.profileImage}
                    sx={{ width: 32, height: 32 }}
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
                  <MenuItem
                    className="flex flex-row gap-x-4"
                    onClick={handleProfile}>
                    <div className="">
                      {" "}
                      <Avatar
                        alt={user?.username}
                        src={user?.profileImage}
                        sx={{ width: 48, height: 48 }}
                      />
                    </div>
                    <div className="">
                      <h3 className="font-semibold">
                        {user?.username || "Unknown User"}
                      </h3>
                      <h4>{user?.email || "Unknown Email"}</h4>
                    </div>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleHistory}>History</MenuItem>
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
              <IconButton color="default" onClick={handleProfileClick}>
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
            </div> */}
          </Toolbar>
        </AppBar>
        <div className="flex w-full absolute top-36 justify-around left-1/2 transform -translate-x-1/2">
          <div className="w-1/4 flex flex-col gap-y-4">
            <p className="text-white">
              At Ocean Wave, we pride ourselves on delivering top-notch
              logistics services for seamless cargo transportation.
            </p>
            <div className="flex gap-x-2">
              <IconButton
                className="bg-white text-black"
                sx={{ color: "#000000", backgroundColor: "#ffffff" }}>
                <PublicIcon />
              </IconButton>
              <IconButton
                className="bg-white text-black"
                sx={{ color: "#000000", backgroundColor: "#ffffff" }}>
                <LocalShippingOutlinedIcon />
              </IconButton>
              <IconButton
                className="bg-white text-black"
                sx={{ color: "#000000", backgroundColor: "#ffffff" }}>
                <ConnectingAirportsIcon />
              </IconButton>
            </div>
          </div>
          <div className="w-1/4 flex flex-col gap-y-1">
            <div className="flex justify-end">
              <IconButton
                className="bg-white text-black"
                sx={{ color: "#000000", backgroundColor: "#ffffff" }}>
                <TravelExploreOutlinedIcon />
              </IconButton>
            </div>
            <p className="text-white">
              Our international container shipping service offer seamless
              transportation of cargo worldwide.
            </p>
          </div>
          <div className="w-1/5"></div>
        </div>
        <div className="absolute top-80 right-[-4rem]">
          <div className="w-[28rem] h-[28rem] rounded-full flex justify-center items-center border-white border-solid border-2 border-opacity-25 relative">
            <div className="w-3 h-3 absolute left-[27%] top-[5%] bg-gradient-to-r from-white to-[#FFFFFFB3] rounded-full -translate-x-1/2"></div>
            <div className="absolute left-[calc(27%-4.5rem)] top-[1%] bg-gradient-to-r from-white to-[#FFFFFFB3] rounded-lg text-black text-sm font-bold px-3 py-1">
              01/ Sea
            </div>
            <div className="w-3 h-3 absolute left-0 bg-gradient-to-r from-white to-[#FFFFFFB3] rounded-full top-1/2 -translate-x-1/2"></div>
            <div className="absolute left-[calc(0%-4.5rem)] top-1/2 bg-gradient-to-r from-white to-[#FFFFFFB3] rounded-lg text-black text-sm font-bold px-3 py-1">
              02/ Air
            </div>
            <div className="w-3 h-3 absolute left-[29%] bg-gradient-to-r from-white to-[#FFFFFFB3] rounded-full top-[95%] -translate-x-1/2"></div>
            <div className="absolute left-[calc(27%-5rem)] top-[95%] bg-gradient-to-r from-white to-[#FFFFFFB3] rounded-lg text-black text-sm font-bold px-3 py-1">
              03/ Truck
            </div>
            <div className="w-60 h-60 rounded-full border-white border-solid border-2 flex justify-center items-center overflow-hidden border-opacity-50">
              <Image
                src={conatiner2Img}
                alt=""
                className="rounded-full object-cover h-52 w-52"></Image>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-20 -translate-y-1/2">
          <SliderCard />
        </div>
        <div className="absolute left-20 bottom-10">
          <h1 className="text-white text-8xl font-mono">OCEAN WAVE</h1>
        </div>
        <div className="absolute right-10 bottom-10 w-64">
          <h6 className="text-white tracking-widest">
            Seamless logistics solutions for efficient cargo transportation
          </h6>
        </div>
      </Container>
    </div>
  );
};
