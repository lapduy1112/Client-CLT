import React, { Suspense } from 'react';
import { Stats } from '@/components/Stats';
import About from '@/components/About';
import AboutUs from '@/components/AboutUs';
import { HomeSlider } from '@/components/HomeSlider';
import HomePageLayout from '../HomePageLayout';
import { AnotherHomeCarousel } from '@/components/AnotherHomeCarousel';
import LoadingSkeleton from '@/app/loading';
const Home = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomePageLayout>
        <HomeSlider />
        <AnotherHomeCarousel />
        <Stats />
        <About />
        <AboutUs />
      </HomePageLayout>
    </Suspense>
  );
};

export default Home;
