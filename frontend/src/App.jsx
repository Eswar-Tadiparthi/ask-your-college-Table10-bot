import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import CarbonTracker from "./pages/CarbonTracker";
import "./style.css";

/* =========================================================
   SAMPLE USER OBJECT
   Backend team can replace this with actual logged-in user
   ========================================================= */
const currentUser = {
  id: "",
  name: "User",
  email: "",
};

/* =========================================================
   SIDEBAR
   ========================================================= */
function Sidebar() {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: "⌂",
    },
    {
      name: "Carbon Tracker",
      path: "/carbon-tracker",
      icon: "◯",
    },
    {
      name: "Goals",
      path: "/goals",
      icon: "◎",
    },
    {
      name: "Challenges",
      path: "/challenges",
      icon: "♜",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "▦",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "▤",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "♙",
    },
  ];

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-symbol">◉</div>

        <div>
          <div className="logo-title">EcoTrack</div>
          <div className="logo-subtitle">Carbon Management</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>
    </aside>
  );
}


/* =========================================================
   TOP HEADER
   ========================================================= */
function TopHeader() {
  return (
    <header className="top-header">

      <div className="header-spacer"></div>

      <div className="header-right">

        {/* Notification */}
        <button className="notification-button">
          🔔
          <span className="notification-dot"></span>
        </button>

        {/* User */}
        <div className="user-menu">

          <div className="user-circle">
            ●
          </div>

          <span className="user-name">
            {currentUser.name}
          </span>

          <span className="user-arrow">
            ˅
          </span>

        </div>

      </div>

    </header>
  );
}


/* =========================================================
   BLANK / PLACEHOLDER PAGE
   ========================================================= */
function BlankPage() {
  return <div className="blank-page"></div>;
}


/* =========================================================
   APP
   ========================================================= */
function App() {
  return (
    <BrowserRouter>

      <div className="app-layout">

        {/* Permanent sidebar */}
        <Sidebar />

        {/* Main side */}
        <div className="main-area">

          {/* Header */}
          <TopHeader />

          {/* Pages */}
          <main className="page-container">

            <Routes>

              <Route
                path="/"
                element={<BlankPage />}
              />

              <Route
                path="/carbon-tracker"
                element={
                  <CarbonTracker user={currentUser} />
                }
              />

              <Route
                path="/goals"
                element={<BlankPage />}
              />

              <Route
                path="/challenges"
                element={<BlankPage />}
              />

              <Route
                path="/dashboard"
                element={<BlankPage />}
              />

              <Route
                path="/reports"
                element={<BlankPage />}
              />

              <Route
                path="/profile"
                element={<BlankPage />}
              />

              {/* Unknown URL */}
              <Route
                path="*"
                element={<BlankPage />}
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;