export default function SortDropdown({ value, onChange }) {
  const options = [
    { key: 'recommended', label: 'Recommended' },
    { key: 'newest', label: 'Newest' },
    { key: 'price-asc', label: 'Price: Low to High' },
    { key: 'price-desc', label: 'Price: High to Low' },
    { key: 'rating', label: 'Top Rated' },
    { key: 'discount', label: 'Biggest Discount' },
  ];
  return (
    <div className="sort-wrap">
      <label className="sort-label" htmlFor="sort-select">Sort</label>
      <select
        id="sort-select"
        className="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(o => (
          <option key={o.key} value={o.key}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
