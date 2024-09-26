'use client';
// src/components/Footer.tsx
import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box component="footer" className="bg-gray-800 text-white py-6 mt-8">
      <Box className="container mx-auto px-4">
        <Box className="flex flex-col md:flex-row justify-center md:justify-between items-start">
          <Box className="flex flex-col mb-6 md:mb-0 text-center md:text-left">
            <Typography variant="h6" gutterBottom>
              My Information
            </Typography>
            <Typography variant="body2" gutterBottom>
              Address: 123 Street, New York, USA
            </Typography>
            <Typography variant="body2" gutterBottom>
              Phone:{' '}
              <a
                href="tel:+01234567890"
                className="text-blue-400 hover:underline"
              >
                +012 345 67890
              </a>
            </Typography>
            <Typography variant="body2" gutterBottom>
              Email:{' '}
              <a
                href="mailto:info@example.com"
                className="text-blue-400 hover:underline"
              >
                info@example.com
              </a>
            </Typography>
            <Box className="flex items-center mt-1 space-x-3">
              <Typography variant="body2" className="mr-2">
                Follow us on:
              </Typography>
              <Box className="flex space-x-3">
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  color="inherit"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://twitter.com"
                  target="_blank"
                  color="inherit"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  color="inherit"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  href="https://linkedin.com"
                  target="_blank"
                  color="inherit"
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-col text-center md:text-right">
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link
              href="/home"
              className="text-blue-400 hover:underline mb-1 block"
            >
              Home
            </Link>
            <Link
              href="/service"
              className="text-blue-400 hover:underline mb-1 block"
            >
              Service
            </Link>
            <Link href="/route" className="text-blue-400 hover:underline block">
              Route
            </Link>
            <Link
              href="/port"
              className="text-blue-400 hover:underline mb-1 block"
            >
              Port
            </Link>
          </Box>
        </Box>

        <Box className="border-t border-gray-700 my-6"></Box>

        <Box className="text-center">
          <Typography variant="body2" className="mb-2">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href="#" color="inherit" underline="hover">
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
