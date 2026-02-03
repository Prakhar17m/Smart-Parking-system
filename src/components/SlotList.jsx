import {
  LayoutGrid,
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
              <LayoutGrid className="w-5 h-5" />
            </span>
            Live Inventory
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Real-time status of all registered parking units.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <StatCard label="Capacity" value={totalSlots} />
          <StatCard label="Available" value={availableSlots} variant="success" />
          <StatCard label="Occupied" value={occupiedSlots} variant="danger" />
        </div>
      </div>

      {/* Table Card */}
      <div className="glass-card !p-0 overflow-hidden">
        {slots.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full premium-table">
              <thead>
                <tr>
                  <th>Identity</th>
                  <th>Facility</th>
                  <th>Charging</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {slots.map(slot => (
                  <tr
                    key={slot.slotNo}
                    className="hover:bg-indigo-50/40 transition"
                  >
                    <td className="font-bold text-slate-900">
                      <span className="text-slate-400 font-medium mr-1.5">
                        UNIT
                      </span>
                      {slot.slotNo}
                    </td>

                    <td>
                      {slot.isCovered ? (
                        <FeatureBadge
                          icon={<Home className="w-3.5 h-3.5" />}
                          text="Indoor Facility"
                          color="indigo"
                        />
                      ) : (
                        <MutedText text="Standard Lot" />
                      )}
                    </td>

                    <td>
                      {slot.isEVCharging ? (
                        <FeatureBadge
                          icon={<Zap className="w-3.5 h-3.5" />}
                          text="EV Integrated"
                          color="blue"
                        />
                      ) : (
                        <MutedText text="No Charging" />
                      )}
                    </td>

                    <td>
                      {slot.isOccupied ? (
                        <StatusBadge
                          text="Unavailable"
                          icon={<XCircle className="w-3 h-3" />}
                          variant="danger"
                        />
                      ) : (
                        <StatusBadge
                          text="Ready"
                          icon={<CheckCircle2 className="w-3 h-3" />}
                          variant="success"
                        />
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


function StatCard({ label, value, variant }) {
  const styles = {
    success: "text-emerald-600",
    danger: "text-rose-600",
    default: "text-slate-900"
  };

  return (
    <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm text-center min-w-[120px]">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className={`text-2xl font-black ${styles[variant] || styles.default}`}>
        {value}
      </p>
    </div>
  );
}
function FeatureBadge({ icon, text, color }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600"
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold ${colors[color]}`}>
      {icon}
      {text}
    </div>
  );
}


function StatusBadge({ icon, text, variant }) {
  const styles = {
    success: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    danger: "bg-rose-100 text-rose-700 ring-rose-200"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ring-1 ${styles[variant]}`}
    >
      {icon}
      {text}
    </span>
  );
}


function EmptyState() {
  return (
    <div className="text-center py-24 bg-slate-50/50">
      <div className="bg-white w-20 h-20 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-6">
        <Info className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">
        No Inventory Data
      </h3>
      <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2 leading-relaxed">
        Queue your first parking slot to unlock real-time analytics.
      </p>
    </div>
  );
}
