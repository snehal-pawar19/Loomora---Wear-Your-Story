import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Star, Plus, Minus, Heart, ShoppingBag, Truck } from 'lucide-react';
import { ProductGrid, EmptyState } from '../components/Navname.jsx';
import { useShop } from '../context/ShopContext.jsx';
import products from '../data/products.js';
import { safeImgSrc } from '../utils/imageUtils.js';

const colorHexMap = {
  Black: '#2B2B2B',
  White: '#FFFFFF',
  Ivory: '#FAF7F2',
  Beige: '#F3EEE6',
  Charcoal: '#4B4B4B',
  Terracotta: '#C07F5D',
  Navy: '#2A3B4C',
  Cream: '#FFF8EC',
  Olive: '#6B7A5A',
  Dusty_Rose: '#C98E8F',
  Sand: '#D9C6AA',
  Sage: '#A8B89A',
  Rose: '#E8B4BC',
  Lavender: '#B8A9C9',
};

function colorHex(name) {
  if (!name) return null;
  const key = name.replace(/\s+/g, '_');
  return colorHexMap[key] || null;
}

function getRelated(p, list) {
  if (!p) return [];
  return list.filter(x => x.category === p.category && String(x.id) !== String(p.id)).slice(0, 8);
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useShop();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [pincode, setPincode] = useState('');
  const product = products.find((item) => String(item.id) === String(id));

  useEffect(() => {
    setSelectedColor(product && product.colors && product.colors[0] ? product.colors[0] : null);
    setSelectedSize(product && product.sizes && product.sizes.length > 0 && product.sizes[0] === 'One Size' ? 'One Size' : null);
    setQty(1);
    setActiveImgIdx(0);
  }, [id, product]);

  const related = useMemo(() => getRelated(product, products).slice(0, 4), [product]);

  if (!product) {
    return (
      <div className="container" style={{padding:'4rem 0'}}>
        <EmptyState
          title="Product not found"
          message="It may have been moved or is no longer available."
          actionLabel="Back to Shop"
          actionHref="/products"
        />
      </div>
    );
  }

  const oneSize = product.sizes && product.sizes.includes('One Size');
  const effectiveSize = oneSize ? 'One Size' : selectedSize;
  const effectiveColor = selectedColor || (product.colors && product.colors[0]) || null;

  const handleAddToBag = () => {
    if (!oneSize && !selectedSize) {
      showToast('Size Required', 'Please select a size before adding to bag.', 'error');
      return;
    }
    addToCart(product, effectiveSize, effectiveColor, qty);
  };

  const handleBuyNow = () => {
    if (!oneSize && !selectedSize) {
      showToast('Size Required', 'Please select a size.', 'error');
      return;
    }
    addToCart(product, effectiveSize, effectiveColor, qty);
    setTimeout(() => navigate('/checkout'), 500);
  };

  return (
    <>
      <div className="container" style={{paddingTop:'2rem'}}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Shop</Link> /{' '}
          {product.category && (
            <><Link to={`/products?category=${product.category}`}>{product.category}</Link> / </>
          )}
          <span>{product.title}</span>
        </div>
      </div>

      <div className="container pdp-wrap">
        <div className="pdp-gallery">
          <div className="pdp-thumbs">
            {product.images && product.images.map((img, i) => (
              <img
                key={i}
                src={safeImgSrc(img)}
                alt={`${product.title} view ${i + 1}`}
                className={`pdp-thumb ${i === activeImgIdx ? 'active' : ''}`}
                onClick={() => setActiveImgIdx(i)}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/fallback-product.jpg";
                }}
              />
            ))}
          </div>
          <div className="pdp-main">
            <img
              src={safeImgSrc((product.images && product.images[activeImgIdx]) || product.image)}
              alt={`${product.brand} ${product.title}`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/fallback-product.jpg";
              }}
            />
          </div>
        </div>
        <div className="pdp-info">
          <p className="pdp-brand">{product.brand}</p>
          <h1 className="pdp-title">{product.title}</h1>
          <div className="pdp-rating-row">
            <div style={{display:'flex',gap:'2px',color:'#E0A84E'}}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill={i <= Math.round(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span style={{fontSize:14,color:'var(--color-muted)'}}>
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>
          <div className="pdp-price-row">
            <span className="pdp-price">${product.price}</span>
            {product.discount > 0 && (
              <>
                <span className="pdp-original-price">${product.originalPrice}</span>
                <span className="pdp-discount">-{product.discount}%</span>
              </>
            )}


























          </div>
          <div className="pdp-section">
            <p className="pdp-desc">{product.description}</p>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="pdp-section">
              <div className="pdp-label">Color · {selectedColor || 'Select'}</div>
              <div className="color-swatches">
                {product.colors.map(c => (
                  <button
                    key={c}
                    className={`swatch ${selectedColor === c ? 'active' : ''}`}
                    style={{background: colorHex(c) || '#ddd'}}
                    onClick={() => setSelectedColor(c)}
                    aria-label={`Color ${c}`}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && !oneSize && (
            <div className="pdp-section">
              <div className="pdp-label">Select Size</div>
              <div className="size-chips">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`size-chip ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pdp-section">
            <div className="pdp-label">Quantity</div>
            <div className="qty-selector">
              <button className="qty-btn" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus size={16}/>
              </button>
              <span className="qty-val">{qty}</span>
              <button className="qty-btn" aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>
                <Plus size={16}/>
              </button>
            </div>
          </div>

          <div className="pdp-section">
            <div className="pdp-label">Delivery</div>
            <div className="pdp-pincode">
              <input
                placeholder="Enter pincode"
                value={pincode}
                onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
              <button className="btn btn-secondary btn-sm" type="button">Check</button>
            </div>
            <p style={{fontSize:13,color:'var(--color-muted)',marginTop:'.5rem'}}>
              <Truck size={14} style={{display:'inline',verticalAlign:'-2px',marginRight:'4px'}}/>
              Free delivery over $99 · Easy 14-day returns
            </p>
          </div>

          <div className="pdp-actions">
            <button className="btn btn-primary" onClick={handleAddToBag}>
              <ShoppingBag size={16}/> Add to Bag
            </button>
            <button className="btn btn-outline" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
            >
              <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section section container">
          <h2 style={{marginBottom:'2rem'}}>You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
