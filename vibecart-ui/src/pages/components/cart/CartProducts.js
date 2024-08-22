import React from 'react'
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

import './cart.css'

const CartProducts = ({ products, editQuantity }) => {

    const handleQuantityChange = async () => {

    }

    return (
        <div className='cartproducts'>
        {products.map((product) => (
            <div key={product.id} className='cartproductItem'>
                <img src={product?.image} alt="Product" className='cartproductImage' />
                <div className='cartproductDetails'>
                    <h4>{product.productName}</h4>
                    <p>{product.description}</p>
                    <p style={{ color: "red" }}>${product.price}</p>
                    <div className='quantityLayout'>
                        <b>Qty</b> : {editQuantity ?
                            <>
                                <FiMinus />
                                <input className='quantityInput' value={product.quantity} onChange={handleQuantityChange} />
                                <FaPlus />
                            </>
                            : product.quantity}
                    </div>

                </div>
            </div>
            ))}
        </div>
    )
}

export default CartProducts