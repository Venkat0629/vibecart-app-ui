import React, { useState } from 'react'
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { calculateBillPerProduct, formatAmount } from '../../../commoncomponents/CommonFunctions'
import { updateCartData } from '../../../redux-toolkit/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toaster from '../../../commoncomponents/Toaster';
import useToast from '../../../commoncomponents/ToastHook';
import './cartproducts.css'

const CartProducts = ({ product, editQuantity, navigateTo, calculateTotalBill }) => {
    const [quantityError, setQuantityError] = useState(null);
    const dispatch = useDispatch();

    const { toast, showToast, triggerToast } = useToast();

    const handleQuantityChange = (productId, stockQuantity, e) => {
        if (e.target.value > stockQuantity) {
            setQuantityError(`${stockQuantity} max`);
        }
        else if (e.target.value < 0) {
            setQuantityError("min 1");
        }

        else {

            const updatedData = cartData.map((data) => productId === data.skuID ? { ...data, requestedQuantity: e.target.value } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            calculateTotalBill(finalData);
            localStorage.setItem("cartItems", JSON.stringify(finalData));
            setQuantityError("")
        }
    }

    const handleQuantityUpdation = (type, productId, requestedQuantity, stockQuantity) => {

        let updatedQuantity;
        if (type === "increment") {
            updatedQuantity = Number(requestedQuantity) + 1
        }
        else {
            updatedQuantity = Number(requestedQuantity) - 1

        }

        if (updatedQuantity > stockQuantity) {
            setQuantityError(`${stockQuantity} max`);
        }
        else if (updatedQuantity <= 0) {
            setQuantityError("min 1");

        }
        else {
            const updatedData = cartData.map((data) => productId === data.skuID ? { ...data, requestedQuantity: updatedQuantity } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            calculateTotalBill(finalData);
            localStorage.setItem("cartItems", JSON.stringify(finalData));
            setQuantityError("")

        }
    }
    const handleRemoveCartItem = (productId) => {
        const updatedData = cartData.filter((item) => item.skuID !== productId);
        const finalData = calculateBillPerProduct(updatedData);
        dispatch(updateCartData(finalData));
        calculateTotalBill(finalData);
        localStorage.setItem("cartItems", JSON.stringify(finalData));
        triggerToast("success", "Item removed successfully")

    }

    const { cartData } = useSelector((state) => state.cart);


    const handlecartItemClick = (productId) => {
        navigateTo(`/product/${productId}`);
    }

    return (
        <div className='cartproducts'>
            {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}
            <div key={product.skuID} className='cartProductsContainer'>
                <div key={product.skuID} className='cartproductDetails'>
                    <div className='cartproductImage'>
                        <img src={product.imageURL} alt="Product" className='icon-styles' onClick={() => handlecartItemClick(product.skuID)} />
                    </div>
                    <div className='cartproductTitle'>
                        <p><strong style={{ cursor: "pointer" }} onClick={() => handlecartItemClick(product.skuID)}>{product.itemName}</strong></p>
                        <p style={{ margin: 0 }}>{product.selectedSize}</p>
                        {!editQuantity && <p>{product.expectedDeliveryDate}</p>}
                        <span style={{ color: "grey" }}>{formatAmount(product.oldPrice)}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 15%", height: "40px" }}>
                        <div className='cartEditquantityLayout'>

                            {editQuantity ?
                                <>
                                    <FiMinus className='icon-styles' onClick={() => handleQuantityUpdation("decrement", product.skuID, product.requestedQuantity, product.stockQuantity)} />
                                    <input
                                        className='quantityInput'
                                        min="1"
                                        type='number'
                                        style={{ border: "none", textAlign: "center" }}
                                        max={product.stockQuantity}
                                        value={product.requestedQuantity}
                                        onChange={(e) => handleQuantityChange(product.skuID, product.stockQuantity, e)}
                                    />
                                    <FaPlus className='icon-styles' onClick={() => handleQuantityUpdation("increment", product.skuID, product.requestedQuantity, product.stockQuantity)} />
                                </>
                                : product.requestedQuantity}
                        </div>

                        <p className='errorMessage'>{quantityError}</p>
                    </div>

                    <div className='cartitemTotalLayout'>
                        {product.oldPrice === product.price ?

                            <p><b>{formatAmount(product.AmountPerProduct)}</b></p> :
                            <div>
                                <s>{formatAmount(product.AmountPerProduct)}</s>
                                <p style={{ fontSize: "20px" }}><b>{formatAmount(product.totalAmountPerProductAfterOffer)}</b></p>
                            </div>
                        }
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className='offer-container'>
                        <p className="offer-text">
                         {product.offers.length > 0 ? product.offers[0].offerName : null}
                        </p>
                        <p className="offer-popup" style={{ backgroundColor: "#f5f5f5", color: "#8c0e12" }}>
                            <b>Discount value: {product.offers[0]?.offerDiscountValue}</b>
                        </p>
                    </div>
                    {editQuantity && <p className='removecartItemButton' onClick={() => handleRemoveCartItem(product.skuID)}>Remove</p>}
                </div>
            </div>
        </div>
    )
}

export default CartProducts