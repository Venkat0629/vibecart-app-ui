import React, { useEffect, useState } from 'react'
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import './cart.css'
import ReusableButton from '../../../commoncomponents/ReusableButton';
import { calculateTotalBill } from '../../../commoncomponents/CommonFunctions'
import { IoMdClose } from "react-icons/io";


const CartProducts = ({ products, editQuantity, setTotalBill, getcartData, navigateTo }) => {

    const [cartData, setCartData] = useState(products);

    useEffect(() => {
        const data = getcartData();
        setCartData(data);
    }, [])


    const handleQuantityChange = (productId, quantity, e) => {
        if (e.target.value > quantity) {
            alert(`Sorry, we only have ${quantity} items left in stock.`)
        }
        else if (e.target.value < 0) {
            alert("Please enter valid quantity")
        }

        else {
            const updatedData = cartData.map((data) => productId === data.id ? { ...data, requestedQuantity: e.target.value } : data);
            setCartData(updatedData);
            setTotalBill(calculateTotalBill(updatedData));
            localStorage.setItem("cartData", JSON.stringify(updatedData));
        }
    }

    const handleQuantityUpdation = (type, productId, requestedQuantity, quantity) => {
        let updatedQuantity;
        if (type === "increment") {
            updatedQuantity = requestedQuantity + 1
        }
        else {
            updatedQuantity = requestedQuantity - 1

        }

        if (updatedQuantity > quantity) {
            alert(`Sorry, we only have ${quantity} items left in stock.`)
        }
        else if (updatedQuantity <= 0) {
            alert(`Please enter a quantity greater than zero.`)
        }
        else {
            const updatedData = cartData.map((data) => productId === data.id ? { ...data, requestedQuantity: updatedQuantity } : data);
            setCartData(updatedData);
            setTotalBill(calculateTotalBill(updatedData));
            localStorage.setItem("cartData", JSON.stringify(updatedData));
        }
    }

    const handleRemoveCartItem = (productId) => {
        const updatedCartData = cartData.filter((item) => item.id !== productId);
        setCartData(updatedCartData);
        setTotalBill(calculateTotalBill(updatedCartData));
        localStorage.setItem("cartData", JSON.stringify(updatedCartData));
    }

    const handlecartItemClick = (productId) => {
        navigateTo(`/product/${productId}`);
    }


    return (
        <div className='cartproducts'>
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
                        <p>{product.description}</p>
                        <p style={{ color: "red" }}>${product.price}</p>
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