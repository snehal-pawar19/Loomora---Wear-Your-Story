import axios from 'axios';
import products from '../data/products.js';

export async function getProducts(signal) {
  try {
    const res = await axios.get('https://fakestoreapi.com/products/category/jewelery?limit=4', {
      signal,
      timeout: 2000,
    });

    if (res && Array.isArray(res.data) && res.data.length >= 2) {
      const bonus = res.data.slice(0, 4).map((item, idx) => {
        const localBase = products[products.length - 1 - ((idx + 2) % 6)];
        const basePrice = Math.max(39, Math.min(189, Math.round(item.price * 1.2)));
        const orig = Math.round(basePrice * 1.3);
        return {
          id: 300 + idx,
          brand: 'ARCADIA',
          title: item.title.length > 55 ? item.title.slice(0, 53) + '…' : item.title,
          category: 'beauty',
          gender: 'unisex',
          price: basePrice,
          originalPrice: orig,
          discount: Math.round(((orig - basePrice) / orig) * 100),
          rating: Math.max(3.9, Math.min(4.9, Number(item.rating?.rate) || 4.3)),
          reviewCount: item.rating?.count || 124,
          sizes: (localBase.sizes && localBase.sizes.length) ? localBase.sizes : ['One Size'],
          colors: localBase.colors || [],
          description: item.description?.slice(0, 150) || localBase.description,
          image: localBase.image,
          images: localBase.images,
          isNew: idx < 2,
          isTrending: idx >= 2,
        };
      });
      return [...products, ...bonus];
    }
    return products;
  } catch (_err) {
    return products;
  }
}

export function getProductById(id, list = products) {
  return list.find((p) => String(p.id) === String(id)) || null;
}

export function getProductsByCategory(category, list = products) {
  if (!category || category === 'all') return list;
  return list.filter((p) => p.category === category);
}

export function searchProducts(query, list = products) {
  const q = query.trim().replace(/\s+/g, ' ').toLowerCase();
  if (!q) return list;

  const categorySynonyms = {
    'home living': 'home-living',
    'home & living': 'home-living',
    'home': 'home-living',
    'homeliving': 'home-living',
    'skincare': 'beauty',
    'skin care': 'beauty',
    'makeup': 'beauty',
    'cosmetics': 'beauty',
    'serum': 'beauty',
    'lip balm': 'beauty',
    'toner': 'beauty',
    'sunscreen': 'beauty',
    'man': 'men',
    'mens': 'men',
    'menswear': 'men',
    'male': 'men',
    'guy': 'men',
    'gents': 'men',
    'woman': 'women',
    'womens': 'women',
    'womenswear': 'women',
    'female': 'women',
    'lady': 'women',
    'ladies': 'women',
    'boy': 'kids',
    'girl': 'kids',
    'children': 'kids',
    'child': 'kids',
    'baby': 'kids',
    'infant': 'kids',
    'toddler': 'kids',
    'shoe': 'footwear',
    'shoes': 'footwear',
    'sneaker': 'footwear',
    'sneakers': 'footwear',
    'boot': 'footwear',
    'boots': 'footwear',
    'bag': 'bags',
    'bags': 'bags',
    'handbag': 'bags',
    'tote': 'bags',
    'purse': 'bags',
    'crossbody': 'bags',
    'earring': 'jewellery',
    'earrings': 'jewellery',
    'necklace': 'jewellery',
    'jewelry': 'jewellery',
    'kurta': 'kurtas',
    'kurtas': 'kurtas',
    'saree': 'sarees',
    'sarees': 'sarees',
    'sari': 'sarees',
    'dress': 'dresses',
    'dresses': 'dresses',
    'shirt': 'shirts',
    'shirts': 'shirts',
    'tshirt': 't-shirts',
    'tee': 't-shirts',
    't-shirt': 't-shirts',
    'tshirts': 't-shirts',
    'jean': 'jeans',
    'jeans': 'jeans',
    'denim': 'jeans',
    'trouser': 'trousers',
    'trousers': 'trousers',
    'pant': 'trousers',
    'pants': 'trousers',
    'sunglass': 'accessories',
    'sunglasses': 'accessories',
    'hat': 'accessories',
    'cap': 'accessories',
    'fedora': 'accessories',
    'vase': 'home-living',
    'candle': 'home-living',
    'lamp': 'home-living',
    'blanket': 'home-living',
    'dinnerware': 'home-living',
    'cutting board': 'home-living',
    'ceramic': 'home-living',
    'rattan': 'home-living',
  };

  const resolvedQ = categorySynonyms[q] || q;

  const tokens = q.split(' ').filter(Boolean);

  return list.filter((p) => {
    // Build searchable haystack: every meaningful text field on the product
    const rawFields = [
      p.id != null ? String(p.id) : '',
      p.title || '',
      p.name || p.title || '',
      p.brand || '',
      p.category || '',
      p.gender || '',
      p.description || '',
    ];
    if (Array.isArray(p.sizes)) rawFields.push(...p.sizes);
    if (Array.isArray(p.colors)) rawFields.push(...p.colors);

    const hay = rawFields
      .filter(Boolean)
      .join(' ')
      .replace(/[^a-z0-9\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .toLowerCase();

    // 1. Exact category match (after synonym resolution)
    if (p.category && resolvedQ === String(p.category).toLowerCase()) return true;

    // 2. Exact gender match
    if (p.gender) {
      const g = String(p.gender).toLowerCase();
      if (resolvedQ === g || q === g) return true;
    }

    // 3. Whole resolved-query substring anywhere in haystack
    if (hay.includes(resolvedQ)) return true;

    // 4. Multi-token AND search: every token must appear (skip single-char tokens)
    if (tokens.length > 1 && tokens.every((t) => t.length > 1 && hay.includes(t))) {
      return true;
    }

    // 5. Brand match (prefix, contains, or vice-versa — so "east" matches EASTWEAVE)
    if (tokens.length === 1 && p.brand) {
      const b = String(p.brand).toLowerCase();
      const t = tokens[0];
      if (t.length >= 3 && (b.startsWith(t) || b.includes(t) || t.includes(b))) {
        return true;
      }
    }

    // 6. Title word-starts-with for quick-as-you-type matching
    if (tokens.length === 1 && tokens[0].length >= 3 && p.title) {
      const t = tokens[0];
      const titleWords = String(p.title).toLowerCase().split(/\s+/);
      if (titleWords.some((w) => w.startsWith(t) || w.includes(t))) return true;
    }

    // 7. Description keyword match for richer queries
    if (tokens.length === 1 && tokens[0].length >= 5 && p.description) {
      const d = String(p.description).toLowerCase();
      if (d.includes(tokens[0])) return true;
    }

    return false;
  });
}

export function getNewArrivals(list = products, limit = 8) {
  return list.filter((p) => p.isNew).slice(0, limit);
}

export function getTrending(list = products, limit = 8) {
  return list.filter((p) => p.isTrending).slice(0, limit);
}

export function applyFilters(list, filters) {
  let r = [...list];
  if (filters.category) r = r.filter((p) => p.category === filters.category);
  if (filters.gender)
    r = r.filter((p) => p.gender === filters.gender || p.gender === 'unisex');
  if (filters.brands?.length)
    r = r.filter((p) => filters.brands.includes(p.brand));
  if (typeof filters.minPrice === 'number')
    r = r.filter((p) => p.price >= filters.minPrice);
  if (typeof filters.maxPrice === 'number')
    r = r.filter((p) => p.price <= filters.maxPrice);
  if (filters.minDiscount)
    r = r.filter((p) => p.discount >= filters.minDiscount);
  if (filters.minRating) r = r.filter((p) => p.rating >= filters.minRating);
  return r;
}

export function sortProducts(list, sortKey) {
  const arr = [...list];
  switch (sortKey) {
    case 'newest':
      return arr.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.discount - a.discount;
      });
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price);
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating);
    case 'discount':
      return arr.sort((a, b) => b.discount - a.discount);
    case 'recommended':
    default:
      return arr;
  }
}
