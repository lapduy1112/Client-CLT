'use client';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" component="h1" color="error">
        403 - Unauthorized Access
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2, textAlign: 'center' }}>
        You do not have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={handleGoBack}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
