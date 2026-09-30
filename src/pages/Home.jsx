import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroBanner, CategoryCard, ProductGrid } from '../components/Navname.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { getNewArrivals, getTrending } from '../services/productService.js';
import products from '../data/products.js';
import { PIC, handleImgError } from '../utils/imageUtils.js';

export default function Home() {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');

  const categories = [
    { slug: 'women', name: 'Women', subtitle: '24 Styles', image: '/images/products/silk-slip-dress.jpg' },
    { slug: 'men', name: 'Men', subtitle: '18 Styles', image: '/images/products/oxford-cotton-shirt.jpg' },
    { slug: 'kids', name: 'Kids', subtitle: '15 Styles', image: '/images/products/organic-graphic-tee.jpg' },
    { slug: 'beauty', name: 'Beauty', subtitle: '12 Styles', image: '/images/products/hyaluronic-serum.jpg' },
    { slug: 'home-living', name: 'Home & Living', subtitle: '20 Styles', image: '/images/products/ceramic-vase.jpg' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.trim())) {
      showToast('Subscribed', 'Thank you for subscribing to our newsletter.', 'success');
      setEmail('');
    } else {
      showToast('Invalid email', 'Please enter a valid email address.', 'error');
    }
  };

  return (
    <div>
      <HeroBanner />

      <section className="section container">
        <div className="section-header">
          <div>
            <h2>New Arrivals</h2>
            <p className="section-subtitle">Fresh pieces, just landed.</p>
          </div>
          <Link to="/products" className="btn btn-secondary btn-sm">
            View All <ArrowRight size={14}/>
          </Link>
        </div>
        <ProductGrid products={getNewArrivals(products, 8)} />
      </section>

      <section className="section container">
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p className="section-subtitle">Find your perfect edit.</p>
          </div>
        </div>
        <div className="categories-grid">
          {categories.map(c => (
            <CategoryCard key={c.slug} slug={c.slug} name={c.name} subtitle={c.subtitle} image={c.image} />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <div>
            <h2>Trending Now</h2>
            <p className="section-subtitle">Styles our community is loving.</p>
          </div>
        </div>
        <ProductGrid products={getTrending(products, 8)} />
      </section>

      <section className="container">
        <div className="promo-banner">
          <div className="promo-banner-img">
            <img
              src={PIC('loomora-promo-essentials', 1200, 800)}
              alt="Loomora everyday essentials — premium minimalist wardrobe and home pieces"
              onError={handleImgError}
            />
          </div>
          <div>
            <p style={{fontSize:13,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--color-accent)',marginBottom:'1rem'}}>Edit 01 / Essentials</p>
            <h2 style={{marginBottom:'1rem'}}>Everyday essentials, thoughtfully chosen.</h2>
            <p style={{color:'var(--color-muted)',marginBottom:'1.5rem',lineHeight:1.7}}>A curated collection of pieces designed to form the backbone of your wardrobe and home. Versatile, enduring, crafted from natural fibers with attention to every stitch.</p>
            <Link to="/products" className="btn btn-primary">Explore Edit <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="newsletter">
          <h2>Join the Loomora list</h2>
          <p className="newsletter-desc">Be first to hear about new arrivals, exclusive offers, and thoughtful stories from our studio.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
