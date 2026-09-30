import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import SearchBar from './SearchBar.jsx';

/**
 * Navbar with unified search input.
 * The URL query param `?q=` is the SINGLE source of truth.
 * The Navbar SearchBar and the Products page SearchBar both read/write
 * the same URL param — so they stay perfectly in sync across pages,
 * page refreshes, and browser back/forward navigation.
 */
export default function Navbar({ onOpenMobile }) {
  const { cartCount, wishlistCount, auth } = useShop();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL ?q= is the canonical source of truth
  const urlQ = searchParams.get('q') || '';
  // Local controlled input value (mirrors URL until user types)
  const [localVal, setLocalVal] = useState(urlQ);

  // Sync local input with URL whenever URL changes (back/forward, Products page clear, etc.)
  useEffect(() => {
    setLocalVal(urlQ);
  }, [urlQ]);

  const isProductsPage = location.pathname === '/products';

  // onChange fires on every keystroke
  const handleSearchChange = (val) => {
    const v = val || '';
    setLocalVal(v);
    // On the /products page, live-update URL so Products filter instantly
    if (isProductsPage) {
      const next = new URLSearchParams(searchParams);
      const trimmed = v.trim();
      if (trimmed) next.set('q', trimmed);
      else next.delete('q');
      setSearchParams(next, { replace: true });
    }
  };

  // onSubmit fires on Enter key OR search icon/button click
  const handleSearchSubmit = () => {
    const q = localVal.trim();
    const next = new URLSearchParams(searchParams);
    if (q) next.set('q', q);
    else next.delete('q');
    // Remove stale filter params that don't make sense when starting a new search
    next.delete('discount');
    const searchStr = next.toString();
    navigate(`/products${searchStr ? `?${searchStr}` : ''}`);
  };

  // Sale link — adds discount param to /products
  const openSale = (e) => {
    e.preventDefault();
    const next = new URLSearchParams();
    next.set('discount', '20');
    navigate({ pathname: '/products', search: `?${next.toString()}` });
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <button className="hamburger" onClick={onOpenMobile} aria-label="Open menu">
            <Menu size={22} />
          </button>

          <Link to="/" className="navbar-logo">LOOMORA</Link>

          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Shop</NavLink>
            <NavLink to="/products?category=women" className="nav-link">New Arrivals</NavLink>
            <NavLink to="/products?category=home-living" className="nav-link">Collections</NavLink>
            <a href="/products" className="nav-link" onClick={openSale}>
              Sale
            </a>
          </div>

          {/* Unified Navbar search: enters /products with ?q= on Enter or submit click */}
          <div className="navbar-search">
            <SearchBar
              value={localVal}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              placeholder="Search products, brands..."
            />
          </div>

          <div className="nav-icons">
            <Link to={auth.isLoggedIn ? '/profile' : '/login'} className="nav-icon-btn" aria-label="Account">
              <User size={20} />
            </Link>
            <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="nav-icon-btn" aria-label="Shopping bag">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
