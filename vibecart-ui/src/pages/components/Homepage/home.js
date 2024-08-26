import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import '../Homepage/Home.css';
import productData from './productData';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Bags', image: 'path_to_image_1' },
  { id: 2, name: 'Jackets', image: 'path_to_image_2' }
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
            dynamicHeight={true}
          >
            <div className="banner-slide text-white text-center py-5">
              <h2>Banner 1</h2>
              <p>1314x250</p>
            </div>
            <div className="banner-slide text-white text-center py-5">
              <h2>Banner 2</h2>
              <p>1314x250</p>
            </div>
            <div className="banner-slide text-white text-center py-5">
              <h2>Banner 3</h2>
              <p>1314x250</p>
            </div>
            <div className="banner-slide text-white text-center py-5">
              <h2>Banner 4</h2>
              <p>1314x250</p>
            </div>
            <div className="banner-slide text-white text-center py-5">
              <h2>Banner 5</h2>
              <p>1314x250</p>
            </div>
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
