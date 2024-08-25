import React, { useState } from 'react';
import '../Homepage/Home.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const productData = [
  {
    ItemID: 1,
    ItemName: "Leather Bag",
    ItemDescription: "High-quality leather bag.",
    CategoryID: 101,
    Price: 79.99,
    image: "https://media.istockphoto.com/id/1271796113/photo/women-is-holding-handbag-near-luxury-car.jpg?s=1024x1024&w=is&k=20&c=BssUZgZlBm3LIpa7ejLZsDc0NwPgbfrxT_WGbT2EBs0="
  },
  {
    ItemID: 2,
    ItemName: "Winter Jacket",
    ItemDescription: "Warm and comfortable winter jacket.",
    CategoryID: 102,
    Price: 129.99,
    image: "https://media.istockphoto.com/id/1271796113/photo/women-is-holding-handbag-near-luxury-car.jpg?s=1024x1024&w=is&k=20&c=BssUZgZlBm3LIpa7ejLZsDc0NwPgbfrxT_WGbT2EBs0="
  },
  {
    ItemID: 3,
    ItemName: "Running Shoes",
    ItemDescription: "Durable running shoes for all terrains.",
    CategoryID: 103,
    Price: 59.99,
    image: "https://media.istockphoto.com/id/1453810805/photo/running-shoes.jpg?s=1024x1024&w=is&k=20&c=rg_BNDv25oFFfcssKKDxDwXYU6Cc3G1Tjm-ivlNYKb0="
  },
  {
    ItemID: 4,
    ItemName: "Summer Hat",
    ItemDescription: "Stylish summer hat.",
    CategoryID: 104,
    Price: 19.99,
    image: "https://media.istockphoto.com/id/1453810805/photo/running-shoes.jpg?s=1024x1024&w=is&k=20&c=rg_BNDv25oFFfcssKKDxDwXYU6Cc3G1Tjm-ivlNYKb0="
  }
];

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(productData);

  return (
    <div>
      <section className="banner my-4">
        <div className="container">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            <div className="bg-secondary text-white text-center py-5">
              <h2>Banner 1</h2>
              <p>1314x250</p>
            </div>
            <div className="bg-secondary text-white text-center py-5">
              <h2>Banner 2</h2>
              <p>1314x250</p>
            </div>
            <div className="bg-secondary text-white text-center py-5">
              <h2>Banner 3</h2>
              <p>1314x250</p>
            </div>
            <div className="bg-secondary text-white text-center py-5">
              <h2>Banner 4</h2>
              <p>1314x250</p>
            </div>
            <div className="bg-secondary text-white text-center py-5">
              <h2>Banner 5</h2>
              <p>1314x250</p>
            </div>
          </Carousel>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="top-categories my-4">
        <div className="container">
          <h3>Top Categories</h3>
          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-md-3" key={product.ItemID}>
                <div className="card">
                  <img src={product.image} className="card-img-top" alt={product.ItemName} style={{width: '100%', height: 'auto'}} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.ItemName}</h5>
                    <p className="card-text"><strong>Category ID:</strong> {product.CategoryID}</p>
                    <p className="card-text"><strong>Price:</strong> ${product.Price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
