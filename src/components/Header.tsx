'use client';
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
} from '@mui/material';
import { useRouter } from 'next/navigation';
const Header = () => {
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
    <AppBar
      position="static"
      className="bg-gradient-to-r from-blue-500 to-teal-400"
    >
      <Toolbar className="flex justify-between items-center max-w-screen-2xl container mx-auto">
        <div className="flex items-center">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              className="text-slate-200 mx-2 font-semibold hover:text-white"
            >
              Home
            </Button>
          </Link>
          <Link href="/services" passHref>
            <Button
              color="inherit"
              className="text-slate-200 mx-2 font-semibold hover:text-white"
            >
              Services
            </Button>
          </Link>
          <Link href="/route" passHref>
            <Button
              color="inherit"
              className="text-slate-200 mx-2 font-semibold hover:text-white"
            >
              Route
            </Button>
          </Link>
          <Link href="/port" passHref>
            <Button
              color="inherit"
              className="text-slate-200 mx-2 font-semibold hover:text-white"
            >
              Port
            </Button>
          </Link>
        </Box>
        <div className="flex items-center">
          <IconButton color="inherit" onClick={handleProfileClick}>
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
  );
};

export default Header;
