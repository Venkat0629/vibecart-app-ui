import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import '../Homepage/Home.css';
import productData from './productData';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Bags', image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg' },
  { id: 2, name: 'Jackets', image: 'https://4.imimg.com/data4/RU/VC/MY-11853389/men-s-jackets.jpg' }
];


const Home = () => {
  const [filteredProducts] = useState(productData);

  return (
    <div>
      <section className="banner my-4">
      <div className="container">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      interval={3000}
      transitionTime={800}
      dynamicHeight={false} // Set to false for consistent height
    >
      {[...Array(5)].map((_, index) => (
        <div key={index} className="banner-slide text-white text-center py-5">
          {/* <img 
            src={imageUrl} 
            alt={`Slide ${index + 1}`} 
            style={{ width: '100%', height: 'auto' }} // Ensure images fit the container
          /> */}
        </div>
      ))}
    </Carousel>
  </div>
      </section>

      <section className="top-categoriesc my-4">
        <div className="container">
          <h3>Top Categories</h3>
          <div className="row">
            {categories.map((category) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={category.id}>
                <Link to={`/category/${category.id}`} className="text-decoration-none">
                  <div className="card category-card">
                    <img src={category.image} className="card-img-top" alt={category.name} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{category.name}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="top-categories my-4">
        <div className="container">
          <h3>Top Products</h3>
          <div className="row">
  {filteredProducts.map((product) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.ItemID}>
      <Link to={`/product/${product.ItemID}`} className="text-decoration-none">
        <div className="card product-card">
          <img src={product.image} className="card-img-top" alt={product.ItemName} />
          <div className="card-body text-center">
            <h5 className="card-title">{product.ItemName}</h5>
            <p className="card-text"><strong>Category ID:</strong> {product.CategoryID}</p>
            <p className="card-text"><strong>Price:</strong> ${product.Price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>

        </div>
      </section>
    </div>
  );
};

export default Home;
