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
    <div>
      <h2 className="section-title">
        <ParkingCircle className="w-5 h-5 text-indigo-600" />
        Vehicle Management
      </h2>

      <div className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Entry Assignment
          </h3>

          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={needsEV}
                onChange={e => setNeedsEV(e.target.checked)}
                className="premium-checkbox"
              />
              <div className="flex items-center gap-1.5">
                <Zap className={`w-4 h-4 ${needsEV ? "text-indigo-600" : "text-slate-400"}`} />
                <span className="text-sm font-medium text-slate-600">Needs EV</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={needsCover}
                onChange={e => setNeedsCover(e.target.checked)}
                className="premium-checkbox"
              />
              <div className="flex items-center gap-1.5">
                <Home className={`w-4 h-4 ${needsCover ? "text-indigo-600" : "text-slate-400"}`} />
                <span className="text-sm font-medium text-slate-600">Needs Cover</span>
              </div>
            </label>
          </div>

          <button
            onClick={parkVehicle}
            className="btn-success"
          >
            <ParkingCircle className="w-4 h-4" />
            Assign Smart Slot
          </button>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-500" />
            Exit Clearance
          </h3>

          <div className="relative mb-4">
            <input
              type="number"
              placeholder="Slot ID to release"
              value={removeSlotNo}
              onChange={e => setRemoveSlotNo(e.target.value)}
              className="premium-input pl-10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <button
            onClick={removeVehicle}
            className="btn-danger"
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
