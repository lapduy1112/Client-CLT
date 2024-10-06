'use client';
import React, { ReactNode, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/DashHeader';
import { usePathname } from 'next/navigation';
interface JoyOrderDashboardTemplateProps {
  children: ReactNode;
}

export default function JoyOrderDashboardTemplate({
  children,
}: JoyOrderDashboardTemplateProps) {
  const pathname = usePathname().split('/').slice(-1)[0];
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar tab={pathname} />
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: 'calc(12px + var(--Header-height))', md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
