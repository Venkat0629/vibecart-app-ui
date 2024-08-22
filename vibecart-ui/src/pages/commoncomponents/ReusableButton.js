import React from 'react'
import './button.css'

const ReusableButton = ({buttonName,handleClick}) => {
  return (
    <button onClick={handleClick} style={{width:"auto"}}>{buttonName}</button>
  )
}

export default ReusableButton