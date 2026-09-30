import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { SearchBar, FilterSidebar, SortDropdown, ProductGrid, Loader, EmptyState } from '../components/Navname.jsx';
import { getProducts, searchProducts, applyFilters, sortProducts } from '../services/productService.js';
import productsData from '../data/products.js';

const categoryLabelMap = {
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

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || null;
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialDiscount = searchParams.get('discount') ? Number(searchParams.get('discount')) : null;

  const [allProducts, setAllProducts] = useState(productsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filters, setFilters] = useState({
    category: currentCategory,
    gender: null,
    brands: [],
    minPrice: null,
    maxPrice: null,
    minDiscount: initialDiscount,
    minRating: null,
  });
  const [sort, setSort] = useState('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await getProducts(controller.signal);
        setAllProducts(result || productsData);
      } catch (e) {
        if (e.name !== 'CanceledError' && e.code !== 'ERR_CANCELED') {
          setError(e);
          setAllProducts(productsData);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const q = searchParams.get('search') || searchParams.get('q') || '';
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    setFilters(f => ({ ...f, category: currentCategory }));
  }, [currentCategory]);

  const display = useMemo(() => {
    const withFilters = { ...filters, category: currentCategory || filters.category };
    const step1 = searchProducts(searchQuery, allProducts);
    const step2 = applyFilters(step1, withFilters);
    const step3 = sortProducts(step2, sort);
    return step3;
  }, [allProducts, searchQuery, filters, sort, currentCategory]);

  const resetAll = () => {
    setFilters({
      category: null,
      gender: null,
      brands: [],
      minPrice: null,
      maxPrice: null,
      minDiscount: null,
      minRating: null,
    });
    setSort('recommended');
    setSearchQuery('');
    const next = new URLSearchParams();
    setSearchParams(next, { replace: true });
  };

  const retry = () => {
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getProducts(controller.signal);
        setAllProducts(result || productsData);
      } catch (e) {
        setError(e);
        setAllProducts(productsData);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <>
      <div className="container" style={{paddingTop:'2rem'}}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Shop {currentCategory ? '/ ' + capitalize(categoryLabelMap[currentCategory] || currentCategory) : ''}</span>
        </div>
        <h1 style={{fontFamily:'var(--font-serif)',marginBottom:'1rem'}}>
          {categoryLabelMap[currentCategory] || 'All Products'}
        </h1>
        <div className="toolbar">
          <div>
            <SearchBar
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                const next = new URLSearchParams(searchParams);
                if (val) next.set('q', val);
                else next.delete('q');
                setSearchParams(next, { replace: true });
              }}
              onSubmit={() => {
                const next = new URLSearchParams(searchParams);
                const query = searchQuery.trim();
                if (query) next.set('q', query);
                else next.delete('q');
                setSearchParams(next, { replace: true });
              }}
            />
          </div>
          <div style={{display:'flex',gap:'1rem',alignItems:'center',flexWrap:'wrap'}}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setMobileFilterOpen(true)}
              style={{display:'inline-flex'}}
            >
              <Filter size={14}/> Filters
            </button>
            <SortDropdown value={sort} onChange={setSort} />
            <span className="results-count">{display.length} {display.length === 1 ? 'product' : 'products'}</span>
          </div>
        </div>
      </div>

      <div className="products-layout container" style={{paddingBottom:'4rem'}}>
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onClear={resetAll}
          allProducts={allProducts}
          mobileOpen={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />
        <div>
          {loading && <Loader label="Loading products..." />}
          {error && !loading && (
            <EmptyState
              title="Couldn't load products"
              message={(error && error.message) ? error.message : 'Please try again.'}
              actionLabel="Retry"
              onClick={retry}
            />
          )}
          {!loading && !error && display.length === 0 && (
            <EmptyState
              title="No products match"
              message="Try adjusting your filters or search for something else."
              actionLabel="Clear Filters"
              onClick={resetAll}
            />
          )}
          {!loading && !error && display.length > 0 && (
            <ProductGrid products={display} />
          )}
        </div>
      </div>
    </>
  );
}
