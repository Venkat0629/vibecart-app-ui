import Homepage from '../components/Homepage'
import Cart from '../components/cart/Cart'
import Checkout from '../components/cart/Checkout'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import './routing.css';
import { Route, Routes } from "react-router-dom";
import "./routing.css";
import Home from "../Homepage/home";
// import ProductPage from "../Homepage/ProductPage";
// import CartPage from "../Homepage/CartPage";

export const Routing = () => {
  return (
    <div className="routing">
      <div className="navbarLayout">
        <Navbar />
      </div>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/product/:id" element={<ProductPage />} /> */}
          {/* <Route path="/cartpage" element={<CartPage />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <div className="footerLayout">
        <Footer />
      </div>
    </div>
  );
};
