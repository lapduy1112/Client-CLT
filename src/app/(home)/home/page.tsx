import React from "react";
import MainLayout from "../MainLayout";
import { Container, Typography } from "@mui/material";
import HomeCarousel from "@/components/HomeCarousel";

const Home = () => {
  return (
    <MainLayout>
      <HomeCarousel />
    </MainLayout>
  );
};

export default Home;
