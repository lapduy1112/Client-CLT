"use client";
import React, { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

interface MainLayoutProps {
  children: ReactNode;
}
export const metadata: Metadata = {
  title: "SSMSHome",
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
