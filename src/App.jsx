import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Import the react-calendar component
import 'react-calendar/dist/Calendar.css'; // Import the CSS for styling
import './App.css';
import './AppMobile.css';
import './components/CalendarHeatmap.css';
import './components/AccomplishmentsList.css'
import './components/AccomplishmentsListMobile.css'

function App() {
  const [accomplishments, setAccomplishments] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [newAccomplishment, setNewAccomplishment] = useState(''); // New state for input field
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // ACCOMPLISTMENTS LIST
  // Function for each accomplishment
  const addAccomplishment = () => {
      if (newAccomplishment.trim()) {
        const dateString = selectedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
    
        const timeString = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
    
        const newEntry = {
          id: Date.now(),  // Unique ID for editing/deleting
          date: dateString,
          time: timeString,  // Store the time of the accomplishment
          text: newAccomplishment,
        };
    
        const newAccomplishments = [...accomplishments, newEntry];
    
        const newCalendarData = {
          ...calendarData,
          [dateString]: (calendarData[dateString] || 0) + 1,
        };
    
        setAccomplishments(newAccomplishments);
        setCalendarData(newCalendarData);
    
        localStorage.setItem('accomplishments', JSON.stringify(newAccomplishments));
        localStorage.setItem('calendarData', JSON.stringify(newCalendarData));
    
        setNewAccomplishment('');
      }
    };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addAccomplishment(); // Trigger addAccomplishment function when "Enter" is pressed
    }
  };
  const editAccomplishment = (id) => {
      const newText = prompt("Edit your accomplishment:");
      if (newText) {
        const updatedAccomplishments = accomplishments.map(acc =>
          acc.id === id ? { ...acc, text: newText } : acc
        );
    
        setAccomplishments(updatedAccomplishments);
        localStorage.setItem('accomplishments', JSON.stringify(updatedAccomplishments));
      }
  };
  const deleteAccomplishment = (id) => {
    if (window.confirm("Are you sure you want to delete this accomplishment?")) {
      const deletedAccomplishment = accomplishments.find(acc => acc.id === id);
      
      if (!deletedAccomplishment) return;
  
      const dateString = deletedAccomplishment.date;
      const updatedAccomplishments = accomplishments.filter(acc => acc.id !== id);
      
      const newCalendarData = { ...calendarData };
  
      if (newCalendarData[dateString] > 1) {
        newCalendarData[dateString] -= 1;  // Subtract 1 if there are still items left
      } else {
        delete newCalendarData[dateString]; // Remove date key if no items remain
      }
  
      setAccomplishments(updatedAccomplishments);
      setCalendarData(newCalendarData);
  
      localStorage.setItem('accomplishments', JSON.stringify(updatedAccomplishments));
      localStorage.setItem('calendarData', JSON.stringify(newCalendarData));
    }
  };
  // Highlight accomplishment days, months, weeks, years, decades
  const tileClassName = ({ date, view }) => {
    const dateString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const dailyCount = calendarData[dateString] || 0;
    if (view === 'month') {
      if (dailyCount === 0) return 'no-accomplishment';
      if (dailyCount >= 1 && dailyCount <= 3) return 'low-accomplishment';
      if (dailyCount >= 4 && dailyCount <= 6) return 'medium-accomplishment';
      if (dailyCount >= 7 && dailyCount <= 10) return 'high-accomplishment';
      return 'very-high-accomplishment';
    }
  
    const monthString = date.toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    }).replace(',', ''); // Ensure "MM/YYYY" format
    const matchingKeys = Object.keys(calendarData).filter((key) => 
      key.split('/')[0] === monthString.split('/')[0] && // Match month
      key.split('/')[2] === monthString.split('/')[1]    // Match year
    );
    const monthlyCount = matchingKeys.reduce((sum, key) => sum + calendarData[key], 0);
    if (view === 'year') {
      if (monthlyCount === 0) return 'no-accomplishment';
      if (monthlyCount >= 1 && monthlyCount <= 3) return 'low-accomplishment';
      if (monthlyCount >= 4 && monthlyCount <= 6) return 'medium-accomplishment';
      if (monthlyCount >= 7 && monthlyCount <= 10) return 'high-accomplishment';
      return 'very-high-accomplishment';
    }

    const yearString = date.getFullYear().toString();
    const yearlyCount = Object.keys(calendarData)
      .filter((key) => key.endsWith(`/${yearString}`)) // Matches "MM/DD/YYYY" format
      .reduce((sum, key) => sum + calendarData[key], 0);
    if (view === 'decade') {
      if (yearlyCount === 0) return 'no-accomplishment';
      if (yearlyCount >= 1 && yearlyCount <= 3) return 'low-accomplishment';
      if (yearlyCount >= 4 && yearlyCount <= 6) return 'medium-accomplishment';
      if (yearlyCount >= 7 && yearlyCount <= 10) return 'high-accomplishment';
      return 'very-high-accomplishment';
    }
    
    const year = date.getFullYear();
    const decadeStart = Math.floor(year / 10) * 10; // Get the decade start (e.g., 2000 for 2001-2009)
    const decadeString = `${decadeStart}-${decadeStart + 9}`;
    const decadeCount = Object.keys(calendarData)
      .filter((key) => {
        const keyYear = parseInt(key.split('/')[2]); // Get the year part from "MM/DD/YYYY"
        const keyDecadeStart = Math.floor(keyYear / 10) * 10; // Calculate the decade
        const keyDecadeString = `${keyDecadeStart}-${keyDecadeStart + 9}`; // Formulate the decade string
        console.log(`Key: ${key}, Year: ${keyYear}, Decade: ${keyDecadeString}`); // Log key and decade
        return keyDecadeString === decadeString; // Compare to the current decade
      })
      .reduce((sum, key) => sum + calendarData[key], 0);
    if (view === 'century') {
      if (decadeCount === 0) return 'no-accomplishment';
      if (decadeCount >= 1 && decadeCount <= 3) return 'low-accomplishment';
      if (decadeCount >= 4 && decadeCount <= 6) return 'medium-accomplishment';
      if (decadeCount >= 7 && decadeCount <= 10) return 'high-accomplishment';
      return 'very-high-accomplishment';
    }

    return '';
  };
  //Filter the accomplishments based on the selected date
  const filteredAccomplishments = accomplishments.filter(
    (item) => item.date === selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  );
  // Clear Specific Dates
  const clearSelectedDateAccomplishments = () => {
    if (window.confirm(`Are you sure you want to delete all accomplishments for ${selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}?`)) {
      const dateString = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
  
      // Filter out accomplishments for the selected date
      const updatedAccomplishments = accomplishments.filter(acc => acc.date !== dateString);
  
      // Update calendarData by removing the selected date
      const newCalendarData = { ...calendarData };
      delete newCalendarData[dateString];
  
      // Update state and localStorage
      setAccomplishments(updatedAccomplishments);
      setCalendarData(newCalendarData);
      localStorage.setItem('accomplishments', JSON.stringify(updatedAccomplishments));
      localStorage.setItem('calendarData', JSON.stringify(newCalendarData));
    }
  };
  

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedAccomplishments = localStorage.getItem('accomplishments');
    const storedCalendarData = localStorage.getItem('calendarData');

    if (storedAccomplishments) {
      setAccomplishments(JSON.parse(storedAccomplishments));
    }

    if (storedCalendarData) {
      setCalendarData(JSON.parse(storedCalendarData));
    }
  }, []);
  // Day rating calculator
  const dayRating = () => {
    const dateString = selectedDate?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  
    const count = calendarData?.[dateString] || 0;
    const solidStars = Math.min(Math.floor(count / 3), 5); // Limit to 5 stars max
  
    return (
      <>
        {[...Array(5)].map((_, index) => {
          const isSolid = index < solidStars;
          return (
            <i
              key={index}
              className={`fa-${isSolid ? 'solid' : 'regular'} fa-star`}
            ></i>
          );
        })}
      </>
    );
  };
  


  // FRONT END
  return (
    <div className="App">

      <div className='AppHeader'>
      <h1>Count Your Accomplishments ({accomplishments.length})</h1>

      </div>

      <div className='AppBody'>

          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            tileContent={({ date, view }) => {
              const dateString = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              });

              const count = calendarData[dateString] || 0;

              return count > 0 ? (
                <span className="date-count"> &nbsp; ({count})</span>
              ) : null;
            }}
          />

          <div className='AppData'>

            {/* DATE */}
            <div className='selectedDateSection'>
              <h2 className="selectedDate">
                {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h2>
              <div className="DaysRating">
                {dayRating()}
              </div>

            </div>

            {/* INPUT */}
            <div className="add_buttonSection">
              <input 
                type="text"
                value={newAccomplishment}
                onChange={(e) => setNewAccomplishment(e.target.value)} // Update state on input change
                placeholder={`What did you get done on ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}?`}
                onKeyDown={handleKeyDown} // Trigger add on Enter key press
              />
              <button className='add_button' onClick={addAccomplishment}>ADD ACCOMPLISHMENT</button>
            </div>

            {/* LIST */}
            {filteredAccomplishments.length > 0 ? (
              <ul className='list'>
                {filteredAccomplishments
                  .sort((a, b) => a.text.localeCompare(b.text)) // Sort alphabetically by the text property
                  .map((acc) => (
                    <li key={acc.id}>
                      <p className='accomplishmentItem'>
                        {/* {acc.time} :  */}
                        {acc.text}
                      </p>
                      <div className='accomplishmentsMenu'>
                        <button className="editAcoomplishment" onClick={() => editAccomplishment(acc.id)}>Edit</button>
                        <button className="deleteAcoomplishment" onClick={() => deleteAccomplishment(acc.id)}>Delete</button>
                      </div>
                    </li>
                  ))}
              </ul>


              ) : (
                <p className='nodataFound'>No accomplishments found.</p>
              )}

            {/* BUTTONS */}
            <div className="clearBTNSection">
              <button className='clearSelectedDateBTN' onClick={clearSelectedDateAccomplishments}>
                {(() => {
                  // Assume selectedDate is available in the component's state
                  const dateString = selectedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  });

                  const count = calendarData[dateString] || 0;
                  return `Clear ${count}`; // Display the count for the selected date
                })()}
              </button>

              <button className='cleardataBTN' onClick={() => {
              if (window.confirm("Are you sure you wish to delete ALL your accomplishments? This action cannot be undone.")) {
                localStorage.removeItem('accomplishments');
                localStorage.removeItem('calendarData');
                setAccomplishments([]); // Reset state
                setCalendarData({});
              }
              }}>
                Clear All {accomplishments.length} 
              </button>

            </div>
          </div>
      </div>




      
    </div>
  );
}

export default App;
