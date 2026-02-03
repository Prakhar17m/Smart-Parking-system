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
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
          <Plus className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Provision New Slot
        </h2>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Slot Input */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Slot Identification
          </label>
          <div className="relative">
            <Car className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              placeholder="e.g. 101"
              value={slotNo}
              onChange={e => setSlotNo(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 
                         text-sm font-medium text-slate-700
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-10">
          {/* Covered */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isCovered}
              onChange={e => setIsCovered(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-indigo-600
                            relative after:content-[''] after:absolute after:top-0.5 after:left-0.5
                            after:w-5 after:h-5 after:bg-white after:rounded-full
                            after:transition peer-checked:after:translate-x-5">
            </div>
            <div className="flex items-center gap-2">
              <Home className={`w-4 h-4 ${isCovered ? "text-indigo-600" : "text-slate-400"}`} />
              <span className="text-sm font-semibold text-slate-600">Covered</span>
            </div>
          </label>

          {/* EV */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isEVCharging}
              onChange={e => setIsEVCharging(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-indigo-600
                            relative after:content-[''] after:absolute after:top-0.5 after:left-0.5
                            after:w-5 after:h-5 after:bg-white after:rounded-full
                            after:transition peer-checked:after:translate-x-5">
            </div>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${isEVCharging ? "text-indigo-600" : "text-slate-400"}`} />
              <span className="text-sm font-semibold text-slate-600">EV Station</span>
            </div>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={addSlot}
          className="w-full flex items-center justify-center gap-2
                     bg-gradient-to-r from-indigo-600 to-indigo-500
                     text-white text-sm font-semibold py-3 rounded-xl
                     shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-indigo-600
                     active:scale-[0.98] transition"
        >
          <Plus className="w-4 h-4" />
          Register Slot
        </button>
      </div>
    </div>
  );
}

export default AddSlot;
