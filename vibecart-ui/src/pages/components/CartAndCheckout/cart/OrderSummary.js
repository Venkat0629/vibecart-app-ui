import React from 'react'
import ReusableButton from '../../../commoncomponents/ReusableButton'
import './cart.css';
import useToast from '../../../commoncomponents/ToastHook';
import Toaster from '../../../commoncomponents/Toaster';

const OrderSummary = ({ cartData, totalBill, navigateTo, getcartData }) => {
    const { toast, showToast, triggerToast } = useToast();
    const totalItems = cartData.reduce((total, product) => {
        return total + Number(product.requestedQuantity);
    }, 0);

    const handleCheckout = () => {
        const { cartData } = getcartData();
        const invalidIQuantityitems = cartData.filter((x) => x.requestedQuantity <= 0);
        if (invalidIQuantityitems.length > 0) {
            triggerToast("error", `Enter valid quantity for product: ${invalidIQuantityitems[0].productName}`)
        }
        else {
            navigateTo("/checkout");
        }
    }
    return (
        <div className='orderSummary'>
            {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}
            <p> Sub total ({totalItems} items) :<b> ${totalBill}</b></p>
            <div>
                <ReusableButton buttonName="Checkout" handleClick={handleCheckout} />
                <p><strong>By continuing with your purchase you agree to our terms,conditions and privacy policy</strong></p>
            </div>
        </div>
    )
}

export default OrderSummary