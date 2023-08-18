import React from 'react'

function Button({value, onClick}) {
  return (
    <button
        className="px-4 py-2 bg-blue-100 m-2 rounded-sm hover:shadow-lg"
        onClick={onClick}>
        {value}
    </button>
  )
}

export default Button