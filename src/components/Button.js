import React from 'react'

function Button({value, onClick, variant = "secondary", className = ""}) {
  const baseClasses = "px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-500",
    secondary: "bg-white text-black border border-gray-300 hover:bg-gray-50 focus:ring-gray-300",
    danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50 focus:ring-red-300",
    delete: "bg-transparent text-gray-400 hover:text-red-500 hover:bg-red-50 focus:ring-red-300 rounded-full",
    edit: "bg-transparent text-gray-400 hover:text-blue-500 hover:bg-blue-50 focus:ring-blue-300 rounded-full"
  };

  return (
    <button
        className={`${baseClasses} ${variants[variant]} rounded-lg ${className}`}
        onClick={onClick}>
        {value}
    </button>
  )
}

export default Button