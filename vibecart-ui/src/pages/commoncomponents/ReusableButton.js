import React from 'react'
import './commoncomponents.css'

const ReusableButton = ({buttonName,handleClick}) => {
  return (
    <button className="button-css" onClick={handleClick} >{buttonName}</button>
  )
}

export default ReusableButton