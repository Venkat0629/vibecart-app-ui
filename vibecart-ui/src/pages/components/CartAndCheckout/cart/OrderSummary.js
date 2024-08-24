import React from 'react'
import ReusableButton from '../../../commoncomponents/ReusableButton'
import './cart.css';

const OrderSummary = ({ products, totalBill, navigateTo, getcartData }) => {

    const handleCheckout = () => {
        const data = getcartData();
        const invalidIQuantityitems = data.filter((x) => x.requestedQuantity <= 0);
        if (invalidIQuantityitems.length > 0) {
            alert(`Enter valid quantity for product: ${invalidIQuantityitems[0].productName}`)
        }
        else {
            navigateTo("/checkout");
        }
    }
    return (
        <div className='orderSummary'>
            <h3>Order Summary</h3>
            <p> <b>Sub total ({products?.length} items) : ${totalBill}</b></p>
            <div>

                <ReusableButton buttonName="Proceed to Checkout" handleClick={handleCheckout} />
            </div>
            <p>By continuing with your purchase you agree to our terms,conditions and privacy policy</p>
        </div>
    )
}

export default OrderSummary