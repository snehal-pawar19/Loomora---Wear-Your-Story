import { X } from 'lucide-react';

export default function FilterSidebar({ filters, setFilters, onClear, allProducts = [], mobileOpen = false, onCloseMobile }) {
  const CATEGORY_LABELS = {
    men: 'Men',
    women: 'Women',
    kids: 'Kids',
    beauty: 'Beauty',
    'home-living': 'Home & Living',
    kurtas: 'Kurtas',
    sarees: 'Sarees',
    dresses: 'Dresses',
    shirts: 'Shirts',
    't-shirts': 'T-Shirts',
    jeans: 'Jeans',
    trousers: 'Trousers',
    footwear: 'Footwear',
    bags: 'Bags',
    jewellery: 'Jewellery',
    accessories: 'Accessories',
  };
  const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
  const categoryLabels = Object.fromEntries(
    categories.map(c => [c, CATEGORY_LABELS[c] || c.charAt(0).toUpperCase() + c.slice(1).replace(/-/g, ' ')])
  );
  const genders = ['men', 'women', 'unisex', 'kids'];
  const brands = [...new Set(allProducts.map(p => p.brand))];

  const handleCategory = (cat) => {
    setFilters(f => ({ ...f, category: f.category === cat ? null : cat }));
  };

  const handleGender = (g) => {
    setFilters(f => ({ ...f, gender: f.gender === g ? null : g }));
  };

  const toggleBrand = (b) => {
    setFilters(f => {
      const has = f.brands.includes(b);
      return { ...f, brands: has ? f.brands.filter(x=>x!==b) : [...f.brands, b] };
    });
  };

  const handleMinPrice = (v) => {
    const n = v === '' ? null : Number(v);
    setFilters(f => ({ ...f, minPrice: isNaN(n) ? null : n }));
  };

  const handleMaxPrice = (v) => {
    const n = v === '' ? null : Number(v);
    setFilters(f => ({ ...f, maxPrice: isNaN(n) ? null : n }));
  };

  const handleMinDiscount = (v) => {
    const n = v === '' ? null : Number(v);
    setFilters(f => ({ ...f, minDiscount: isNaN(n) ? null : n }));
  };

  const handleMinRating = (v) => {
    const n = v === '' ? null : Number(v);
    setFilters(f => ({ ...f, minRating: isNaN(n) ? null : n }));
  };

  const sidebar = (
    <aside className="filter-sidebar">
      {mobileOpen && (
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontSize:'1.1rem'}}>Filters</h3>
          <button onClick={onCloseMobile} aria-label="Close filters" style={{padding:'4px'}}>
            <X size={20} />
          </button>
        </div>
      )}
      <div className="filter-section">
        <div className="filter-title">Category</div>
        {categories.map(c => (
          <div key={c} className="filter-option" onClick={()=>handleCategory(c)}>
            <input type="checkbox" checked={filters.category===c} onChange={()=>{}} />
            <span className="filter-label">{categoryLabels[c]}</span>
          </div>
        ))}
      </div>
      <div className="filter-section">
        <div className="filter-title">Gender</div>
        {genders.map(g => (
          <div key={g} className="filter-option" onClick={()=>handleGender(g)}>
            <input type="checkbox" checked={filters.gender===g} onChange={()=>{}} />
            <span className="filter-label" style={{textTransform:'capitalize'}}>{g}</span>
          </div>
        ))}
      </div>
      {brands.length > 0 && (
        <div className="filter-section">
          <div className="filter-title">Brand</div>
          {brands.slice(0, 10).map(b => (
            <div key={b} className="filter-option" onClick={()=>toggleBrand(b)}>
              <input type="checkbox" checked={filters.brands.includes(b)} onChange={()=>{}} />
              <span className="filter-label">{b}</span>
            </div>
          ))}
        </div>
      )}
      <div className="filter-section">
        <div className="filter-title">Price Range ($)</div>
        <div className="price-range">
          <input className="price-input" type="number" placeholder="Min" value={filters.minPrice ?? ''} onChange={e=>handleMinPrice(e.target.value)} />
          <input className="price-input" type="number" placeholder="Max" value={filters.maxPrice ?? ''} onChange={e=>handleMaxPrice(e.target.value)} />
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-title">Minimum Discount (%)</div>
        <input className="price-input" type="number" placeholder="e.g. 10" value={filters.minDiscount ?? ''} onChange={e=>handleMinDiscount(e.target.value)} />
      </div>
      <div className="filter-section">
        <div className="filter-title">Minimum Rating</div>
        <select className="price-input" value={filters.minRating ?? ''} onChange={e=>handleMinRating(e.target.value)}>
          <option value="">Any</option>
          <option value="4">4★ & above</option>
          <option value="4.5">4.5★ & above</option>
        </select>
      </div>
      <button className="btn btn-secondary btn-full clear-filters-btn" onClick={onClear}>
        Clear All Filters
      </button>
    </aside>
  );

  if (mobileOpen) {
    return (
      <>
        <div className="mobile-menu-overlay show" onClick={onCloseMobile} />
        <div style={{position:'fixed',top:0,left:0,bottom:0,width:'85%',maxWidth:'340px',zIndex:100,background:'var(--color-bg)',overflowY:'auto',boxShadow:'var(--shadow-lg)',transform:'translateX(0)',transition:'transform .3s'}}>
          <div style={{padding:'1rem'}}>{sidebar}</div>
        </div>
      </>
    );
  }

  return sidebar;
}
