
export const calculateTotalBill = (cartData) => {

    const totalCartBill = cartData.reduce((total, product) => {
        return total + (product.price * product.requestedQuantity);
    }, 0);
    return Math.floor(totalCartBill)
}

export const calculateBillPerProduct = (cartData) => {
   const totalAmountPerProduct= cartData?.map((data) => ({
        ...data,
        totalAmountPerProduct: Math.floor(data.requestedQuantity * data.price)
    }));
    return totalAmountPerProduct
}
export  const getCartData = () => {
    const cartData = localStorage.getItem("cartItems");
    const shippingAddress = localStorage.getItem("shippingAddress");

    return {
      cartData: cartData?.length > 0 ? JSON.parse(cartData) : [],
      address: shippingAddress ? JSON.parse(shippingAddress) : {}
    }
  }
export const handleToast = ({type,message,setShowToast,setToast}) => {
    setToast({ type: type, message:message });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
};
