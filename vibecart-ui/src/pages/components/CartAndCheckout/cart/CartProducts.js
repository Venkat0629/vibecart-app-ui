import React, { useState } from 'react'
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import './cart.css'
import { calculateBillPerProduct, calculateTotalBill } from '../../../commoncomponents/CommonFunctions'
import { IoMdClose } from "react-icons/io";
import { updatecartBillData, updateCartData } from '../../../redux-toolkit/CartSlice';
import { useDispatch } from 'react-redux';
import Toaster from '../../../commoncomponents/Toaster';
import useToast from '../../../commoncomponents/ToastHook';


const CartProducts = ({ cartData, editQuantity, navigateTo }) => {
    const dispatch = useDispatch();


    const { toast, showToast, triggerToast } = useToast();
    const [errors, setErrors] = useState(null);


    const handleQuantityChange = (productId, stockQuantity, e) => {
        if (e.target.value > stockQuantity) {
            triggerToast("error", `Sorry, we only have ${stockQuantity} items left in stock.`)
        }
        else if (e.target.value < 0) {
            triggerToast("error", "Please enter a valid quantity")
        }

        else {
            const updatedData = cartData.map((data) => productId === data.skuID ? { ...data, requestedQuantity: e.target.value } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            dispatch(updatecartBillData((calculateTotalBill(finalData))));
            localStorage.setItem("cartData", JSON.stringify(finalData));
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
            triggerToast("error", `Sorry, we only have ${stockQuantity} items left in stock.`)
        }
        else if (updatedQuantity <= 0) {
            triggerToast("error", "please enter quantity greater than 0");
        }
        else {
            const updatedData = cartData.map((data) => productId === data.skuID ? { ...data, requestedQuantity: updatedQuantity } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            dispatch(updatecartBillData((calculateTotalBill(finalData))));
            localStorage.setItem("cartData", JSON.stringify(finalData));
        }
    }
    const handleRemoveCartItem = (productId) => {
        const updatedData = cartData.filter((item) => item.skuID !== productId);
        const finalData = calculateBillPerProduct(updatedData);
        dispatch(updateCartData(finalData));
        dispatch(updatecartBillData((calculateTotalBill(finalData))));
        localStorage.setItem("cartData", JSON.stringify(finalData));
        triggerToast("success", "Item removed successfully")

    }

    const handlecartItemClick = (productId) => {
        navigateTo(`/product/${productId}`);
    }

    return (
        <div className='cartproducts'>
            {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}
            {cartData?.map((product) => (
                <div key={product.skuID} className='cartproductItem'>
                    <div className='cartproductImage'>
                        <img src={product.imageURL[0]} alt="Product" className='icon-styles' onClick={() => handlecartItemClick(product.skuID)} />
                    </div>
                    <div className='cartproductDetails'>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4 className='icon-styles' onClick={() => handlecartItemClick(product.skuID)}>{product.itemName}</h4>
                            {editQuantity && <IoMdClose className='icon-styles' onClick={() => handleRemoveCartItem(product.skuID)} />}
                        </div>
                        {editQuantity && <p>{product.itemDescription}</p>}
                        {editQuantity ? <p style={{ color: "red" }}>${product.price}</p> : <p style={{ color: "red" }}>${product.totalAmountPerProduct}</p>}
                        <div className='quantityLayout'>
                            <b>Qty</b> : {editQuantity ?
                                <>
                                    <FiMinus className='icon-styles' onClick={() => handleQuantityUpdation("decrement", product.skuID, product.requestedQuantity, product.stockQuantity)} />
                                    <input
                                        className='quantityInput'
                                        type='number'
                                        min="1"
                                        max={product.stockQuantity}
                                        value={product.requestedQuantity}
                                        onChange={(e) => handleQuantityChange(product.skuID, product.stockQuantity, e)}
                                    />
                                    <FaPlus className='icon-styles' onClick={() => handleQuantityUpdation("increment", product.skuID, product.requestedQuantity, product.stockQuantity)} />
                                        {errors && <p>{errors}</p>}
                                </>
                                : product.requestedQuantity}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartProducts