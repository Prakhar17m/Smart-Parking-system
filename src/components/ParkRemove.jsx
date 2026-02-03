import { useState } from "react";
import {
  ParkingCircle,
  Trash2,
  Zap,
  Home,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function ParkRemove({ slots, setSlots, setMessage }) {
  const [needsEV, setNeedsEV] = useState(false);
  const [needsCover, setNeedsCover] = useState(false);
  const [removeSlotNo, setRemoveSlotNo] = useState("");

  const parkVehicle = () => {
    let available = slots.filter(s => !s.isOccupied);
    if (needsEV) available = available.filter(s => s.isEVCharging);
    if (needsCover) available = available.filter(s => s.isCovered);

    if (!available.length) {
      setMessage("No compatible slot available");
      return;
    }

    available.sort((a, b) => a.slotNo - b.slotNo);
    const chosen = available[0];

    setSlots(slots.map(s =>
      s.slotNo === chosen.slotNo ? { ...s, isOccupied: true } : s
    ));

    setMessage(`Vehicle parked successfully at Slot #${chosen.slotNo}`);
  };

  const removeVehicle = () => {
    const slotNum = Number(removeSlotNo);
    const slot = slots.find(s => s.slotNo === slotNum);

    if (!slot) {
      setMessage("Invalid slot identification");
      return;
    }

    if (!slot.isOccupied) {
      setMessage("Slot is already vacant");
      return;
    }

    setSlots(slots.map(s =>
      s.slotNo === slotNum ? { ...s, isOccupied: false } : s
    ));

    setMessage(`Slot #${slotNum} has been released`);
    setRemoveSlotNo("");
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <h2 className="section-title flex items-center gap-3">
        <span className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
          <ParkingCircle className="w-5 h-5" />
        </span>
        Vehicle Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Entry Assignment */}
        <div className="glass-card">
          <h3 className="card-title text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Entry Assignment
          </h3>

          <div className="flex gap-6 my-6">
            <PremiumToggle
              checked={needsEV}
              onChange={setNeedsEV}
              icon={<Zap className="w-4 h-4" />}
              label="EV Charging"
            />

            <PremiumToggle
              checked={needsCover}
              onChange={setNeedsCover}
              icon={<Home className="w-4 h-4" />}
              label="Covered Slot"
            />
          </div>

          <button
            onClick={parkVehicle}
            className="btn-success w-full"
          >
            <ParkingCircle className="w-4 h-4" />
            Assign Smart Slot
          </button>
        </div>

        {/* Exit Clearance */}
        <div className="glass-card">
          <h3 className="card-title text-rose-600 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Exit Clearance
          </h3>

          <div className="relative my-6">
            <input
              type="number"
              placeholder="Enter Slot ID"
              value={removeSlotNo}
              onChange={e => setRemoveSlotNo(e.target.value)}
              className="premium-input pl-11"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          </div>

          <button
            onClick={removeVehicle}
            className="btn-danger w-full"
          >
            <AlertCircle className="w-4 h-4" />
            Finalize Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ParkRemove;

/* ------------------ Helper Component ------------------ */

function PremiumToggle({ checked, onChange, icon, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="premium-checkbox"
      />
      <div
        className={`flex items-center gap-2 text-sm font-semibold transition ${
          checked ? "text-indigo-600" : "text-slate-500"
        }`}
      >
        {icon}
        {label}
      </div>
    </label>
  );
}
