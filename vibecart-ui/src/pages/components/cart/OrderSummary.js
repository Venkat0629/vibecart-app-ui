import React from 'react'

const OrderSummary = ({products,totalBill}) => {
    return (
        <div>
            <h1><b>Order Summary</b></h1>
            <h4>Sub total ({products?.length} items): ${totalBill}</h4>
        </div>
    )
}

export default OrderSummary