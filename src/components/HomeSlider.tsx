'use client';
import containerImg from '../../public/images/container_6.jpg';
import conatiner2Img from '../../public/images/container_5.jpg';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import {
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  AppBar,
  Container,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import { useRouter } from 'next/navigation';
export const HomeSlider = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log('Profile clicked');
    router.push(`/profile`);
    handleClose();
  };
  const handleHistory = () => {
    console.log('History clicked');
    handleClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    handleClose();
  };
  return (
    <div className="bg-gradient-to-r from-[#010101] to-[#092A3D]">
      <Container
        maxWidth="xl"
        className="flex flex-row justify-between pt-4 relative bg-cover"
      >
        <Image
          src={containerImg}
          alt=""
          className="w-full object-cover rounded-3xl opacity-80"
        ></Image>
        <AppBar
          position="absolute"
          className="bg-white top-7 w-[94%] left-1/2 transform -translate-x-1/2 rounded-3xl"
        >
          <Toolbar
            variant="dense"
            className="flex justify-between items-center max-w-screen-2xl container mx-auto"
          >
            <div className="flex items-center">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button>
                  <Image
                    src="/images/cargo-ship.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="mr-2"
                  />
                  <Typography variant="h6" className="font-bold text-black">
                    SSMS Logistics
                  </Typography>
                </Button>
              </Box>
            </div>
            <Box className="flex items-center">
              <Link href="/home" passHref>
                <Button
                  color="inherit"
                  className="text-black mx-2 font-semibold"
                >
                  Home
                </Button>
              </Link>
              <Link href="/services" passHref>
                <Button
                  color="inherit"
                  className="text-black mx-2 font-semibold"
                >
                  Services
                </Button>
              </Link>
              <Link href="/route" passHref>
                <Button
                  color="inherit"
                  className="text-black mx-2 font-semibold"
                >
                  Route
                </Button>
              </Link>
              <Link href="/port" passHref>
                <Button
                  color="inherit"
                  className="text-black mx-2 font-semibold"
                >
                  Port
                </Button>
              </Link>
            </Box>
            <div className="flex items-center">
              <IconButton color="default" onClick={handleProfileClick}>
                <PersonIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleHistory}>History</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div className="flex w-full absolute top-36 justify-around left-1/2 transform -translate-x-1/2">
          <div className="w-1/4 flex flex-col gap-y-4">
            <p className="text-white">
              At Ocean Wave, we pride ourselves on delivering top-notch
              logistics services for seamless cargo transportation.
            </p>
            <div className="flex gap-x-2">
              <IconButton className="bg-white text-black">
                <PublicIcon />
              </IconButton>
              <IconButton className="bg-white text-black">
                <LocalShippingOutlinedIcon />
              </IconButton>
              <IconButton className="bg-white text-black">
                <ConnectingAirportsIcon />
              </IconButton>
            </div>
          </div>
          <div className="w-1/4 flex flex-col gap-y-1">
            <div className="flex justify-end">
              <IconButton className="bg-white text-black">
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
        <div className="flex absolute top-80 right-[-4rem] overflow-hidden">
          <div className="w-[28rem] h-[28rem] rounded-full flex justify-center items-center border-white border-solid border-2 border-opacity-25">
            <div className="w-56 h-56 rounded-full border-white border-solid border-2 flex justify-center items-center overflow-hidden border-opacity-50">
              <Image
                src={conatiner2Img}
                alt=""
                className="rounded-full object-cover h-52 w-52"
              ></Image>
            </div>
          </div>
        </div>
        <div className=""></div>
      </Container>
    </div>
  );
};
