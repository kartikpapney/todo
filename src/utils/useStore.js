import { useState } from 'react';

const useStore = () => {
    const localData = localStorage.getItem('todo')||"";
    const [data, setData] = useState(JSON.parse(localData));

    const setLocalData = (newData) => {
        setData(newData)
        localStorage.setItem('todo', JSON.stringify(newData));
    };

    return [data, setLocalData];
};

export default useStore;