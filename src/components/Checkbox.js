import React from 'react'

function Checkbox({props}) {
    const {done, setCitems, citems, idx} = props;
    return (
        <input 
            checked={done}
            type="checkbox"
            className="w-5 h-5 text-black bg-white border-2 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 transition-colors duration-200"
            onChange={() => {
                const updatedCitems = JSON.parse(JSON.stringify(citems));
                updatedCitems[idx].done = !updatedCitems[idx].done;
                setCitems(updatedCitems);
            }}
        />
    )
}

export default Checkbox