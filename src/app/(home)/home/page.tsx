import React from 'react';
import MainLayout from '../MainLayout';
import HomeCarousel from '@/components/HomeCarousel';
import { Stats } from '@/components/Stats';
import About from '@/components/About';
import AboutUs from '@/components/AboutUs';

const Home = () => {
  return (
    <MainLayout>
      <HomeCarousel />
      <Stats />
      <About />
      <AboutUs />
    </MainLayout>
  );
};

export default Home;
