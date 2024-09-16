import React from "react";
import MainLayout from "../MainLayout";
import HomeCarousel from "@/components/HomeCarousel";
import { Stats } from "@/components/Stats";
import About from "@/components/About";

const Home = () => {
  return (
    <MainLayout>
      <HomeCarousel />
      <Stats />
      <About />
    </MainLayout>
  );
};

export default Home;
