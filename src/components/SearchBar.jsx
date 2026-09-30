import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search products...' }) {
  return (
    <form
      className="search-input-wrap"
      style={{minWidth:220,maxWidth:400}}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
    >
      <Search size={16} className="search-icon" />
      <input
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter products by search"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
      <button
        type="submit"
        className="search-submit-btn"
        aria-label="Search"
      >
        <Search size={14} />
      </button>
    </form>
  );
}
