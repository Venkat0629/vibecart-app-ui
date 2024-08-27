import React from 'react'
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


    const handleQuantityChange = (productId, quantity, e) => {
        if (e.target.value > quantity) {
            triggerToast("error", `Sorry, we only have ${quantity} items left in stock.`)
        }
        else if (e.target.value < 0) {
            triggerToast("error", "Please enter a valid quantity")
        }

        else {
            const updatedData = cartData.map((data) => productId === data.id ? { ...data, requestedQuantity: e.target.value } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            dispatch(updatecartBillData((calculateTotalBill(finalData))));
            localStorage.setItem("cartData", JSON.stringify(finalData));
        }
    }

    const handleQuantityUpdation = (type, productId, requestedQuantity, quantity) => {
        let updatedQuantity;
        if (type === "increment") {
            updatedQuantity = Number(requestedQuantity) + 1
        }
        else {
            updatedQuantity = Number(requestedQuantity) - 1

        }

        if (updatedQuantity > quantity) {
            triggerToast("error", `Sorry, we only have ${quantity} items left in stock.`)
        }
        else if (updatedQuantity <= 0) {
            triggerToast("error", "please enter quantity greater than 0")
        }
        else {
            const updatedData = cartData.map((data) => productId === data.id ? { ...data, requestedQuantity: updatedQuantity } : data);
            const finalData = calculateBillPerProduct(updatedData);
            dispatch(updateCartData(finalData));
            dispatch(updatecartBillData((calculateTotalBill(finalData))));
            localStorage.setItem("cartData", JSON.stringify(finalData));
        }
    }
    const handleRemoveCartItem = (productId) => {
        const updatedData = cartData.filter((item) => item.id !== productId);
        const finalData = calculateBillPerProduct(updatedData);
        dispatch(updateCartData(finalData));
        dispatch(updatecartBillData((calculateTotalBill(finalData))));
        localStorage.setItem("cartData", JSON.stringify(finalData));
        triggerToast("success","Item removed successfully")

    }

    const handlecartItemClick = (productId) => {
        navigateTo(`/product/${productId}`);
    }


    return (
        <div className='cartproducts'>
            {showToast && <Toaster toastType={toast.type} toastMessage={toast.message} />}
            {cartData?.map((product) => (
                <div key={product.id} className='cartproductItem'>
                    <div className='cartproductImage'>
                        <img src={product?.image} alt="Product" className='icon-styles' onClick={() => handlecartItemClick(product.id)}/>
                    </div>
                    <div className='cartproductDetails'>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4 className='icon-styles' onClick={() => handlecartItemClick(product.id)}>{product.productName}</h4>
                            {editQuantity && <IoMdClose className='icon-styles' onClick={() => handleRemoveCartItem(product.id)}/>}
                        </div>
                        {editQuantity && <p>{product.description}</p>}
{                  editQuantity ?      <p style={{ color: "red" }}>${product.price}</p> :<p style={{ color: "red" }}>${product.totalAmountPerProduct}</p> }
                        <div className='quantityLayout'>
                            <b>Qty</b> : {editQuantity ?
                                <>
                                    <FiMinus className='icon-styles' onClick={() => handleQuantityUpdation("decrement", product.id, product.requestedQuantity, product.quantity)} />
                                    <input
                                        className='quantityInput'
                                        type='number'
                                        min="1"
                                        max={product.quantity}
                                        value={product.requestedQuantity}
                                        onChange={(e) => handleQuantityChange(product.id, product.quantity, e)}
                                    />
                                    <FaPlus className='icon-styles' onClick={() => handleQuantityUpdation("increment", product.id, product.requestedQuantity, product.quantity)} />
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