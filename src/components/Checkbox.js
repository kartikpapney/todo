import React from 'react'

function Checkbox({props}) {
    const {done, setCitems, citems, idx} = props;
    return (
        <input checked={done}
            type="checkbox"
            className="ml-2 w-4 h-4 to-blue-200 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => {
                const updatedCitems = JSON.parse(JSON.stringify(citems));
                updatedCitems[idx].done = !updatedCitems[idx].done;
                setCitems(updatedCitems);
            }}
        />
    )
}

export default Checkbox