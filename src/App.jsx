import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  ParkingCircle,
  Settings,
  LogOut,
  Bell,
  Search,
  User,
} from "lucide-react";
import AddSlot from "./components/AddSlot";
import OutputPanel from "./components/OutputPanel";
import ParkRemove from "./components/ParkRemove";
import SlotList from "./components/SlotList";

const App = () => {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Load slots from localStorage
  useEffect(() => {
    const savedSlots = localStorage.getItem("parkingSlots");
    if (savedSlots) setSlots(JSON.parse(savedSlots));
  }, []);

  // Save slots to localStorage whenever slots change
  useEffect(() => {
    localStorage.setItem("parkingSlots", JSON.stringify(slots));
  }, [slots]);

  // Auto-clear messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "add", label: "Add Slot", icon: PlusCircle },
    { id: "manage", label: "Management", icon: ParkingCircle },
  ];

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">
              <ParkingCircle className="text-white w-6 h-6" />
            </div>
            <h1 className="sidebar-title">
              ProTrack <span>SPS</span>
            </h1>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-link ${
                activeTab === item.id
                  ? "sidebar-link-active"
                  : "sidebar-link-inactive"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-link sidebar-link-inactive">
            <Settings className="w-5 h-5" />
            Settings
          </div>
          <div className="sidebar-link sidebar-link-inactive sidebar-logout">
            <LogOut className="w-5 h-5" />
            Logout
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="main-header">
          <div className="search-bar">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search for slots..."
              aria-label="Search for slots"
            />
          </div>

          <div className="header-right">
            <button className="icon-button" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="badge-dot" />
            </button>
            <div className="divider-vertical" />
            <div className="header-user">
              <div className="user-meta">
                <p className="user-meta-title">Admin User</p>
                <p className="user-meta-subtitle">System Manager</p>
              </div>
              <div className="header-user-icon">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="page-content stack-gap-lg">
          <OutputPanel message={message} onClose={() => setMessage("")} />

          {activeTab === "overview" && <SlotList slots={slots} />}

          {activeTab === "add" && (
            <div className="add-slot-card animate-fadeIn">
              <div className="glass-card">
                <AddSlot
                  slots={slots}
                  setSlots={setSlots}
                  setMessage={setMessage}
                />
              </div>
            </div>
          )}

          {activeTab === "manage" && (
            <div className="vehicle-management animate-fadeIn">
              <ParkRemove
                slots={slots}
                setSlots={setSlots}
                setMessage={setMessage}
              />

              <div className="glass-card smart-tips">
                <div className="smart-tips-inner">
                  <h3 className="add-slot-title">Smart Tips</h3>
                  <p className="section-subtitle">
                    Always verify the EV charging status before parking an
                    electric vehicle. The system automatically calculates the
                    nearest available slot based on customer needs.
                  </p>
                  <div className="pill-row">
                    <span>Efficiency</span>
                    <span>AI Priority</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
