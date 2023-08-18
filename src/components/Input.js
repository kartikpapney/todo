import React from 'react'

function Input({disabled=false, value, onChange, placeholder}) {
  return (
    <input
        className='flex w-full m-2 p-2 bg-blue-100 hover:shadow-lg rounded-sm'
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder||''} />
  )
}

export default Input