import { Route, Routes } from 'react-router-dom'
import Homepage from '../components/Homepage'
import Cart from '../components/cart/Cart'
import Checkout from '../components/cart/Checkout'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import './routing.css';

export const Routing = () => {
    return (
        <div className='routing'>
            <div className='navbarLayout'>
                <Navbar />
            </div>
            <main className='content'>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </main>
            <div className='footerLayout'>
                <Footer />
            </div>

        </div>
    )
}