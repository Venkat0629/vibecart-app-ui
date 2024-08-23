import React from 'react'
import ReusableButton from '../../commoncomponents/ReusableButton'
import './cart.css';

const OrderSummary = ({ products, totalBill }) => {
    return (
        <div className='orderSummary'>
            <h3>Order Summary</h3>
            <p> <b>Sub total ({products?.length} items) : ${totalBill}</b></p>
            <div>
                <ReusableButton buttonName="Proceed to Checkout" />
            </div>
            <p>By continuing with your purchase you agree to our terms,conditions and privacy policy</p>
        </div>
    )
}

export default OrderSummary