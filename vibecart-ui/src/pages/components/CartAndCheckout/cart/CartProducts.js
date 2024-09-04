import React from 'react'
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { calculateBillPerProduct, formatAmount } from '../../../commoncomponents/CommonFunctions'
import {  updateCartData } from '../../../redux-toolkit/CartSlice';
import { useDispatch } from 'react-redux';
import Toaster from '../../../commoncomponents/Toaster';
import useToast from '../../../commoncomponents/ToastHook';
import './cartproducts.css'



const CartProducts = ({ cartData, editQuantity, navigateTo ,calculateTotalBill}) => {
    const dispatch = useDispatch();
    //  example obj 
    //  {
    //     "categoryID": 105,
    //     "categoryName": "Sports",
    //     "imageURL": "http://localhost:8082/vibecart/ecom/items/images/energy-kicks-blue-shoe.jpeg",
    //     "itemDescription": "Elevate your performance with Energy Kicks, the ultimate shoe for high-energy activities. Crafted with a lightweight, breathable mesh upper to ensure maximum airflow and a cushioned midsole for superior shock absorption and energy return. The dynamic outsole features enhanced traction patterns for reliable grip on various surfaces. A sleek design with a padded collar and ergonomic fit provides comfort and stability, making Energy Kicks perfect for running, training, or everyday wear.",
    //     "itemID": 345,
    //     "itemName": "Energy Kicks",
    //     "price": 5000,
    //     "quantity": 2,
    //     "selectedColor": "BLUE",
    //     "selectedSize": "SIX",
    //     "skuID": 1000
    //   }

    const { toast, showToast, triggerToast } = useToast();

    const handleQuantityChange = (productId, totalQuantity, e) => {
        if (e.target.value > totalQuantity) {
            triggerToast("error", `Sorry, we only have ${totalQuantity} items left in stock.`)
        }
        else if (e.target.value < 0) {
            triggerToast("error", "Please enter a valid quantity")
        }

        else {
            const updatedData = cartData.map((data) => productId === data.skuID ? { ...data, requestedQuantity: e.target.value } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            calculateTotalBill(finalData);
            localStorage.setItem("cartItems", JSON.stringify(finalData));
        }
    }

    const handleQuantityUpdation = (type, productId, requestedQuantity, totalQuantity) => {

        let updatedQuantity;
        if (type === "increment") {
            updatedQuantity = Number(requestedQuantity) + 1
        }
        else {
            updatedQuantity = Number(requestedQuantity) - 1

        }

        if (updatedQuantity > totalQuantity) {
            triggerToast("error", `Sorry, we only have ${totalQuantity} items left in stock.`)
        }
        else if (updatedQuantity <= 0) {
            triggerToast("error", "please enter quantity greater than 0");
        }
        else {
            const updatedData = cartData.map((data) => productId === data.skuID ? { ...data, requestedQuantity: updatedQuantity } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            calculateTotalBill(finalData);
            localStorage.setItem("cartItems", JSON.stringify(finalData));
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

    const handleEmptyCart = () => {
        dispatch(updateCartData([]));
        calculateTotalBill([]);
        // localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.clear()
    }

    const handlecartItemClick = (productId) => {
        navigateTo(`/product/${productId}`);
    }

    return (
        <div className='cartproducts'>
            {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}
            {cartData?.map((product) => (
                <div key={product.skuID} className='cartProductsContainer'>
                    <div key={product.skuID} className='cartproductDetails'>
                        <div className='cartproductImage'>
                            <img src={product.imageURL} alt="Product" className='icon-styles' onClick={() => handlecartItemClick(product.skuID)} />
                        </div>
                        <div className='cartproductTitle'>
                            <p><strong style={{ cursor: "pointer" }} onClick={() => handlecartItemClick(product.skuID)}>{product.itemName}</strong></p>
                            {/* {editQuantity && <p>{product.itemDescription}</p>} */}
                            <span style={{ color: "grey" }}>{formatAmount(product.price)}</span>
                        </div>
                        <div className='cartEditquantityLayout'>
                            {editQuantity ?
                                <>
                                    <FiMinus className='icon-styles' onClick={() => handleQuantityUpdation("decrement", product.skuID, product.requestedQuantity, product.totalQuantity)} />
                                    <input
                                        className='quantityInput'
                                        min="1"
                                        // type
                                        style={{ border: "none", textAlign: "center" }}
                                        max={product.totalQuantity}
                                        value={product.requestedQuantity}
                                        onChange={(e) => handleQuantityChange(product.skuID, product.totalQuantity, e)}
                                    />
                                    <FaPlus className='icon-styles' onClick={() => handleQuantityUpdation("increment", product.skuID, product.requestedQuantity, product.totalQuantity)} />
                                </>
                                : product.requestedQuantity}
                        </div>
                        <div className='cartitemTotalLayout'>
                            <p><b>{formatAmount(product.totalAmountPerProduct)}</b></p>
                        </div>
                    </div>
                    {editQuantity && <p className='removecartItemButton' onClick={() => handleRemoveCartItem(product.skuID)}>Remove</p>}
                </div>
            ))}
            {editQuantity && <p className='removecartItemButton' onClick={handleEmptyCart}>EmptyCart</p>}
        </div>
    )
}

export default CartProducts