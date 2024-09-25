import React from 'react';
import MainLayout from '../MainLayout';
import HomeCarousel from '@/components/HomeCarousel';
import { Stats } from '@/components/Stats';
import About from '@/components/About';
import AboutUs from '@/components/AboutUs';
import { HomeSlider } from '@/components/HomeSlider';
import HomePageLayout from '../HomePageLayout';

const Home = () => {
  return (
    <HomePageLayout>
      <HomeSlider />
      {/* <HomeCarousel /> */}
      <Stats />
      <About />
      <AboutUs />
    </HomePageLayout>
  );
};

export default Home;
