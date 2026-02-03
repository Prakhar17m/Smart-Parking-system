import { useState } from "react";
import {
  ParkingCircle,
  Trash2,
  Zap,
  Home,
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function ParkRemove({ slots, setSlots, setMessage }) {
  const [needsEV, setNeedsEV] = useState(false);
  const [needsCover, setNeedsCover] = useState(false);
  const [removeSlotNo, setRemoveSlotNo] = useState("");

  const parkVehicle = () => {
    let available = slots.filter((s) => !s.isOccupied);
    if (needsEV) available = available.filter((s) => s.isEVCharging);
    if (needsCover) available = available.filter((s) => s.isCovered);

    if (!available.length) {
      setMessage("No compatible slot available");
      return;
    }

    available.sort((a, b) => a.slotNo - b.slotNo);
    const chosen = available[0];

    setSlots(
      slots.map((s) =>
        s.slotNo === chosen.slotNo ? { ...s, isOccupied: true } : s,
      ),
    );

    setMessage(`Vehicle parked successfully at Slot #${chosen.slotNo}`);
  };

  const removeVehicle = () => {
    const slotNum = Number(removeSlotNo);
    const slot = slots.find((s) => s.slotNo === slotNum);

    if (!slot) {
      setMessage("Invalid slot identification");
      return;
    }

    if (!slot.isOccupied) {
      setMessage("Slot is already vacant");
      return;
    }

    setSlots(
      slots.map((s) =>
        s.slotNo === slotNum ? { ...s, isOccupied: false } : s,
      ),
    );

    setMessage(`Slot #${slotNum} has been released`);
    setRemoveSlotNo("");
  };

  return (
    <div className="stack-gap-lg">
      {/* Header */}
      <h2 className="section-title">
        <span className="section-pill">
          <ParkingCircle className="w-5 h-5" />
        </span>
        Vehicle Management
      </h2>

      <div className="vehicle-management">
        {/* Entry Assignment */}
        <div className="glass-card">
          <div className="card-subtitle">
            <CheckCircle2 className="w-4 h-4" />
            Entry Assignment
          </div>

          <div className="toggle-row">
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

          <button onClick={parkVehicle} className="btn-success btn-full">
            <ParkingCircle className="w-4 h-4" />
            Assign Smart Slot
          </button>
        </div>

        {/* Exit Clearance */}
        <div className="glass-card">
          <div className="card-subtitle">
            <Trash2 className="w-4 h-4" />
            Exit Clearance
          </div>

          <div className="field-group">
            <div className="field-input-wrapper">
              <Search className="field-input-icon" />
              <input
                type="number"
                placeholder="Enter Slot ID"
                value={removeSlotNo}
                onChange={(e) => setRemoveSlotNo(e.target.value)}
                className="premium-input field-input"
              />
            </div>
          </div>

          <button onClick={removeVehicle} className="btn-danger btn-full">
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
    <label className="premium-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={
          checked
            ? "premium-toggle-label premium-toggle-label--active"
            : "premium-toggle-label"
        }
      >
        {icon}
        {label}
      </div>
    </label>
  );
}
