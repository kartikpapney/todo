import './App.css';
import Search from './components/Search'
import Items from './components/Items';
import { useEffect, useState } from 'react';
import Alert from './components/Alert';
import useStore from './utils/useStore';
function App() {
  const [alert, setAlert] = useState('');
  const [items, setItems] = useStore([]);
  const [update, setUpdate] = useState(-1);
  const [citems, setCitems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const searchedList = items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    })
    setCitems(searchedList);
  }, [items, search])

  useEffect(() => {
    if(alert) {
      const interval = setInterval(() => {
        setAlert('');
      }, 1000);
      return function() {
        clearInterval(interval)
      }
    }
  }, [alert])

  return (
    <div className="flex bg-blue-100 justify-center min-h-screen">
       <div className='bg-blue-400 w-full max-w-md h-auto'>
      {
        alert?
          <Alert value={alert}/>
        :
        <>
          <Search 
            props={{
              items,
              setItems,
              setAlert,
              setCitems,
              citems,
              search,
              setSearch
            }}/>
          <Items 
            props={{
              update,
              setUpdate,
              items,
              setItems,
              setAlert,
              citems,
              setCitems,
            }}/>
        </>
      }
      </div>
    </div>
  );
}


export default App;