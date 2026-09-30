import { Link } from 'react-router-dom';
import { safeImgSrc, handleImgError } from '../utils/imageUtils.js';

export default function CategoryCard({ slug, name, subtitle, image }) {
  return (
    <Link to={`/products?category=${slug}`} className="category-card">
      <img src={safeImgSrc(image)} alt={`${name} category`} onError={handleImgError} />
      <div className="category-overlay">
        <div className="category-name">{name}</div>
        {subtitle && <div className="category-subtitle">{subtitle}</div>}
      </div>
    </Link>
  );
}
