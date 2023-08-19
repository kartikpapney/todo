import React from 'react'

function Input({disabled=false, value, onChange, placeholder, onEnterKey, color}) {
  return (
    <input
        className={`flex w-full m-2 p-2 ${color||"bg-blue-100"} hover:shadow-lg rounded-sm`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder||''}
        onKeyUp={(e) => {
          if(e.key === 'Enter') {
            onEnterKey()
          }
      }
    } 
    />
  )
}

export default Input