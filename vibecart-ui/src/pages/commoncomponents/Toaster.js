import React from 'react'
import './commoncomponents.css'

const Toaster = ({ toastType, toastMessage }) => {

    const toastclassName = toastType === "success" ? "successtoast-styles" : "errortoast-styles"
    return (
        <div className={toastclassName}>{toastMessage}</div>
    )
}

export default Toaster