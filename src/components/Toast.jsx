import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export default function Toast({ toastObj, onClose }) {
  if (!toastObj || !toastObj.visible) return null;
  const type = toastObj.type || 'info';
  const Icon = type === 'success' ? CheckCircle2 : type === 'error' ? XCircle : Info;
  const iconColor = type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : '#2563eb';
  return (
    <div className="toast-container">
      <div className={`toast ${type}`}>
        <div className="toast-icon" style={{color: iconColor}}>
          <Icon size={20} />
        </div>
        <div className="toast-content">
          {toastObj.title && <div className="toast-title">{toastObj.title}</div>}
          {toastObj.message && <div className="toast-message">{toastObj.message}</div>}
        </div>
        {onClose && (
          <button onClick={onClose} aria-label="Close notification" style={{padding:'4px',color:'var(--color-muted)'}}>
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
