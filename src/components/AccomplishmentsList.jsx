import React from "react";

function AccomplishmentsList({ accomplishments, setAccomplishments, calendarData, setCalendarData, selectedDate }) {
  const editAccomplishment = (id) => {
    const newText = prompt("Edit your accomplishment:");
    if (newText) {
      setAccomplishments(accomplishments.map(acc => acc.id === id ? { ...acc, text: newText } : acc));
    }
  };

  const deleteAccomplishment = (id) => {
    if (!window.confirm("Are you sure you want to delete this accomplishment?")) return;

    const deletedAcc = accomplishments.find(acc => acc.id === id);
    if (!deletedAcc) return;

    const dateString = deletedAcc.date;
    const updatedAccomplishments = accomplishments.filter(acc => acc.id !== id);

    const newCalendarData = { ...calendarData };
    newCalendarData[dateString] = Math.max((newCalendarData[dateString] || 1) - 1, 0);
    if (newCalendarData[dateString] === 0) delete newCalendarData[dateString];

    setAccomplishments(updatedAccomplishments);
    setCalendarData(newCalendarData);
  };

  const filteredAccomplishments = accomplishments.filter(acc => acc.date === selectedDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }));

  return (
    <div className="AppData">
      <h2>{selectedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</h2>
      {filteredAccomplishments.length > 0 ? (
        <ul className="list">
          {filteredAccomplishments.map((acc) => (
            <li key={acc.id}>
              <p className="accomplishmentItem">{acc.time} : {acc.text}</p>
              <div className="accomplishmentsMenu">
                <button onClick={() => editAccomplishment(acc.id)}>Edit</button>
                <button onClick={() => deleteAccomplishment(acc.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accomplishments found.</p>
      )}
    </div>
  );
}

export default AccomplishmentsList;
