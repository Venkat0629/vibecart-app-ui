
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