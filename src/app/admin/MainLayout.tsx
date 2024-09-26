// /components/MainLayout.tsx
"use client";
import SideNav from "@/components/admin/Sidenav";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen max-h-screen">
      <SideNav />
      <main className="w-5/6 p-6 bg-gray-50 flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
