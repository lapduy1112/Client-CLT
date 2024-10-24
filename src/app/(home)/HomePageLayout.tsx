"use client";
import React, { ReactNode } from "react";
import Footer from "../../components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface MainLayoutProps {
  children: ReactNode;
}

const HomePageLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePageLayout;
