import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Package, CreditCard } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';
import { safeImgSrc, handleImgError } from '../utils/imageUtils.js';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cartItems,
    total,
    subtotal,
    discountAmt,
    deliveryFee,
    clearCart,
    showToast,
  } = useShop();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('demo');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      // Allow viewing but disable submit via validation
    }
  }, [cartItems.length]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!address.trim()) errs.address = 'Address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!state.trim()) errs.state = 'State is required';
    if (!pincode.trim()) {
      errs.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      errs.pincode = 'Pincode must be 6 digits';
    }
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.trim())) {
      errs.phone = 'Phone must be 10 digits';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Cart is empty', 'Add some items before checking out.', 'error');
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const ordNum = 'LOM-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      clearCart();
      showToast('Order placed', 'Thank you for your demo order!', 'success');
      setSubmitting(false);
      navigate('/order-success', { state: { orderNumber: ordNum, total } });
    }, 500);
  };

  return (
    <div className="container">
      <div style={{padding:'2rem 0'}}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / <span>Checkout</span>
        </div>
        <h1 style={{fontFamily:'var(--font-serif)',margin:'1rem 0 2rem'}}>Checkout</h1>
      </div>

      <div className="checkout-wrap">
        <div>
          <section className="checkout-section">
            <h3 className="checkout-section-title">Shipping Address</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10 digit mobile number"
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div className="form-group" style={{gridColumn:'1 / -1'}}>
                  <label className="form-label">Street Address *</label>
                  <input
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                  />
                  {errors.address && <p className="form-error">{errors.address}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="New York"
                  />
                  {errors.city && <p className="form-error">{errors.city}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    className={`form-input ${errors.state ? 'error' : ''}`}
                    value={state}
                    onChange={e => setState(e.target.value)}
                    placeholder="NY"
                  />
                  {errors.state && <p className="form-error">{errors.state}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    className={`form-input ${errors.pincode ? 'error' : ''}`}
                    value={pincode}
                    onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="6 digits"
                  />
                  {errors.pincode && <p className="form-error">{errors.pincode}</p>}
                </div>
              </div>
            </form>
          </section>

          <section className="checkout-section">
            <h3 className="checkout-section-title">Payment Method</h3>
            <label
              className={`payment-option ${paymentMethod === 'demo' ? 'active' : ''}`}
              style={{cursor:'pointer'}}
            >
              <input
                type="radio"
                checked={paymentMethod === 'demo'}
                onChange={() => setPaymentMethod('demo')}
              />
              <div>
                <div style={{fontWeight:600}}>Demo Payment</div>
                <div style={{fontSize:13,color:'var(--color-muted)'}}>Test checkout — no real charge.</div>
              </div>
              <span className="payment-demo-badge">
                <Shield size={12}/> DEMO MODE
              </span>
            </label>

            <label
              className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
              style={{cursor:'pointer'}}
            >
              <input
                type="radio"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <div>
                <div style={{fontWeight:600}}>Cash on Delivery</div>
                <div style={{fontSize:13,color:'var(--color-muted)'}}>Pay when your order arrives.</div>
              </div>
              <span className="payment-demo-badge">
                <Package size={12}/> DEMO
              </span>
            </label>
          </section>
        </div>

        <aside className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          {cartItems.slice(0, 3).map(ci => (
            <div
              key={ci.productId + ci.size + ci.color}
              style={{display:'flex',gap:'.75rem',padding:'.5rem 0',fontSize:14}}
            >
              <div style={{width:56,aspectRatio:'3/4',borderRadius:6,overflow:'hidden',background:'var(--color-card)'}}>
                <img
                  src={safeImgSrc(ci.product.image)}
                  alt=""
                  style={{width:'100%',height:'100%',objectFit:'cover'}}
                  onError={handleImgError}
                />
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:500,fontSize:13,lineHeight:1.35}}>{ci.product.title}</div>
                <div style={{fontSize:12,color:'var(--color-muted)'}}>Qty {ci.qty}</div>
              </div>
              <div>${(ci.product.price * ci.qty).toFixed(2)}</div>
            </div>
          ))}
          {cartItems.length > 3 && (
            <p style={{fontSize:12,color:'var(--color-muted)',padding:'.5rem 0'}}>
              +{cartItems.length - 3} more items
            </p>
          )}
          <div style={{borderTop:'1px solid var(--color-border)',marginTop:'1rem',paddingTop:'1rem'}}>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmt > 0 && (
              <div className="summary-row discount">
                <span>Promo</span>
                <span>-${discountAmt.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="btn btn-primary btn-full"
            style={{marginTop:'1.5rem',padding:'14px'}}
            onClick={handleSubmit}
            disabled={submitting}
          >
            <CreditCard size={16}/> {submitting ? 'Placing Order...' : `Place Order (Demo) - $${total.toFixed(2)}`}
          </button>
          <p style={{fontSize:12,color:'var(--color-muted)',textAlign:'center',marginTop:'1rem'}}>
            <Shield size={12}/> Secure demo checkout · No real information stored.
          </p>
        </aside>
      </div>
    </div>
  );
}
