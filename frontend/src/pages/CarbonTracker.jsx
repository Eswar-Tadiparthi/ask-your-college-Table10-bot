import React, { useState } from "react";
import "./CarbonTracker.css";


/* =========================================================
   SAMPLE BACKEND OBJECTS
   Backend team can remove/replace these later.
   ========================================================= */

const sampleHistoricalRecords = [
  {
    id: 1,
    type: "transport",
    title: "Sample Transport Record",
    details: "Sample data • Today",
    emission: "--",
    icon: "🚗",
  },
  {
    id: 2,
    type: "energy",
    title: "Sample Energy Record",
    details: "Sample data • Yesterday",
    emission: "--",
    icon: "⚡",
  },
  {
    id: 3,
    type: "water",
    title: "Sample Water Record",
    details: "Sample data • 2 days ago",
    emission: "--",
    icon: "💧",
  },
  {
    id: 4,
    type: "food",
    title: "Sample Food Record",
    details: "Sample data • 3 days ago",
    emission: "--",
    icon: "🍽️",
  },
  {
    id: 5,
    type: "waste",
    title: "Sample Waste Record",
    details: "Sample data • 4 days ago",
    emission: "--",
    icon: "♻️",
  },
];


const sampleMonthlySummary = {
  totalLoggedEmissions: "--",
  averageDailyEmissions: "--",
  reductionVsLastMonth: "--",
};


/* =========================================================
   CATEGORY CONFIGURATION
   ========================================================= */

const categories = [
  {
    id: "transport",
    label: "Transport",
  },
  {
    id: "energy",
    label: "Energy",
  },
  {
    id: "food",
    label: "Food",
  },
  {
    id: "waste",
    label: "Waste",
  },
  {
    id: "water",
    label: "Water Usage",
  },
];


/* =========================================================
   CARBON TRACKER
   ========================================================= */

function CarbonTracker({ user }) {

  const [activeCategory, setActiveCategory] =
    useState("transport");


  /* =======================================================
     TRANSPORT
     ======================================================= */

  const [transportData, setTransportData] = useState({
    transportationType: "Gasoline Car (Medium)",
    distance: "10",
    activityDate: "2026-09-11",
    passengers: "1",
  });


  /* =======================================================
     ENERGY
     ======================================================= */

  const [energyData, setEnergyData] = useState({
    energyType: "Electricity",
    consumption: "10",
    activityDate: "2026-09-11",
    usagePeriod: "Daily",
  });


  /* =======================================================
     FOOD
     ======================================================= */

  const [foodData, setFoodData] = useState({
    foodType: "Vegetarian",
    meals: "3",
    activityDate: "2026-09-11",
    mealType: "Lunch",
  });


  /* =======================================================
     WASTE
     ======================================================= */

  const [wasteData, setWasteData] = useState({
    wasteType: "Household Waste",
    quantity: "2.5",
    activityDate: "2026-09-11",
    disposalMethod: "Recycled",
  });


  /* =======================================================
     WATER
     ======================================================= */

  const [waterData, setWaterData] = useState({
    usageType: "Household",
    waterConsumed: "120",
    activityDate: "2026-09-11",
    usageSource: "Tap Water",
  });


  /* =======================================================
     GENERIC CHANGE HANDLER
     ======================================================= */

  const updateData = (setter) => (event) => {

    const { name, value } = event.target;

    setter((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =======================================================
     ACTIVE DATA
     ======================================================= */

  const getActiveData = () => {

    switch (activeCategory) {

      case "transport":
        return transportData;

      case "energy":
        return energyData;

      case "food":
        return foodData;

      case "waste":
        return wasteData;

      case "water":
        return waterData;

      default:
        return {};
    }
  };


  /* =======================================================
     LOG ACTIVITY
     ======================================================= */

  const handleLogActivity = () => {

    const data = getActiveData();

    /*
      Backend team can replace this section with API call.

      Example:

      await fetch("/api/carbon/activity", {
        method: "POST",
        body: JSON.stringify({
          category: activeCategory,
          ...data
        })
      });
    */

    console.log("Activity ready for backend:", {
      category: activeCategory,
      ...data,
    });

    alert(
      "Activity record prepared. Backend API can be connected here."
    );
  };


  /* =======================================================
     RENDER FORM
     ======================================================= */

  const renderForm = () => {

    /* -----------------------------------------------------
       TRANSPORT
       ----------------------------------------------------- */

    if (activeCategory === "transport") {

      return (
        <div className="activity-grid">

          <div className="field-group">
            <label>Transportation Type</label>

            <select
              name="transportationType"
              value={transportData.transportationType}
              onChange={updateData(setTransportData)}
            >
              <option>Gasoline Car (Medium)</option>
              <option>Gasoline Car (Small)</option>
              <option>Diesel Car</option>
              <option>Electric Car</option>
              <option>Motorcycle</option>
              <option>Bus</option>
              <option>Train</option>
              <option>Taxi</option>
            </select>
          </div>


          <div className="field-group">
            <label>Distance Traveled (km)</label>

            <input
              type="number"
              min="0"
              name="distance"
              value={transportData.distance}
              onChange={updateData(setTransportData)}
            />
          </div>


          <div className="field-group">
            <label>Activity Date</label>

            <input
              type="date"
              name="activityDate"
              value={transportData.activityDate}
              onChange={updateData(setTransportData)}
            />
          </div>


          <div className="field-group">
            <label>Number of Passengers</label>

            <select
              name="passengers"
              value={transportData.passengers}
              onChange={updateData(setTransportData)}
            >
              <option value="1">1 (Solo)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>

        </div>
      );
    }


    /* -----------------------------------------------------
       ENERGY
       ----------------------------------------------------- */

    if (activeCategory === "energy") {

      return (
        <div className="activity-grid">

          <div className="field-group">
            <label>Energy Type</label>

            <select
              name="energyType"
              value={energyData.energyType}
              onChange={updateData(setEnergyData)}
            >
              <option>Electricity</option>
              <option>Natural Gas</option>
              <option>LPG</option>
              <option>Solar Energy</option>
              <option>Other</option>
            </select>
          </div>


          <div className="field-group">
            <label>Energy Consumed (kWh)</label>

            <input
              type="number"
              min="0"
              name="consumption"
              value={energyData.consumption}
              onChange={updateData(setEnergyData)}
            />
          </div>


          <div className="field-group">
            <label>Activity Date</label>

            <input
              type="date"
              name="activityDate"
              value={energyData.activityDate}
              onChange={updateData(setEnergyData)}
            />
          </div>


          <div className="field-group">
            <label>Usage Period</label>

            <select
              name="usagePeriod"
              value={energyData.usagePeriod}
              onChange={updateData(setEnergyData)}
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

        </div>
      );
    }


    /* -----------------------------------------------------
       FOOD
       ----------------------------------------------------- */

    if (activeCategory === "food") {

      return (
        <div className="activity-grid">

          <div className="field-group">
            <label>Food Type</label>

            <select
              name="foodType"
              value={foodData.foodType}
              onChange={updateData(setFoodData)}
            >
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Non-Vegetarian</option>
              <option>Mixed Diet</option>
            </select>
          </div>


          <div className="field-group">
            <label>Number of Meals</label>

            <input
              type="number"
              min="0"
              name="meals"
              value={foodData.meals}
              onChange={updateData(setFoodData)}
            />
          </div>


          <div className="field-group">
            <label>Activity Date</label>

            <input
              type="date"
              name="activityDate"
              value={foodData.activityDate}
              onChange={updateData(setFoodData)}
            />
          </div>


          <div className="field-group">
            <label>Meal Type</label>

            <select
              name="mealType"
              value={foodData.mealType}
              onChange={updateData(setFoodData)}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </div>

        </div>
      );
    }


    /* -----------------------------------------------------
       WASTE
       ----------------------------------------------------- */

    if (activeCategory === "waste") {

      return (
        <div className="activity-grid">

          <div className="field-group">
            <label>Waste Type</label>

            <select
              name="wasteType"
              value={wasteData.wasteType}
              onChange={updateData(setWasteData)}
            >
              <option>Household Waste</option>
              <option>Food Waste</option>
              <option>Plastic Waste</option>
              <option>Paper Waste</option>
              <option>Electronic Waste</option>
              <option>Organic Waste</option>
            </select>
          </div>


          <div className="field-group">
            <label>Waste Quantity (kg)</label>

            <input
              type="number"
              min="0"
              name="quantity"
              value={wasteData.quantity}
              onChange={updateData(setWasteData)}
            />
          </div>


          <div className="field-group">
            <label>Activity Date</label>

            <input
              type="date"
              name="activityDate"
              value={wasteData.activityDate}
              onChange={updateData(setWasteData)}
            />
          </div>


          <div className="field-group">
            <label>Disposal Method</label>

            <select
              name="disposalMethod"
              value={wasteData.disposalMethod}
              onChange={updateData(setWasteData)}
            >
              <option>Recycled</option>
              <option>Composted</option>
              <option>Landfill</option>
              <option>Incinerated</option>
              <option>Other</option>
            </select>
          </div>

        </div>
      );
    }


    /* -----------------------------------------------------
       WATER
       ----------------------------------------------------- */

    if (activeCategory === "water") {

      return (
        <div className="activity-grid">

          <div className="field-group">
            <label>Water Usage Type</label>

            <select
              name="usageType"
              value={waterData.usageType}
              onChange={updateData(setWaterData)}
            >
              <option>Household</option>
              <option>Drinking</option>
              <option>Bathing</option>
              <option>Cooking</option>
              <option>Cleaning</option>
              <option>Other</option>
            </select>
          </div>


          <div className="field-group">
            <label>Water Consumed (Liters)</label>

            <input
              type="number"
              min="0"
              name="waterConsumed"
              value={waterData.waterConsumed}
              onChange={updateData(setWaterData)}
            />
          </div>


          <div className="field-group">
            <label>Activity Date</label>

            <input
              type="date"
              name="activityDate"
              value={waterData.activityDate}
              onChange={updateData(setWaterData)}
            />
          </div>


          <div className="field-group">
            <label>Usage Source</label>

            <select
              name="usageSource"
              value={waterData.usageSource}
              onChange={updateData(setWaterData)}
            >
              <option>Tap Water</option>
              <option>Ground Water</option>
              <option>Rain Water</option>
              <option>Bottled Water</option>
              <option>Other</option>
            </select>
          </div>

        </div>
      );
    }

    return null;
  };


  /* =======================================================
     MAIN UI
     ======================================================= */

  return (

    <div className="carbon-page">

      {/* ===================================================
          PAGE HEADER
          =================================================== */}

      <div className="carbon-page-header">

        <h1>
          Carbon Footprint Tracker
        </h1>

        <p>
          Log &amp; Calculate Activity Emissions - For:
          <strong>
            {" "}
            {user?.name || "User"}
          </strong>
        </p>

      </div>


      {/* ===================================================
          MAIN TWO COLUMN AREA
          =================================================== */}

      <div className="tracker-layout">


        {/* =================================================
            LEFT CARD
            ================================================= */}

        <section className="tracker-card">

          <div className="card-header">

            <h2>
              Log Daily Activity
            </h2>

            <p>
              Select a tracking category to calculate carbon output
            </p>

          </div>


          {/* ===============================================
              CATEGORY BUTTONS
              =============================================== */}

          <div className="category-tabs">

            {categories.map((category) => (

              <button
                key={category.id}
                className={
                  activeCategory === category.id
                    ? "category-tab active"
                    : "category-tab"
                }
                onClick={() =>
                  setActiveCategory(category.id)
                }
              >
                {category.label}
              </button>

            ))}

          </div>


          {/* ===============================================
              FORM
              =============================================== */}

          {renderForm()}


          {/* ===============================================
              EMISSION OUTPUT
              =============================================== */}

          <div className="emission-box">

            <div>

              <div className="emission-title">
                Estimated Carbon Emission Output
              </div>

              <div className="emission-value">
                -- <span>kg CO₂e</span>
              </div>

            </div>

            <div className="emission-formula">
              Formula will be provided by backend
            </div>

          </div>


          {/* ===============================================
              LOG BUTTON
              =============================================== */}

          <button
            className="log-button"
            onClick={handleLogActivity}
          >
            + Log Activity Record
          </button>


          {/* ===============================================
              CATEGORY BREAKDOWN
              =============================================== */}

          <div className="breakdown">

            <h2>
              Category Emissions Breakdown
            </h2>


            <BreakdownRow
              title="Transportation"
              value="--%"
              width="0%"
            />

            <BreakdownRow
              title="Energy Consumption"
              value="--%"
              width="0%"
            />

            <BreakdownRow
              title="Food & Diet"
              value="--%"
              width="0%"
            />

            <BreakdownRow
              title="Water & Waste"
              value="--%"
              width="0%"
            />

          </div>

        </section>


        {/* =================================================
            RIGHT CARD
            ================================================= */}

        <aside className="history-card">

          <div className="card-header">

            <h2>
              Historical Activity Records
            </h2>

            <p>
              Recent entries logged into backend
            </p>

          </div>


          {/* ===============================================
              HISTORY LIST
              =============================================== */}

          <div className="history-list">

            {sampleHistoricalRecords.map((record) => (

              <div
                className="history-item"
                key={record.id}
              >

                <div
                  className={`history-icon ${record.type}`}
                >
                  {record.icon}
                </div>


                <div className="history-content">

                  <div className="history-title">
                    {record.title}
                  </div>

                  <div className="history-details">
                    {record.details}
                  </div>

                </div>


                <div className="history-emission">
                  {record.emission} kg
                </div>

              </div>

            ))}

          </div>


          {/* ===============================================
              MONTHLY SUMMARY
              =============================================== */}

          <div className="monthly-summary">

            <h3>
              Monthly Impact Summary
            </h3>


            <div className="summary-row">

              <span>
                Total Logged Emissions
              </span>

              <strong>
                {sampleMonthlySummary.totalLoggedEmissions}
                {" "}
                kg CO₂e
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Avg. Daily Emissions
              </span>

              <strong>
                {sampleMonthlySummary.averageDailyEmissions}
                {" "}
                kg/day
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Reduction vs. Last Month
              </span>

              <strong className="green-text">
                {sampleMonthlySummary.reductionVsLastMonth}
                %
              </strong>

            </div>


            <div className="summary-progress">

              <div className="summary-progress-fill"></div>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}


/* =========================================================
   BREAKDOWN COMPONENT
   ========================================================= */

function BreakdownRow({
  title,
  value,
  width,
}) {

  return (

    <div className="breakdown-row">

      <div className="breakdown-label">

        <span>
          {title}
        </span>

        <span>
          {value}
        </span>

      </div>

      <div className="progress-track">

        <div
          className="progress-fill"
          style={{
            width: width,
          }}
        ></div>

      </div>

    </div>
  );
}


export default CarbonTracker;