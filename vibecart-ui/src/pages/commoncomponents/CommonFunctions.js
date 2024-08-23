
export const calculateTotalBill = (cartData) => {

    const finalPrice = cartData.reduce((total, product) => {
        return total + (product.price * product.requestedQuantity);
    }, 0);
    return finalPrice

};
