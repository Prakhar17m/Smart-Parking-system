import { CheckCircle2, XCircle, Info, X } from "lucide-react";

function OutputPanel({ message, onClose }) {
  if (!message) return null;

  const lower = message.toLowerCase();
  const isError =
    lower.includes("no ") ||
    lower.includes("invalid") ||
    lower.includes("already") ||
    lower.includes("vacant") ||
    lower.includes("required");

  const isSuccess =
    lower.includes("success") ||
    lower.includes("added") ||
    lower.includes("parked") ||
    lower.includes("released");

  const type = isError ? "error" : isSuccess ? "success" : "info";

  const styles = {
    error: "message-error",
    success: "message-success",
    info: "message-info",
  };

  const icons = {
    error: <XCircle className="w-5 h-5 text-rose-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    info: <Info className="w-5 h-5 text-indigo-500" />,
  };

  return (
    <div className={styles[type]}>
      <div className="flex items-center gap-3">
        {icons[type]}
        <div className="flex flex-col">
          <p className="message-heading">
            System Notification
          </p>
          <p className="message-body">
            {message}
          </p>
        </div>
      </div>
      <button type="button" onClick={onClose} className="message-close" aria-label="Dismiss">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default OutputPanel;
