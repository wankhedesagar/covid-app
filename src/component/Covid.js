import React from "react";
import "./Covid.css";

function Covid() {
  return (
    <React.Fragment>
      <h1>Covid</h1>
      <div className="container">
        <input
          type="text"
          placeholder="search country"
        />

      </div>
    </React.Fragment>
  );
}

export default Covid;
