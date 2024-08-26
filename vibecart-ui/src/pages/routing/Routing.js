// import Homepage from '../components/Homepage';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './routing.css';
import { Route, Routes } from "react-router-dom";
import Home from "../components/Homepage/home";
import ProductPage from "../components/Homepage/ProductPage";
import ProductDetailPage from "../components/Homepage/ProductDetailPage"; // Import the ProductDetailPage component
import Cart from '../../pages/components/CartAndCheckout/cart/Cart'
import Checkout from '../components/CartAndCheckout/checkout/Checkout';
import Orders from '../components/CartAndCheckout/orders/Orders'

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
          <Route path="/product/:productId" element={<ProductDetailPage />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <div className="footerLayout">
        <Footer />
      </div>
    </div>
  );
};
