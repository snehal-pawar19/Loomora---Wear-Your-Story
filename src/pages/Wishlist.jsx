import { Heart } from 'lucide-react';
import { ProductGrid, EmptyState } from '../components/Navname.jsx';
import { useShop } from '../context/ShopContext.jsx';
import { getProductById } from '../services/productService.js';
import products from '../data/products.js';

export default function Wishlist() {
  const { wishlist, wishlistCount } = useShop();

  const productsList = wishlist
    .map(id => getProductById(id, products))
    .filter(Boolean);

  if (productsList.length === 0) {
    return (
      <div className="container" style={{padding:'4rem 0'}}>
        <EmptyState
          icon={<Heart size={36}/>}
          title="Your wishlist is empty"
          message="Save items you love here. Click the heart on any product."
          actionLabel="Discover Products"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{padding:'2rem 0'}}>
        <div className="wishlist-header">
          <h1 style={{fontFamily:'var(--font-serif)'}}>Wishlist</h1>
          <span className="wishlist-count">
            {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <ProductGrid products={productsList} />
      </div>
    </div>
  );
}
