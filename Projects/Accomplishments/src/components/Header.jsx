import React from "react";

function Header({ count }) {
  return (
    <div className="AppHeader">
      <h1>Count Your Accomplishments ({count})</h1>
    </div>
  );
}

export default Header;
