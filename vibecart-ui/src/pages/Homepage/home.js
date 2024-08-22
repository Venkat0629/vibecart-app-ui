import React, { useState, useEffect } from 'react';
import '../Homepage/Home.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { useSearch } from './SearchContext';
const productData = [
  {
    "ItemID": 1,
    "ItemName": "Leather Bag",
    "ItemDescription": "High-quality leather bag.",
    "CategoryID": 101,
    "Price": 79.99,
    "image": "https://media.istockphoto.com/id/1271796113/photo/women-is-holding-handbag-near-luxury-car.jpg?s=1024x1024&w=is&k=20&c=BssUZgZlBm3LIpa7ejLZsDc0NwPgbfrxT_WGbT2EBs0="
  },
  {
    "ItemID": 2,
    "ItemName": "Winter Jacket",
    "ItemDescription": "Warm and comfortable winter jacket.",
    "CategoryID": 102,
    "Price": 129.99,
    "image": "https://media.istockphoto.com/id/518177270/photo/jacket.jpg?s=1024x1024&w=is&k=20&c=7gvI8rI03EQE4fsI2R-t73x-2twvR5ghCQlJBcSaJn4="
  },
  {
    "ItemID": 3,
    "ItemName": "Running Shoes",
    "ItemDescription": "Durable running shoes for all terrains.",
    "CategoryID": 103,
    "Price": 59.99,
    "image": "https://media.istockphoto.com/id/1453810805/photo/running-shoes.jpg?s=1024x1024&w=is&k=20&c=rg_BNDv25oFFfcssKKDxDwXYU6Cc3G1Tjm-ivlNYKb0="
  },
  {
    "ItemID": 4,
    "ItemName": "Summer Hat",
    "ItemDescription": "Stylish summer hat.",
    "CategoryID": 104,
    "Price": 19.99,
    "image": "https://media.istockphoto.com/id/186810611/photo/turquoise-sun-hat.jpg?s=1024x1024&w=is&k=20&c=gxmsh2b74BOKJ2rSO1nTk07L70y3G_j5sMmCFFDoC1Q="
  }
];



const Home = () => {
  const { searchQuery } = useSearch();
  const [filteredProducts, setFilteredProducts] = useState(productData);

  useEffect(() => {
    const query = (searchQuery || '').toLowerCase();
    const filtered = productData
      .filter(product => 
        product.ItemName.toLowerCase().includes(query) // Case-insensitive search
      );

    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div>
      {/* Navigation Section */}
      <nav className="bg-light py-2">
        <div className="navbar__menu">
          <button>Home</button>
          <button>Bags</button>
          <button>Shoes</button>
          <button>Jacket</button>
          <button>Sale</button>
        </div>
      </nav>

      {/* Banner Section */}
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
            <h2>Banner 2</h2>
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
                  <img src={product.image} className="card-img-top" alt={product.ItemName} width="500px" height="500px"/>
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
