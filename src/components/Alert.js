import React from 'react'

function Alert({value}) {
  return (
    <div className='flex h-[100%] items-center justify-center'>
        <div
        className="m-4 rounded-lg bg-neutral-50 px-6 py-5 text-base text-neutral-600"
        role="alert">
        {value}
        </div>
    </div>
  )
}

export default Alert