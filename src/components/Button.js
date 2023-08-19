import React from 'react'

function Button({value, onClick}) {
  return (
    <button
        className="p-2 bg-blue-100 m-2 rounded-sm hover:shadow-lg"
        onClick={onClick}>
        {value}
    </button>
  )
}

export default Button