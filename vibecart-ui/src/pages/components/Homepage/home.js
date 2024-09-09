import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Homepage/Home.css";
import Breadcrumbs from "./Breadcrumbs";
import Banners from "../Homepage/Banners"; // Import the Banners component
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomLeftArrow, CustomRightArrow } from "../Homepage/CustomArrows"; // Adjust import path as necessary

const categories = [
  {
    id: 1,
    name: "Jackets",
    image:
      "https://media.istockphoto.com/id/948018182/photo/travel-backpack-on-summer-sea-beach.jpg?s=1024x1024&w=is&k=20&c=GprZL8N9G7cUJkmFTx1CyjcCtnkyKIrATAxlu2mc4Q8=",
  },
  {
    id: 2,
    name: "Shoes",
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg",
  },
];

const breadcrumbs = [{ label: "Home", path: "/" }];

const defaultImage = "https://via.placeholder.com/150"; // Fallback image

const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [offers, setOffers] = useState({});
  const navigate = useNavigate();
  const bannerData = ["Banner1", "Banner2", "Banner3"];

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6060/vibecart/ecom/products?limit=10"
        );
        if (Array.isArray(response.data)) {
          const uniqueProducts = [];
          const itemIDs = new Set();

          response.data.forEach((product) => {
            if (
              (product.size === "SIX" || product.size === "SMALL") &&
              !itemIDs.has(product.itemID)
            ) {
              uniqueProducts.push(product);
              itemIDs.add(product.itemID);
            }
          });

          setTopProducts(uniqueProducts);
          uniqueProducts.forEach((product) => fetchOffers(product.itemID));
        } else {
          console.error("API response is not in expected array format.");
        }
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    const fetchOffers = async (itemId) => {
      try {
        const response = await axios.get(
          `http://localhost:5501/api/v1/vibe-cart/offers/item/${itemId}`
        );
        setOffers((prevOffers) => ({
          ...prevOffers,
          [itemId]: response.data,
        }));
      } catch (error) {
        console.error(`Error fetching offers for item ${itemId}:`, error);
      }
    };

    fetchTopProducts();
  }, []);

  const handleNavigate = (path, category = "") => {
    const url = category ? `${path}?category=${category}` : path;
    navigate(url);
  };

  const calculateOfferDetails = (price, offers) => {
    if (offers.length > 0) {
      const offer = offers[0];
      let offerPrice = price;

      if (offer.offerDiscountType === "PERCENTAGE") {
        offerPrice = price - (price * offer.offerDiscountValue) / 100;
      } else if (offer.offerDiscountType === "FIXED") {
        offerPrice = price - offer.offerDiscountValue;
      }

      return {
        offerPrice: offerPrice.toFixed(2),
        discount: offer.offerDiscountValue,
        discountType: offer.offerDiscountType,
      };
    }
    return null;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Banners bannerData={bannerData} />
      <section className="top-categories my-4">
        <div className="container">
          <h3>Top Categories</h3>
          <div className="row">
            {categories.map((category) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={category.id}
              >
                <div
                  className="card category-card"
                  onClick={() =>
                    handleNavigate("/products", category.name.toLowerCase())
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={category.image}
                    className="max_height"
                    alt={category.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{category.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="top-products my-4">
        <div className="container">
          <h3>Top Products</h3>
          <Carousel
            responsive={responsive}
            containerClass="carousel-container"
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {topProducts.map((product) => {
              const offerDetails = offers[product.itemID]
                ? calculateOfferDetails(product.price, offers[product.itemID])
                : null;
              return (
                <div className="col-12 mb-4" key={product.itemID}>
                  <Link
                    to={`/product/${product.skuID}`}
                    className="text-decoration-none"
                  >
                    <div className="card product-card">
                      <img
                        src={
                          product.imageURLs.length > 0
                            ? `http://${product.imageURLs[0]}`
                            : defaultImage
                        }
                        className="card-img-top"
                        alt={product.itemName}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.itemName}</h5>
                        <div className="price-section">
                          {offerDetails ? (
                            <>
                            <div className="discountprices">
                             <p className="offer-price">
                                ${offerDetails.offerPrice}
                              </p>
                              <p className="original-price">
                                ${product.price.toFixed(2)}
                              </p>
                              </div>
                             
                              <p className="discount-details">
                                {offerDetails.discount}{" "}
                                {offerDetails.discountType === "PERCENTAGE"
                                  ? "%"
                                  : ""}{" "}
                                off
                              </p>
                            </>
                          ) : (
                            <p className="regular-price">
                              ${product.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Home;
