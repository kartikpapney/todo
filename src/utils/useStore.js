import { useState } from 'react';

const useStore = () => {
    // localStorage.removeItem('todo')
    const localData = localStorage.getItem('todo-data');
    const [data, setData] = useState(localData?JSON.parse(localData):[]);

    const setLocalData = (newData) => {
        if(newData) {
            setData(newData)
            localStorage.setItem('todo-data', JSON.stringify(newData));
        }
        
    };

    return [data, setLocalData];
};

export default useStore;