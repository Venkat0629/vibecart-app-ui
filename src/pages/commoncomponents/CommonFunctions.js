import { VIBECART_URI } from '../commoncomponents/service';
export const formatAmount = (amount) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
    return formattedAmount
}

// export const calculateTotalBill = (cartData) => {

//     const totalCartBill = cartData.reduce((total, product) => {
//         return total + (product.price * product.requestedQuantity);
//     }, 0);

//     return Math.floor(totalCartBill);
// }

export const getQuantitydetails = async (cartData) => {

    const itemsIds = cartData?.map((x) => x.skuID);
    if (itemsIds.length > 0) {
        try {
            const response = await fetch(`${VIBECART_URI}/api/v1/vibe-cart/app/orders/sku/total-quantity`, { method: "POST", headers: { 'content-type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(itemsIds) });
            if ([200, 201].includes(response.status)) {
                const updatedData = await response.json();
                return updatedData;
            }
            else {
                return []

            }
        }
        catch (e) {
            return []
        }

    }


}

export const calculateBillPerProduct = (cartData) => {
    const totalAmountPerProduct = cartData?.map((data) => ({
        ...data,
        totalAmountPerProductAfterOffer: Math.floor(data.requestedQuantity * data.price),
        AmountPerProduct: Math.floor(data.requestedQuantity * data.oldPrice)
    }));
    return totalAmountPerProduct
}
export const getCartData = () => {
    const cartData = localStorage.getItem("cartItems");
    const shippingAddress = localStorage.getItem("shippingAddress");

    return {
        cartData: cartData?.length > 0 ? JSON.parse(cartData) : [],
        address: shippingAddress ? JSON.parse(shippingAddress) : {}
    }
}
export const handleToast = ({ type, message, setShowToast, setToast }) => {
    setToast({ type: type, message: message });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
};
