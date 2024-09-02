// src/components/Banners.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Homepage/Banners.css'

const Banners = ({ bannerData }) => {
  return (
    <section className="banner my-4">
      <div className="container">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          interval={3000}
          transitionTime={800}
          dynamicHeight={false}
        >
          {bannerData.map((x, index) => (
            <div key={index} className="banner-slide text-white text-center py-5">
              <p>{x}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Banners;
