import React from 'react'
import './commoncomponents.css'

const ReusableButton = ({buttonName,handleClick,disabled}) => {
  return (
    <button className="button-css" disabled={disabled} onClick={handleClick} >{buttonName}</button>
  )
}

export default ReusableButton