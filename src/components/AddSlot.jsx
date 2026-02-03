import { useState } from "react";
import { Plus, Car, Zap, Home } from "lucide-react";

function AddSlot({ slots, setSlots, setMessage }) {
  const [slotNo, setSlotNo] = useState("");
  const [isCovered, setIsCovered] = useState(false);
  const [isEVCharging, setIsEVCharging] = useState(false);

  const addSlot = () => {
    if (!slotNo) {
      setMessage("Slot number is required");
      return;
    }

    if (slots.some(s => s.slotNo === Number(slotNo))) {
      setMessage("Slot already exists");
      return;
    }

    setSlots([
      ...slots,
      { slotNo: Number(slotNo), isCovered, isEVCharging, isOccupied: false }
    ]);

    setMessage("Parking slot added successfully");
    setSlotNo("");
  };

  return (
    <div>
      {/* Header */}
      <div className="add-slot-header">
        <div className="add-slot-icon">
          <Plus className="w-5 h-5" />
        </div>
        <h2 className="add-slot-title">Provision New Slot</h2>
      </div>

      {/* Form */}
      <div>
        {/* Slot Input */}
        <div className="field-group">
          <label className="field-label">Slot Identification</label>
          <div className="field-input-wrapper">
            <Car className="field-input-icon" />
            <input
              type="number"
              placeholder="e.g. 101"
              value={slotNo}
              onChange={(e) => setSlotNo(e.target.value)}
              className="premium-input field-input"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="toggle-pair">
          {/* Covered */}
          <label className="premium-toggle">
            <input
              type="checkbox"
              checked={isCovered}
              onChange={(e) => setIsCovered(e.target.checked)}
            />
            <div
              className={
                isCovered
                  ? "premium-toggle-label premium-toggle-label--active"
                  : "premium-toggle-label"
              }
            >
              <Home className="w-4 h-4" />
              <span>Covered</span>
            </div>
          </label>

          {/* EV */}
          <label className="premium-toggle">
            <input
              type="checkbox"
              checked={isEVCharging}
              onChange={(e) => setIsEVCharging(e.target.checked)}
            />
            <div
              className={
                isEVCharging
                  ? "premium-toggle-label premium-toggle-label--active"
                  : "premium-toggle-label"
              }
            >
              <Zap className="w-4 h-4" />
              <span>EV Station</span>
            </div>
          </label>
        </div>

        {/* Button */}
        <button onClick={addSlot} className="btn-primary btn-full">
          <Plus className="w-4 h-4" />
          Register Slot
        </button>
      </div>
    </div>
  );
}

export default AddSlot;
