import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export default function EmptyState({ icon, title, message, actionLabel, actionHref, onClick }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        {icon || <Package size={36}/>}
      </div>
      {title && <h3>{title}</h3>}
      {message && <p>{message}</p>}
      {actionLabel && (
        onClick ? (
          <button className="btn btn-primary" onClick={onClick}>{actionLabel}</button>
        ) : actionHref ? (
          <Link to={actionHref} className="btn btn-primary">{actionLabel}</Link>
        ) : null
      )}
    </div>
  );
}
