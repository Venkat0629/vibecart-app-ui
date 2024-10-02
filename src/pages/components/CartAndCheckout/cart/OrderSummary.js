import React from 'react'
import ReusableButton from '../../../commoncomponents/ReusableButton'
import './cart.css';
import useToast from '../../../commoncomponents/ToastHook';
import Toaster from '../../../commoncomponents/Toaster';
import { formatAmount } from '../../../commoncomponents/CommonFunctions';

const OrderSummary = ({ cartData, cartBillData, navigateTo, getcartData,disabled }) => {
    const { toast, showToast, triggerToast } = useToast();

    const totalItems = cartData.reduce((total, product) => {
        return total + Number(product.requestedQuantity);
    }, 0);

    const formattedPrice = formatAmount(cartBillData?.totalBill);

    const handleCheckout = () => {
        const { cartData } = getcartData();
        const invalidIQuantityitems = cartData.filter((x) => x.requestedQuantity <= 0);
        if (invalidIQuantityitems.length > 0) {
            triggerToast("error", `Enter valid quantity for product: ${invalidIQuantityitems[0].itemName}`)
        }
        else {
            navigateTo("/checkout");
        }
    }
    return (
        <div className='orderSummary'>
            {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}
            <div style={{ marginBottom: "10px" }}>
                <span style={{ color: "grey" }}>PRICE DETAILS</span>
            </div>
            <p> Sub total ({totalItems} items):  <b>{formattedPrice}</b></p>
            <div>
                <ReusableButton buttonName="Checkout" handleClick={handleCheckout} disabled={disabled}/>
                <p style={{marginTop:"8px"}}>
                    By continuing with your purchase, you agree to our{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer" className="">terms</a>,{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer" className="">conditions</a>, and{' '}
                    <a href="/terms" target="_blank" rel="noopener noreferrer" className="">privacy policy</a>.
                </p>
            </div>
        </div>
    )
}

export default OrderSummary