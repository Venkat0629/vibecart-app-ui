import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../Homepage/Home.css';

const categories = [
  { id: 1, name: 'Bags', image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg' },
  { id: 2, name: 'Jackets', image: 'https://4.imimg.com/data4/RU/VC/MY-11853389/men-s-jackets.jpg' },
  { id: 1, name: 'Bags', image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg' },
  { id: 2, name: 'Jackets', image: 'https://4.imimg.com/data4/RU/VC/MY-11853389/men-s-jackets.jpg' }
];

const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const filteredProducts = useSelector((state) => state.home.filteredProducts);
  const bannerData = ["Banner1","Banner2","Banner3"]

  useEffect(() => {
    // Fetch the top 4 products from the API
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/vibecart/items?limit=4');
        setTopProducts(response.data);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };

    fetchTopProducts();
  }, []);

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
      {bannerData.map((x,index) => (
        <div key={index} className="banner-slide text-white text-center py-5">
          {/* <img 
            src={imageUrl} 
            alt={`Slide ${index + 1}`} 
            style={{ width: '100%', height: 'auto' }} // Ensure images fit the container
          /> */}
          <p>{x}</p>
        </div>
      ))}
    </Carousel>
  </div>
      </section>

      <section className="top-categories my-4">
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

      <section className="top-products my-4">
        <div className="container">
          <h3>Top Products</h3>
          <div className="row">
            {topProducts.map((product) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.itemID}>
                <Link to={`/product/${product.itemID}`} className="text-decoration-none">
                  <div className="card product-card">
                    <img src={product.imageURL[0]} className="card-img-top" alt={product.itemName} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.itemName}</h5>
                      <p className="card-text"><strong>Category:</strong> {product.categoryName}</p>
                      <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
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
