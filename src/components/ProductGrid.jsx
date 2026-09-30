import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
