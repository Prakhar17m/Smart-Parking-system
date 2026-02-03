import {
  CheckCircle2,
  XCircle,
  Info,
  X
} from "lucide-react";

function OutputPanel({ message }) {
  if (!message) return null;

  const isError = message.toLowerCase().includes('no ') ||
    message.toLowerCase().includes('invalid') ||
    message.toLowerCase().includes('already') ||
    message.toLowerCase().includes('vacant') ||
    message.toLowerCase().includes('required');

  const isSuccess = message.toLowerCase().includes('success') ||
    message.toLowerCase().includes('added') ||
    message.toLowerCase().includes('parked') ||
    message.toLowerCase().includes('released');

  const type = isError ? 'error' : isSuccess ? 'success' : 'info';

  const styles = {
    error: "message-error",
    success: "message-success",
    info: "message-info"
  };

  const icons = {
    error: <XCircle className="w-5 h-5 text-rose-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    info: <Info className="w-5 h-5 text-indigo-500" />
  };

  return (
    <div className={styles[type]}>
      <div className="flex items-center gap-3">
        {icons[type]}
        <div className="flex flex-col">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-0.5">
            System Notification
          </p>
          <p className="text-sm font-bold leading-none">
            {message}
          </p>
        </div>
      </div>
      <div className="ml-8 cursor-pointer hover:bg-slate-100 p-1 rounded-md transition-colors">
        <X className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
}

export default OutputPanel;
