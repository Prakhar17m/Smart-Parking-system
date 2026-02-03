import React, { useState, useEffect } from "react";
import "./index.css";
import {
  LayoutDashboard,
  PlusCircle,
  ParkingCircle,
  Settings,
  LogOut,
  Bell,
  Search,
  User
} from "lucide-react";
import AddSlot from "./components/AddSlot";
import OutputPanel from "./components/OutputPanel";
import ParkRemove from "./components/ParkRemove";
import SlotList from "./components/SlotList";

const App = () => {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const savedSlots = localStorage.getItem("parkingSlots");
    if (savedSlots) {
      setSlots(JSON.parse(savedSlots));
    }
  }, []);

  useEffect(() => {
    if (slots.length > 0) {
      localStorage.setItem("parkingSlots", JSON.stringify(slots));
    }
  }, [slots]);

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
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <ParkingCircle className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              ProTrack <span className="text-indigo-600 font-normal">SPS</span>
            </h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-link ${activeTab === item.id ? "sidebar-link-active" : "sidebar-link-inactive"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 space-y-2">
          <div className="sidebar-link sidebar-link-inactive">
            <Settings className="w-5 h-5" />
            Settings
          </div>
          <div className="sidebar-link sidebar-link-inactive text-rose-500 hover:bg-rose-50 hover:text-rose-600">
            <LogOut className="w-5 h-5" />
            Logout
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center bg-slate-100 px-4 py-2.5 rounded-xl w-96 group focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:bg-white focus-within:border-slate-300 border border-transparent transition-all">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
            <input
              type="text"
              placeholder="Search for slots..."
              className="bg-transparent border-none outline-none ml-3 text-sm w-full text-slate-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">Admin User</p>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-tighter">System Manager</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-all">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <OutputPanel message={message} />

          {activeTab === "overview" && (
            <div className="space-y-8 animate-fadeIn">
              <SlotList slots={slots} />
            </div>
          )}

          {activeTab === "add" && (
            <div className="max-w-2xl animate-fadeIn">
              <div className="glass-card">
                <AddSlot slots={slots} setSlots={setSlots} setMessage={setMessage} />
              </div>
            </div>
          )}

          {activeTab === "manage" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
              <div className="glass-card">
                <ParkRemove slots={slots} setSlots={setSlots} setMessage={setMessage} />
              </div>

              <div className="glass-card bg-indigo-900 border-none text-white relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold">Smart Tips</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Always verify the EV charging status before parking an electric vehicle.
                    The system automatically calculates the nearest available slot based on customer needs.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold backdrop-blur-md">Efficiency</span>
                    <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold backdrop-blur-md">AI Priority</span>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-10"></div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
