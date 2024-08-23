import React from 'react'
import './button.css'

const ReusableButton = ({buttonName,handleClick}) => {
  return (
    <button onClick={handleClick} >{buttonName}</button>
  )
}

export default ReusableButton