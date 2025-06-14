import './App.css';
import Search from './components/Search'
import Items from './components/Items';
import { useEffect, useState } from 'react';
import Alert from './components/Alert';
import useStore from './utils/useStore';
import { exportTasksToCSV } from './utils/exportUtils';
import { Helmet } from 'react-helmet';
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

  // Export functions
  const exportCurrentDayTasks = () => {
    const tasksToExport = items.filter(item => item.createdAt === selectedDate);
    if (tasksToExport.length === 0) {
      setAlert('No tasks to export for this day');
      return;
    }
    exportTasksToCSV(tasksToExport, 'filtered', selectedDate);
    setAlert('Tasks exported successfully');
  };

  const exportAllTasks = () => {
    if (items.length === 0) {
      setAlert('No tasks to export');
      return;
    }
    exportTasksToCSV(items, 'all', selectedDate);
    setAlert('All tasks exported successfully');
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
        {/* Header */}
        <div className="text-center mb-8">
          
          {/* Date selector with navigation */}
          <div className="flex flex-col items-center gap-4">
            {/* Date navigation */}
            <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
              <button
                onClick={goToPreviousDay}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-black"
                title="Previous day"
              >
                &lt;
              </button>
              
              <div className="text-center flex-1 max-w-[200px]">
                <div className="text-lg font-medium text-black truncate">
                  {formatDateDisplay(selectedDate)}
                </div>
                <div className="text-sm text-gray-500 truncate">
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
            
            {/* Today button at bottom - always visible */}
            <button
              onClick={goToToday}
              className={`px-4 py-2 text-sm ${selectedDate === new Date().toISOString().split('T')[0] ? 'text-gray-400 border-gray-200' : 'text-gray-500 hover:text-black border-gray-300 hover:border-black'} border rounded-lg transition-all duration-200`}
              disabled={selectedDate === new Date().toISOString().split('T')[0]}
            >
              {selectedDate === new Date().toISOString().split('T')[0] ? "Current Day" : "Go to Today"}
            </button>

            {/* Export options */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <button
                onClick={exportCurrentDayTasks}
                className="px-3 py-1.5 text-sm text-gray-500 hover:text-black border border-gray-300 hover:border-black rounded-lg transition-all duration-200 flex items-center gap-1"
                title="Export tasks for this day"
              >
                <span className="hidden sm:inline">Export</span> Day
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button
                onClick={exportAllTasks}
                className="px-3 py-1.5 text-sm text-gray-500 hover:text-black border border-gray-300 hover:border-black rounded-lg transition-all duration-200 flex items-center gap-1"
                title="Export all tasks"
              >
                <span className="hidden sm:inline">Export</span> All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
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