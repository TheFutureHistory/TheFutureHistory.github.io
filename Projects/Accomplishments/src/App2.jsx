import React, { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import AccomplishmentsList from "./components/AccomplishmentsList";
import AccomplishmentInput from "./components/AccomplishmentInput";
import Header from "./components/Header";

function App() {
  const [accomplishments, setAccomplishments] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const storedAccomplishments = JSON.parse(localStorage.getItem("accomplishments")) || [];
    const storedCalendarData = JSON.parse(localStorage.getItem("calendarData")) || {};
    setAccomplishments(storedAccomplishments);
    setCalendarData(storedCalendarData);
  }, []);

  useEffect(() => {
    localStorage.setItem("accomplishments", JSON.stringify(accomplishments));
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [accomplishments, calendarData]);

  return (
    <div className="App">
      <Header count={accomplishments.length} className='AppHeader'/>
      <CalendarView calendarData={calendarData} selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <AccomplishmentInput accomplishments={accomplishments} setAccomplishments={setAccomplishments} 
        calendarData={calendarData} setCalendarData={setCalendarData} selectedDate={selectedDate} />
      <AccomplishmentsList accomplishments={accomplishments} setAccomplishments={setAccomplishments} 
        calendarData={calendarData} setCalendarData={setCalendarData} selectedDate={selectedDate} />
    </div>
  );
}

export default App;
