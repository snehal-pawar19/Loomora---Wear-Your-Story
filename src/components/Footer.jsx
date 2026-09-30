import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{fontFamily:'var(--font-serif)',fontSize:'1.75rem',fontWeight:700,letterSpacing:'.08em'}}>LOOMORA</div>
            <p className="footer-brand-desc">
              Thoughtfully designed essentials for your wardrobe and home. Crafted from natural fibers, built to last.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Instagram"><Instagram size={16}/></a>
              <a href="#" className="social-btn" aria-label="Facebook"><Facebook size={16}/></a>
              <a href="#" className="social-btn" aria-label="Twitter"><Twitter size={16}/></a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Shop</div>
            <div className="footer-links">
              <Link to="/products?category=women" className="footer-link">Women</Link>
              <Link to="/products?category=men" className="footer-link">Men</Link>
              <Link to="/products?category=kids" className="footer-link">Kids</Link>
              <Link to="/products?category=beauty" className="footer-link">Beauty</Link>
              <Link to="/products?category=home-living" className="footer-link">Home & Living</Link>
              <Link to="/products" className="footer-link">New Arrivals</Link>
            </div>
          </div>
          <div>
            <div className="footer-heading">Customer Care</div>
            <div className="footer-links">
              <a href="#" className="footer-link">Contact Us</a>
              <a href="#" className="footer-link">Shipping & Returns</a>
              <a href="#" className="footer-link">Size Guide</a>
              <a href="#" className="footer-link">FAQs</a>
              <a href="#" className="footer-link">Care Instructions</a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Company</div>
            <div className="footer-links">
              <a href="#" className="footer-link">Our Story</a>
              <a href="#" className="footer-link">Sustainability</a>
              <a href="#" className="footer-link">Stores</a>
              <a href="#" className="footer-link">Press</a>
              <a href="#" className="footer-link">Careers</a>
            </div>
            <div style={{marginTop:'1.5rem',fontSize:13,color:'var(--color-muted)'}}>
              <p style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'.5rem'}}>
                <MapPin size={14} style={{flexShrink:0,marginTop:'2px'}}/> 123 Studio Lane, Brooklyn, NY 11201
              </p>
              <p style={{display:'flex',gap:'8px',alignItems:'center',marginBottom:'.5rem'}}>
                <Mail size={14}/> hello@loomora.com
              </p>
              <p style={{display:'flex',gap:'8px',alignItems:'center'}}>
                <Phone size={14}/> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div style={{fontSize:13,color:'var(--color-muted)'}}>© 2026 Loomora. All rights reserved.</div>
          <div className="footer-payments">
            <span className="payment-icon">VISA</span>
            <span className="payment-icon">UPI</span>
            <span className="payment-icon">Credit</span>
            <span className="payment-icon">PAYTM</span>
            <span className="payment-icon">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
