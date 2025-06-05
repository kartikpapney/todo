import './App.css';
import Search from './components/Search'
import Items from './components/Items';
import { useEffect, useState } from 'react';
import Alert from './components/Alert';
import useStore from './utils/useStore';
import { Helmet } from 'react-helmet';
import logo from './logo.png';
function App() {
  const [alert, setAlert] = useState('');
  const [items, setItems] = useStore([]);
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  // Helper functions for date navigation
  const goToPreviousDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  // Helper function to format date display
  const formatDateDisplay = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    if (dateStr === today) return "Today";
    if (dateStr === yesterday) return "Yesterday";
    if (dateStr === tomorrow) return "Tomorrow";
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Migration: Add createdAt field to existing tasks
  useEffect(() => {
    const migratedItems = items.map(item => {
      if (!item.createdAt) {
        return {
          ...item,
          createdAt: new Date().toISOString().split('T')[0] // Default to today for existing tasks
        };
      }
      return item;
    });
    
    // Only update if migration is needed
    if (items.some(item => !item.createdAt)) {
      setItems(migratedItems);
    }
  }, [items, setItems]);

  useEffect(() => {
    if(alert) {
      const interval = setInterval(() => {
        setAlert('');
      }, 2000); // Increased to 2 seconds for better UX
      return function() {
        clearInterval(interval)
      }
    }
  }, [alert])

  return (
    <div className="min-h-screen bg-white flex justify-center py-8 px-4">
      <Helmet>
        <title>Tasks - {formatDateDisplay(selectedDate)}</title>
      </Helmet>
       <div className='w-full max-w-2xl'>
        
        {/* Date Header */}
        <div className="text-center mb-8">
          
          {/* Date selector with navigation */}
          <div className="flex flex-col items-center gap-4">
            {/* Date navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={goToPreviousDay}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-black"
                title="Previous day"
              >
                &lt;
              </button>
              
              <div className="text-center min-w-[200px]">
                <div className="flex items-center justify-center text-lg font-medium text-black">
                  <img 
                    src={logo} 
                    alt="Todo App Logo" 
                    className="h-5 w-5 mr-2" 
                  />
                  {formatDateDisplay(selectedDate)}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              
              <button
                onClick={goToNextDay}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-black"
                title="Next day"
              >
                &gt;
              </button>
            </div>
            
            {/* Today button at bottom */}
            {selectedDate !== new Date().toISOString().split('T')[0] && (
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm text-gray-500 hover:text-black border border-gray-300 hover:border-black rounded-lg transition-all duration-200"
              >
                Go to Today
              </button>
            )}
          </div>
        </div>

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
                search,
                setSearch,
                selectedDate
              }}/>
            {
              items.filter(item => item.createdAt === selectedDate).length === 0?
              <div className='flex flex-col items-center justify-center py-16'>
                  <div className="text-6xl mb-4">✓</div>
                  <div className="text-lg text-gray-400 font-light">
                    {selectedDate === new Date().toISOString().split('T')[0] 
                      ? "All done for today! Nothing to worry about." 
                      : `No tasks for ${formatDateDisplay(selectedDate)}.`
                    }
                  </div>
              </div>
              :
              <Items 
              props={{
                items,
                setItems,
                setAlert,
                searchTerm: search,
                selectedDate
              }}/>
            }
          </>
        }
       </div>
    </div>
  );
}


export default App;