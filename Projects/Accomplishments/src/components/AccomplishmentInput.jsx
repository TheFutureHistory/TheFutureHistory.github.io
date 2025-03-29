import React, { useState } from "react";

function AccomplishmentInput({ accomplishments, setAccomplishments, calendarData, setCalendarData, selectedDate }) {
  const [newAccomplishment, setNewAccomplishment] = useState("");

  const addAccomplishment = () => {
    if (!newAccomplishment.trim()) return;

    const dateString = selectedDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
    const timeString = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const newEntry = { id: Date.now(), date: dateString, time: timeString, text: newAccomplishment };

    setAccomplishments([...accomplishments, newEntry]);
    setCalendarData({ ...calendarData, [dateString]: (calendarData[dateString] || 0) + 1 });

    setNewAccomplishment("");
  };

  return (
    <div className="add_buttonSection">
      <input
        type="text"
        value={newAccomplishment}
        onChange={(e) => setNewAccomplishment(e.target.value)}
        placeholder={`What did you get done on ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}?`}
      />
      <button className="add_button" onClick={addAccomplishment}>ADD ACCOMPLISHMENT</button>
    </div>
  );
}

export default AccomplishmentInput;
