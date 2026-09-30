import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { handleImgError } from '../utils/imageUtils.js';

export default function HeroBanner() {
  return (
    <section className="container">
      <div className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">Autumn / Winter Collection</p>
          <h1 className="hero-title">Wear your story.</h1>
          <p className="hero-desc">Thoughtfully crafted pieces from natural fibers, designed to be lived in and loved for years. Timeless essentials for your everyday.</p>
          <div className="hero-ctas">
            <Link to="/products" className="btn btn-primary">Shop Now <ArrowRight size={16}/></Link>
            <Link to="/products?category=women" className="btn btn-secondary">New Arrivals</Link>
          </div>
        </div>
        <img
          src="/images/products/silk-slip-dress.jpg"
          alt="Loomora Autumn Winter collection — model wearing a red floral dress in warm studio light"
          className="hero-image"
          onError={handleImgError}
        />
      </div>
    </section>
  );
}
