"use client";
import React, { ReactNode } from "react";
interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
