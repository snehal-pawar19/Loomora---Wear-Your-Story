import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { EmptyState } from '../components/Navname.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { safeImgSrc, handleImgError } from '../utils/imageUtils.js';

export default function Cart() {
  const {
    cartItems,
    cartCount,
    subtotal,
    discountAmt,
    deliveryFee,
    total,
    promo,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    applyPromo,
    showToast,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{padding:'4rem 0'}}>
        <EmptyState
          icon={<ShoppingBag size={36}/>}
          title="Your bag is empty"
          message="Looks like you haven't found your favorites yet."
          actionLabel="Start Shopping"
          actionHref="/products"
        />
      </div>
    );
  }

  const bagDiscount = cartItems.reduce((s, i) => s + (i.product.originalPrice - i.product.price) * i.qty, 0);

  return (
    <div className="container">
      <div style={{padding:'2rem 0'}}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Shopping Bag ({cartCount})</span>
        </div>
        <h1 style={{fontFamily:'var(--font-serif)',marginTop:'1rem',marginBottom:'2rem'}}>Shopping Bag</h1>
      </div>

      <div className="cart-wrap">
        <div className="cart-list">
          {cartItems.map(ci => (
            <div key={`${ci.productId}-${ci.size}-${ci.color}`} className="cart-item">
              <Link to={`/products/${ci.productId}`} className="cart-item-img">
                <img src={safeImgSrc(ci.product.image)} alt={`${ci.product.brand} ${ci.product.title}`} onError={handleImgError}/>
              </Link>
              <div className="cart-item-info">
                <p className="cart-item-brand">{ci.product.brand}</p>
                <Link to={`/products/${ci.productId}`} className="cart-item-title">{ci.product.title}</Link>
                <p className="cart-item-meta">
                  {ci.size && <>Size: {ci.size} · </>}
                  {ci.color && <>Color: {ci.color}</>}
                </p>
                <div className="cart-item-bottom">
                  <div className="qty-selector">
                    <button className="qty-btn" onClick={() => updateQuantity(ci.productId, ci.size, ci.color, ci.qty - 1)}>
                      <Minus size={14}/>
                    </button>
                    <span className="qty-val">{ci.qty}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(ci.productId, ci.size, ci.color, ci.qty + 1)}>
                      <Plus size={14}/>
                    </button>
                  </div>
                  <div style={{fontWeight:600}}>${(ci.product.price * ci.qty).toFixed(2)}</div>
                </div>
                <div className="cart-item-actions" style={{marginTop:'1rem'}}>
                  <button
                    className="cart-action"
                    onClick={() => {
                      removeFromCart(ci.productId, ci.size, ci.color);
                      showToast('Removed', `${ci.product.title} removed from bag.`);
                    }}
                  >
                    <Trash2 size={14} style={{verticalAlign:'-2px',marginRight:4}}/> Remove
                  </button>
                  <button
                    className="cart-action"
                    onClick={() => {
                      toggleWishlist(ci.productId);
                      removeFromCart(ci.productId, ci.size, ci.color);
                    }}
                  >
                    <Heart size={14} style={{verticalAlign:'-2px',marginRight:4}}/> Move to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Bag Discount</span>
            <span>${bagDiscount.toFixed(2)}</span>
          </div>
          {discountAmt > 0 && (
            <div className="summary-row discount">
              <span>Promo ({promo.code})</span>
              <span>-${discountAmt.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
          </div>
          <div className="promo-note">* Free delivery on orders over $99</div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyPromo(promoCode);
            }}
            className="promo-wrap"
          >
            <input
              className="promo-input"
              placeholder="Promo code"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary btn-sm">Apply</button>
          </form>
          <p className="promo-note">Demo code: <strong>LOOM10</strong> for 10% off</p>

          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-full" style={{marginTop:'1.5rem',padding:'14px'}}>
            Place Order <ArrowRight size={16}/>
          </Link>
          <Link to="/products" className="btn btn-secondary btn-full" style={{marginTop:'.75rem'}}>
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
