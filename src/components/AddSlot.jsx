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
      <h2 className="section-title">
        <Plus className="w-5 h-5 text-indigo-600" />
        Provision New Slot
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
            Slot Identification
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="e.g. 101"
              value={slotNo}
              onChange={e => setSlotNo(e.target.value)}
              className="premium-input pl-10"
            />
            <Car className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        <div className="flex gap-8">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={isCovered}
                onChange={e => setIsCovered(e.target.checked)}
                className="premium-checkbox"
              />
            </div>
            <div className="flex items-center gap-2">
              <Home className={`w-4 h-4 ${isCovered ? "text-indigo-600" : "text-slate-400"}`} />
              <span className="text-sm font-semibold text-slate-600">Covered</span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={isEVCharging}
                onChange={e => setIsEVCharging(e.target.checked)}
                className="premium-checkbox"
              />
            </div>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${isEVCharging ? "text-indigo-600" : "text-slate-400"}`} />
              <span className="text-sm font-semibold text-slate-600">EV Station</span>
            </div>
          </label>
        </div>

        <button
          onClick={addSlot}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Register Slot
        </button>
      </div>
    </div>
  );
}

export default AddSlot;
