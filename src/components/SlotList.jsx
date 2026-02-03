import React from "react";
import { LayoutGrid, CheckCircle2, XCircle, Zap, Home, Info } from "lucide-react";

function SlotList({ slots }) {
  const totalSlots = slots.length;
  const occupiedSlots = slots.filter(s => s.isOccupied).length;
  const availableSlots = totalSlots - occupiedSlots;

  return (
    <div className="stack-gap-lg">
      {/* Header */}
      <div className="slot-list-header">
        <div>
          <h2 className="section-title">
            <span className="section-pill">
              <LayoutGrid className="w-5 h-5" />
            </span>
            Live Inventory
          </h2>
          <p className="section-subtitle">
            Real-time status of all registered parking units.
          </p>
        </div>

        {/* Stats */}
        <div className="stat-row">
          <StatCard label="Capacity" value={totalSlots} />
          <StatCard label="Available" value={availableSlots} variant="success" />
          <StatCard label="Occupied" value={occupiedSlots} variant="danger" />
        </div>
      </div>

      {/* Table Card */}
      <div className="table-card">
        {slots.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="table-scroll">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Identity</th>
                  <th>Facility</th>
                  <th>Charging</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {slots.map((slot) => (
                  <tr
                    key={slot.slotNo}
                    className={slot.isOccupied ? "row-occupied" : "row-available"}
                  >
                    <td>
                      <span className="unit-label">UNIT</span>
                      <span className="unit-value">{slot.slotNo}</span>
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

/* ---------------- Helpers ---------------- */

function StatCard({ label, value, variant }) {
  return (
    <div className="stat-card">
      <p className="stat-card-label">
        {label}
      </p>
      <p
        className={
          variant === "success"
            ? "stat-card-value stat-card-value--success"
            : variant === "danger"
            ? "stat-card-value stat-card-value--danger"
            : "stat-card-value"
        }
      >
        {value}
      </p>
    </div>
  );
}

function FeatureBadge({ icon, text, color }) {
  return (
    <div
      className={
        color === "indigo"
          ? "feature-badge feature-badge--indigo"
          : "feature-badge feature-badge--blue"
      }
    >
      {icon}
      {text}
    </div>
  );
}

function StatusBadge({ icon, text, variant }) {
  return (
    <span
      className={
        variant === "success"
          ? "status-pill status-pill--success"
          : "status-pill status-pill--danger"
      }
    >
      {icon}
      {text}
    </span>
  );
}

function MutedText({ text }) {
  return <span className="muted-text">{text}</span>;
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Info className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="empty-state-title">No Inventory Data</h3>
      <p className="empty-state-text">
        Queue your first parking slot to unlock real-time analytics.
      </p>
    </div>
  );
}
