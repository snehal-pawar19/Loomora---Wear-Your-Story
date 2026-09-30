import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import products from '../data/products.js';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  function getInitialLocal(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  const [cart, setCart] = useState(() => getInitialLocal('loomora_cart', []));
  const [wishlist, setWishlist] = useState(() => getInitialLocal('loomora_wishlist', []));
  const [auth, setAuth] = useState(() => getInitialLocal('loomora_auth', { isLoggedIn: false, userName: '', email: '' }));
  const [promo, setPromo] = useState(() => getInitialLocal('loomora_promo', { code: null, percent: 0 }));
  const [toast, setToast] = useState({ visible: false, type: 'info', title: '', message: '' });

  function showToast(title, message, type = 'success') {
    setToast({ visible: true, type, title, message });
    setTimeout(() => {
      setToast({ visible: false, type: 'info', title: '', message: '' });
    }, 3000);
  }

  function hideToast() {
    setToast({ visible: false, type: 'info', title: '', message: '' });
  }

  function addToCart(product, size, color, qty = 1) {
    const needsSize = product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size';
    if (needsSize && !size) {
      showToast('Size Required', 'Please select a size before adding to cart.', 'error');
      return;
    }

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          qty: updated[existingIdx].qty + qty,
        };
        return updated;
      }

      return [...prev, { productId: product.id, qty, size, color }];
    });

    showToast('Added to Cart', `${product.title} has been added to your cart.`, 'success');
  }

  function removeFromCart(productId, size, color) {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.size === size && item.color === color)
      )
    );
  }

  function updateQuantity(productId, size, color, newQty) {
    if (newQty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, qty: newQty }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
    setPromo({ code: null, percent: 0 });
  }

  function toggleWishlist(productId) {
    let newState;
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        newState = prev.filter((id) => id !== productId);
        showToast('Removed from Wishlist', 'Item has been removed from your wishlist.', 'success');
      } else {
        newState = [...prev, productId];
        showToast('Added to Wishlist', 'Item has been added to your wishlist.', 'success');
      }
      return newState;
    });
    return newState;
  }

  function isInWishlist(productId) {
    return wishlist.includes(productId);
  }

  function login(userName, email) {
    setAuth({ isLoggedIn: true, userName, email });
    showToast('Welcome Back', `Hello ${userName}, you are now logged in.`, 'success');
  }

  function logout() {
    setAuth({ isLoggedIn: false, userName: '', email: '' });
    showToast('Logged Out', 'You have been successfully logged out.', 'success');
  }

  function applyPromo(code) {
    if (code.trim().toUpperCase() === 'LOOM10') {
      setPromo({ code: 'LOOM10', percent: 10 });
      showToast('Promo Applied', '10% discount has been applied to your order.', 'success');
    } else {
      showToast('Invalid Promo', 'The promo code you entered is invalid.', 'error');
    }
  }

  const productsMap = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, p])),
    []
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((ci) => {
          const p = productsMap[ci.productId];
          return p
            ? { ...ci, product: p, lineTotal: p.price * ci.qty }
            : null;
        })
        .filter(Boolean),
    [cart, productsMap]
  );

  const cartCount = useMemo(
    () => cart.reduce((s, c) => s + c.qty, 0),
    [cart]
  );

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const subtotal = useMemo(
    () => cartItems.reduce((s, i) => s + i.lineTotal, 0),
    [cartItems]
  );

  const discountAmt = useMemo(
    () => +(subtotal * (promo.percent || 0) / 100).toFixed(2),
    [subtotal, promo]
  );

  const deliveryFee = useMemo(
    () => (subtotal > 99 || subtotal === 0 ? 0 : 5),
    [subtotal]
  );

  const total = useMemo(
    () => +(subtotal - discountAmt + deliveryFee).toFixed(2),
    [subtotal, discountAmt, deliveryFee]
  );

  useEffect(() => {
    try {
      localStorage.setItem('loomora_cart', JSON.stringify(cart));
    } catch (_err) {
      /* localStorage unavailable — silently ignore */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('loomora_wishlist', JSON.stringify(wishlist));
    } catch (_err) {
      /* localStorage unavailable — silently ignore */
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('loomora_auth', JSON.stringify(auth));
    } catch (_err) {
      /* localStorage unavailable — silently ignore */
    }
  }, [auth]);

  useEffect(() => {
    try {
      localStorage.setItem('loomora_promo', JSON.stringify(promo));
    } catch (_err) {
      /* localStorage unavailable — silently ignore */
    }
  }, [promo]);

  const value = {
    cartItems,
    cartCount,
    wishlist,
    wishlistCount,
    auth,
    promo,
    toast,
    subtotal,
    discountAmt,
    deliveryFee,
    total,
    showToast,
    hideToast,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    login,
    logout,
    applyPromo,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const ctx = useContext(ShopContext);
  if (ctx === null) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return ctx;
}
