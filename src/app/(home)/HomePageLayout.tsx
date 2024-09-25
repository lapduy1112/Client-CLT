'use client';
import React, { ReactNode } from 'react';
import Footer from '../../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const HomePageLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
