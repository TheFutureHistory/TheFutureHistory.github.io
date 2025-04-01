import React from "react";
import Calendar from "react-calendar";

function CalendarView({ calendarData, selectedDate, onDateChange }) {
  const tileClassName = ({ date }) => {
    const dateString = date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
    const count = calendarData[dateString] || 0;
    return count > 0 ? "has-accomplishment" : "";
  };

  return (
    <Calendar
      onChange={onDateChange}
      value={selectedDate}
      tileClassName={tileClassName}
      tileContent={({ date }) => {
        const dateString = date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
        const count = calendarData[dateString] || 0;
        return count > 0 ? <span className="date-count">({count})</span> : null;
      }}
    />
  );
}

export default CalendarView;
