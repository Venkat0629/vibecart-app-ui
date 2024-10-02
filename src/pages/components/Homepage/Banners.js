import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import '../Homepage/Banners.css';

// Import the banner images
import bigMillionDaySale from '../../banner_img/big million day sale 2.jpg';
import blackFridaySale from '../../banner_img/Black Friday Sale 2.jpg';
import rainyDaySale from '../../banner_img/Rainy Day sale 3.jpg';

const Banners = () => {
  const navigate = useNavigate();

  const bannerData = [
    { image: bigMillionDaySale, query: 'big%20million%20days' },
    { image: blackFridaySale, query: 'black%20friday' },
    { image: rainyDaySale, query: 'rainy%20sale%202024' },
  ];

  const handleBannerClick = (query) => {
    if (query) {
      navigate(`/sale?query=${query}`);
    }
  };

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
          {bannerData.map((banner, index) => (
            <div key={index} onClick={() => handleBannerClick(banner.query)} className="carousel-image" >
              <img src={banner.image} alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Banners;
