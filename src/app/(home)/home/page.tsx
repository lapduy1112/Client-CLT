import React from 'react';
import { Stats } from '@/components/Stats';
import About from '@/components/About';
import AboutUs from '@/components/AboutUs';
import { HomeSlider } from '@/components/HomeSlider';
import HomePageLayout from '../HomePageLayout';
import { AnotherHomeCarousel } from '@/components/AnotherHomeCarousel';
const Home = () => {
  return (
    <HomePageLayout>
      <HomeSlider />
      <AnotherHomeCarousel />
      <Stats />
      <About />
      <AboutUs />
    </HomePageLayout>
  );
};

export default Home;
