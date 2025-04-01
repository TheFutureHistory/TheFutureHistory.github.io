import React from "react";

const Menu = () => {
    return (
      <nav className="p-4 bg-gray-900 text-white flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">Life Progress Tracker</div>
        <ul className="flex space-x-6">
          <li><button to="/accomplishments" className="hover:text-gray-400">Accomplishments</button></li>
          <li><button to="/fitness" className="hover:text-gray-400">Fitness</button></li>
          <li><button to="/finance" className="hover:text-gray-400">Finance</button></li>
          <li><button to="/career" className="hover:text-gray-400">Career</button></li>
          <li><button to="/education" className="hover:text-gray-400">Education</button></li>
          <li><button to="/mental-health" className="hover:text-gray-400">Mental Health</button></li>
          <li><button to="/relationships" className="hover:text-gray-400">Relationships</button></li>
          <li><button to="/hobbies" className="hover:text-gray-400">Hobbies</button></li>
        </ul>
      </nav>
    );
  };
  
  export default Menu;