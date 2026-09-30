import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';

const mockOrders = [
  {
    id: 'LOM-ORD-8F3K2A',
    date: 'September 3, 2025',
    status: 'Delivered',
    items: 3,
    products: 'Oversized Linen Shirt, Cashmere Sweater, Wide Leg Trousers',
    total: 407,
  },
  {
    id: 'LOM-ORD-7D1M9Q',
    date: 'August 21, 2025',
    status: 'Shipped',
    items: 2,
    products: 'Silk Slip Dress, Handloom Maxi Dress',
    total: 368,
  },
  {
    id: 'LOM-ORD-5P8X4R',
    date: 'September 9, 2025',
    status: 'Processing',
    items: 4,
    products: 'Linen Button-Down, Ceramic Vase, Linen Throw, Scented Candle Set',
    total: 340,
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { auth, logout, cartCount, wishlistCount } = useShop();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login');
    }
  }, [auth.isLoggedIn, navigate]);

  if (!auth.isLoggedIn) {
    return null;
  }

  return (
    <div className="container">
      <div className="profile-wrap">
        <aside className="profile-card">
          <div className="profile-avatar">
            {(auth.userName || 'LM').charAt(0).toUpperCase()}
          </div>
          <div className="profile-name">{auth.userName || 'Loomora Member'}</div>
          <div className="profile-email">{auth.email || 'demo@loomora.com'}</div>
          <button
            className="btn btn-secondary btn-full"
            onClick={() => {
              logout();
              navigate('/');
            }}
            style={{marginTop:'1rem'}}
          >
            <LogOut size={14}/> Logout
          </button>
        </aside>

        <section>
          <h2 style={{fontFamily:'var(--font-serif)',marginBottom:'1.5rem'}}>Order History</h2>
          <div className="orders-grid">
            {mockOrders.map(o => (
              <div key={o.id} className="order-card">
                <div className="order-header">
                  <div>
                    <div className="order-id">#{o.id}</div>
                    <div className="order-date">{o.date}</div>
                  </div>
                  <span className={`order-status ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </div>
                <div style={{fontSize:14,color:'var(--color-muted)'}}>
                  {o.items} {o.items === 1 ? 'item' : 'items'} · {o.products}
                </div>
                <div className="order-total">Total: ${o.total.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:'3rem',padding:'2rem',background:'var(--color-card)',borderRadius:'var(--radius-md)'}}>
            <h3 style={{fontFamily:'var(--font-serif)',marginBottom:'.5rem'}}>Account Details</h3>
            <p style={{color:'var(--color-muted)',fontSize:14}}>
              Member since September 2025 · Address book: 1 saved · Payment methods: 1 saved
            </p>
            <div style={{marginTop:'1rem',display:'flex',gap:'.75rem',flexWrap:'wrap'}}>
              <Link to="/wishlist" className="btn btn-secondary btn-sm">
                Wishlist ({wishlistCount})
              </Link>
              <Link to="/cart" className="btn btn-primary btn-sm">
                Bag ({cartCount})
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
