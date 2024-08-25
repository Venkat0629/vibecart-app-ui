import React from 'react'
import ReusableButton from '../../../commoncomponents/ReusableButton'
import './cart.css';

const OrderSummary = ({ cartData, totalBill, navigateTo, getcartData }) => {

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
            <h4>Order Summary</h4>
            <p> <b>Sub total ({cartData?.length} items) : ${totalBill}</b></p>
            <div>
                <ReusableButton buttonName="Proceed to Checkout" handleClick={handleCheckout} />
                <p><strong>By continuing with your purchase you agree to our terms,conditions and privacy policy</strong></p>
            </div>
        </div>
    )
}

export default OrderSummary