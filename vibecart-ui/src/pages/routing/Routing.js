// import Homepage from '../components/Homepage';
import Cart from '../components/cart/Cart';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './routing.css';
import { Route, Routes } from "react-router-dom";
import Home from "../Homepage/home";
import ProductPage from "../Homepage/ProductPage";
import ProductDetailPage from "../Homepage/ProductDetailPage"; // Import the ProductDetailPage component
import Checkout from '../components/checkout/Checkout';

export const Routing = () => {
  return (
    <div className="routing">
      <div className="navbarLayout">
        <Navbar />
      </div>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} /> {/* Add route for ProductDetailPage */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </main>
      <div className="footerLayout">
        <Footer />
      </div>
    </div>
  );
};
