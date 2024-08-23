import React, { useState } from 'react'
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import './cart.css'

const CartProducts = ({ products, editQuantity }) => {

    //use custom hook and solve this 
    const [cartData, setCartData] = useState(products);

    const handleQuantityChange = (productId, quantity, e) => {
        if (e.target.value > quantity) {
            alert(`Sorry, we only have ${quantity} items left in stock.`)
        }
        else{
            const updatedData = cartData.map((data)=> productId === data.id ? {...data,requestedQuantity:e.target.value} : data);
            setCartData(updatedData);
        }
    }


    return (
        <div className='cartproducts'>
            {cartData?.map((product) => (
                <div key={product.id} className='cartproductItem'>
                    <div className='cartproductImage'>
                        <img src={product?.image} alt="Product" />
                    </div>
                    <div className='cartproductDetails'>
                        <h4>{product.productName}</h4>
                        <p>{product.description}</p>
                        <p style={{ color: "red" }}>${product.price}</p>
                        <div className='quantityLayout'>
                            <b>Qty</b> : {editQuantity ?
                                <>
                                    <FiMinus />
                                    <input
                                        className='quantityInput'
                                        type='number'
                                        max={product.quantity}
                                        value={product.requestedQuantity}
                                        onChange={(e) => handleQuantityChange(product.id, product.quantity, e)}
                                    />
                                    <FaPlus />
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