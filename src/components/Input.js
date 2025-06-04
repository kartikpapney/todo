import React from 'react'

function Input({disabled=false, value, onChange, placeholder, onEnterKey, color}) {
  const getInputStyles = () => {
    if (disabled) {
      return "bg-gray-50 text-gray-400 border-gray-200";
    }
    
    // Color prop for task status (completed/pending)
    if (color === "bg-green-300") {
      return "bg-green-50 text-green-800 border-green-200 line-through";
    }
    if (color === "bg-red-300") {
      return "bg-white text-black border-gray-300";
    }
    
    return "bg-white text-black border-gray-300 focus:border-black";
  };

  return (
    <input
        className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 ${getInputStyles()}`}
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