import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext.jsx';
import { Navbar, MobileMenu, Footer, Toast } from './components/Navname.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import NotFound from './pages/NotFound.jsx';

function Layout() {
  const { toast, hideToast } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Navbar onOpenMobile={() => setMobileOpen(true)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast toastObj={toast} onClose={hideToast} />
    </>
  );
}

function App() {
  return (
    <ShopProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ShopProvider>
  );
}

export default App;
