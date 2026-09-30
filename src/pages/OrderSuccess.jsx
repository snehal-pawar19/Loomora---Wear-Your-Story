import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const orderNumber =
    (location.state && location.state.orderNumber) ||
    'LOM-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const total = (location.state && location.state.total) || 0;

  return (
    <div className="container">
      <div className="success-wrap">
        <div className="success-icon">
          <CheckCircle2 size={44}/>
        </div>
        <h1>Thank you for your order!</h1>
        <p className="success-text">
          Your order has been placed successfully. A confirmation will be emailed to you shortly.
        </p>
        <div className="order-box">
          <div className="order-label">Order Number</div>
          <div className="order-number">#{orderNumber}</div>
        </div>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <div style={{padding:'1rem 1.5rem',background:'var(--color-card)',borderRadius:8,minWidth:160}}>
            <div style={{fontSize:12,color:'var(--color-muted)'}}>Order Total</div>
            <div style={{fontWeight:600,fontSize:'1.15rem',marginTop:4}}>
              ${(total || 0).toFixed(2)}
            </div>
          </div>
          <div style={{padding:'1rem 1.5rem',background:'var(--color-card)',borderRadius:8,minWidth:160}}>
            <div style={{fontSize:12,color:'var(--color-muted)'}}>Est. Delivery</div>
            <div style={{fontWeight:600,fontSize:'1.15rem',marginTop:4}}>5-7 days</div>
          </div>
        </div>
        <div style={{marginTop:'2.5rem',display:'flex',gap:'.75rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          <Link to="/profile" className="btn btn-secondary">Order History</Link>
        </div>
      </div>
    </div>
  );
}
