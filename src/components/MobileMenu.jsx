import { Link } from 'react-router-dom';
import { X, User, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';

export default function MobileMenu({ open, onClose }) {
  const { cartCount, wishlistCount, auth, logout } = useShop();

  if (!open) return null;

  return (
    <>
      <div className="mobile-menu-overlay show" onClick={onClose} />
      <div className="mobile-menu open">
        <div className="mobile-menu-header">
          <div style={{fontFamily:'var(--font-serif)',fontSize:'1.25rem',fontWeight:700,letterSpacing:'.08em'}}>LOOMORA</div>
          <button onClick={onClose} aria-label="Close menu" style={{padding:'8px'}}>
            <X size={22} />
          </button>
        </div>
        <div className="mobile-menu-links">
          <Link to="/" onClick={onClose} className="mobile-menu-link">Home</Link>
          <Link to="/products" onClick={onClose} className="mobile-menu-link">All Products</Link>
          <Link to="/products?category=women" onClick={onClose} className="mobile-menu-link">Women</Link>
          <Link to="/products?category=men" onClick={onClose} className="mobile-menu-link">Men</Link>
          <Link to="/products?category=kids" onClick={onClose} className="mobile-menu-link">Kids</Link>
          <Link to="/products?category=beauty" onClick={onClose} className="mobile-menu-link">Beauty</Link>
          <Link to="/products?category=home-living" onClick={onClose} className="mobile-menu-link">Home & Living</Link>
          <div style={{borderTop:'1px solid var(--color-border)',marginTop:'1rem',paddingTop:'1rem'}}>
            {auth.isLoggedIn ? (
              <>
                <Link to="/profile" onClick={onClose} className="mobile-menu-link"><User size={16} style={{verticalAlign:'-2px',marginRight:8}}/> {auth.userName || 'Profile'}</Link>
                <button onClick={()=>{logout(); onClose();}} className="mobile-menu-link" style={{width:'100%',textAlign:'left'}}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={onClose} className="mobile-menu-link"><User size={16} style={{verticalAlign:'-2px',marginRight:8}}/> Sign In</Link>
            )}
            <Link to="/wishlist" onClick={onClose} className="mobile-menu-link"><Heart size={16} style={{verticalAlign:'-2px',marginRight:8}}/> Wishlist ({wishlistCount})</Link>
            <Link to="/cart" onClick={onClose} className="mobile-menu-link"><ShoppingBag size={16} style={{verticalAlign:'-2px',marginRight:8}}/> Bag ({cartCount})</Link>
          </div>
        </div>
      </div>
    </>
  );
}
