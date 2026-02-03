import {
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  XCircle,
  Zap,
  Home,
  Info
} from "lucide-react";

function SlotList({ slots }) {
  const totalSlots = slots.length;
  const occupiedSlots = slots.filter(s => s.isOccupied).length;
  const availableSlots = totalSlots - occupiedSlots;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <LayoutGrid className="w-6 h-6 text-indigo-600" />
            Live Inventory
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Real-time status of all registered parking units.</p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm text-center min-w-[120px]">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Capacity</p>
            <p className="text-2xl font-black text-slate-900 leading-none">{totalSlots}</p>
          </div>
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm text-center min-w-[120px]">
            <p className="text-emerald-500/80 text-[10px] font-bold uppercase tracking-widest mb-1">Available</p>
            <p className="text-2xl font-black text-emerald-600 leading-none">{availableSlots}</p>
          </div>
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm text-center min-w-[120px]">
            <p className="text-rose-500/80 text-[10px] font-bold uppercase tracking-widest mb-1">Occupied</p>
            <p className="text-2xl font-black text-rose-600 leading-none">{occupiedSlots}</p>
          </div>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        {slots.length === 0 ? (
          <div className="text-center py-20 bg-slate-50/50">
            <div className="bg-white w-20 h-20 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-6">
              <Info className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Inventory Data</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2 leading-relaxed">
              Queue your first parking slot to see real-time distribution analytics.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Identity</th>
                  <th>Configuration</th>
                  <th>Charging</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {slots.map(slot => (
                  <tr key={slot.slotNo}>
                    <td className="font-bold text-slate-900">
                      <span className="text-slate-400 font-medium mr-1.5">UNIT</span>
                      {slot.slotNo}
                    </td>
                    <td>
                      {slot.isCovered ? (
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs">
                          <div className="bg-indigo-50 p-1.5 rounded-lg">
                            <Home className="w-3.5 h-3.5" />
                          </div>
                          Indoor Facility
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">Standard Lot</span>
                      )}
                    </td>
                    <td>
                      {slot.isEVCharging ? (
                        <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs">
                          <div className="bg-blue-50 p-1.5 rounded-lg">
                            <Zap className="w-3.5 h-3.5" />
                          </div>
                          EV Integrated
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">No Charging</span>
                      )}
                    </td>
                    <td>
                      {slot.isOccupied ? (
                        <span className="badge-occupied flex items-center gap-1.5 w-fit">
                          <XCircle className="w-3 h-3" />
                          Unavailable
                        </span>
                      ) : (
                        <span className="badge-available flex items-center gap-1.5 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          Ready
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SlotList;
