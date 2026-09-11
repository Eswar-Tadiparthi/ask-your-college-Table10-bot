import React from "react";

function CarbonTracker() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Carbon Footprint Tracker</h1>

      <p>
        Track your daily activities and calculate your carbon footprint.
      </p>

      <div>
        <h2>Log Daily Activity</h2>

        <button>Transport</button>
        <button>Energy</button>
        <button>Food</button>
        <button>Waste</button>
        <button>Water Usage</button>
      </div>
    </div>
  );
}

export default CarbonTracker;