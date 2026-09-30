import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import { safeImgSrc } from '../utils/imageUtils.js';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist, addToCart, showToast } = useShop();
  const inWishlist = isInWishlist(product.id);
  const needsSize = product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size';

  const handleCardClick = (_e) => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToBag = (e) => {
    e.stopPropagation();
    if (needsSize) {
      navigate(`/products/${product.id}`);
      showToast('Select Size', 'Please choose a size on the product page.', 'info');
      return;
    }
    const size = 'One Size';
    const color = (product.colors && product.colors[0]) || null;
    addToCart(product, size, color, 1);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card-image">
        <img
          src={safeImgSrc(product.image)}
          alt={`${product.brand} ${product.title}`}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/fallback-product.jpg";
          }}
        />
        {product.isNew && <span className="product-badge">NEW</span>}
        {!product.isNew && product.isTrending && <span className="product-badge trending">TRENDING</span>}
        {product.discount > 0 && !product.isNew && !product.isTrending && (
          <span className="product-badge" style={{background:'var(--color-success)'}}>-{product.discount}%</span>
        )}
        <button
          className={`product-wishlist ${inWishlist?'active':''}`}
          onClick={handleWishlist}
          aria-label={inWishlist?'Remove from wishlist':'Add to wishlist'}
        >
          <Heart size={16} fill={inWishlist?'currentColor':'none'} />
        </button>
      </div>
      <div className="product-card-body">
        <div className="product-brand">{product.brand}</div>
        <Link to={`/products/${product.id}`} className="product-title" onClick={(e)=>e.stopPropagation()}>
          {product.title}
        </Link>
        <div className="product-rating">
          <div style={{display:'flex',gap:'2px',color:'#E0A84E'}}>
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={12} fill={i<=Math.round(product.rating)?'currentColor':'none'} />
            ))}
          </div>
          <span className="rating-count">{product.rating} · {product.reviewCount}</span>
        </div>
        <div className="product-prices">
          <span className="product-price">${product.price}</span>
          {product.discount > 0 && (
            <>
              <span className="product-original-price">${product.originalPrice}</span>
              <span className="product-discount">-{product.discount}%</span>
            </>
          )}
        </div>
        <button className="btn btn-secondary btn-sm add-to-bag" onClick={handleAddToBag}>
          <Plus size={14}/> Add to Bag
        </button>
      </div>
    </div>
  );
}
