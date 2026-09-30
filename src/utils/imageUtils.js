export const FALLBACK_IMG = '/product-fallback.svg';
export const FALLBACK_JPG = '/fallback-product.jpg';

const CATEGORY_PALETTES = {
  men: { bg1: '#FAF7F2', bg2: '#E8DFD0', accent: '#8B6F47', accent2: '#4B4B4B', shape: '#C07F5D' },
  women: { bg1: '#FDF5F2', bg2: '#F3E0D8', accent: '#C98E8F', accent2: '#8B5E3C', shape: '#A8B89A' },
  kids: { bg1: '#F5F9FF', bg2: '#DCE9F7', accent: '#5B8FB9', accent2: '#E8B4BC', shape: '#A8D5BA' },
  beauty: { bg1: '#FDF9F4', bg2: '#F3EAD9', accent: '#C07F5D', accent2: '#B8A9C9', shape: '#E8B4BC' },
  'home-living': { bg1: '#F7F3EC', bg2: '#E8DFC7', accent: '#8B7355', accent2: '#A8B89A', shape: '#C07F5D' },
  kurtas: { bg1: '#FBF4ED', bg2: '#EEDFCB', accent: '#9B59B6', accent2: '#C0392B', shape: '#D4A574' },
  sarees: { bg1: '#FFF5F5', bg2: '#F5DCDC', accent: '#C0392B', accent2: '#F1C40F', shape: '#9B59B6' },
  dresses: { bg1: '#FDF5F9', bg2: '#F0DCE8', accent: '#B87CAE', accent2: '#C98E8F', shape: '#A8B89A' },
  shirts: { bg1: '#F5F7FA', bg2: '#DCE3EC', accent: '#2A3B4C', accent2: '#8B6F47', shape: '#6B7A5A' },
  't-shirts': { bg1: '#F7F5F2', bg2: '#E5DED2', accent: '#4B4B4B', accent2: '#8B6F47', shape: '#6B7A5A' },
  jeans: { bg1: '#F3F5F7', bg2: '#CED6DE', accent: '#2A3B4C', accent2: '#4B6584', shape: '#5B6B7A' },
  trousers: { bg1: '#F5F3EF', bg2: '#E0D9CD', accent: '#6B5D4E', accent2: '#8B7355', shape: '#5B5347' },
  footwear: { bg1: '#F5F2EF', bg2: '#E0D5C7', accent: '#8B6F47', accent2: '#4B4B4B', shape: '#6B5D4E' },
  bags: { bg1: '#F7F2ED', bg2: '#E5D7C7', accent: '#4B4B4B', accent2: '#8B6F47', shape: '#6B5D4E' },
  jewellery: { bg1: '#FDF9F3', bg2: '#F3E5C9', accent: '#C9A227', accent2: '#C07F5D', shape: '#B8860B' },
  accessories: { bg1: '#F4F2EF', bg2: '#DED7CB', accent: '#6B5D4E', accent2: '#8B7355', shape: '#8B5E3C' },
  banner: { bg1: '#FAF7F2', bg2: '#E8DFD0', accent: '#8B6F47', accent2: '#C07F5D', shape: '#4B4B4B' },
  promo: { bg1: '#F7F3EC', bg2: '#E0D5C0', accent: '#C07F5D', accent2: '#8B6F47', shape: '#A8B89A' },
};

function inferCategoryFromSeed(seed) {
  const s = String(seed).toLowerCase();
  if (s.includes('-w-') || s.includes('women') || s.includes('dress') || s.includes('blouse') || s.includes('kurta') || s.includes('saree') || s.includes('cardigan')) {
    if (s.includes('kurta')) return 'kurtas';
    if (s.includes('saree')) return 'sarees';
    if (s.includes('dress')) return 'dresses';
    return 'women';
  }
  if (s.includes('-m-') || s.includes('men') || s.includes('shirt') || s.includes('hoodie') || s.includes('overcoat') || s.includes('sweater') || s.includes('trouser') || s.includes('shorts')) {
    if (s.includes('shirt')) return 'shirts';
    if (s.includes('trouser')) return 'trousers';
    return 'men';
  }
  if (s.includes('-k-') || s.includes('kids') || s.includes('baby') || s.includes('child')) return 'kids';
  if (s.includes('-b-') || s.includes('beauty') || s.includes('serum') || s.includes('toner') || s.includes('mask') || s.includes('sunscreen') || s.includes('lip')) return 'beauty';
  if (s.includes('-h-') || s.includes('home') || s.includes('vase') || s.includes('candle') || s.includes('lamp') || s.includes('blanket') || s.includes('dinnerware') || s.includes('cutting')) return 'home-living';
  if (s.includes('sneaker') || s.includes('boot') || s.includes('shoe')) return 'footwear';
  if (s.includes('bag') || s.includes('tote') || s.includes('crossbody')) return 'bags';
  if (s.includes('earring') || s.includes('necklace')) return 'jewellery';
  if (s.includes('sunglass') || s.includes('hat') || s.includes('fedora')) return 'accessories';
  if (s.includes('tshirt') || s.includes('tee')) return 't-shirts';
  if (s.includes('jean')) return 'jeans';
  if (s.includes('hero') || s.includes('banner')) return 'banner';
  if (s.includes('promo') || s.includes('essentials') || s.includes('edit')) return 'promo';
  return 'women';
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pseudoRand(seed, offset) {
  const n = hashString(seed + ':' + offset);
  return (n % 1000) / 1000;
}

function categoryIconPaths(category, cx, cy, size) {
  const half = size / 2;
  switch (category) {
    case 'men':
      return `<rect x="${cx - half * 0.7}" y="${cy - half * 0.8}" width="${half * 1.4}" height="${half * 1.2}" rx="4" />
              <circle cx="${cx}" cy="${cy - half * 0.9}" r="${half * 0.35}" />`;
    case 'women':
      return `<path d="M${cx} ${cy - half} L${cx} ${cy + half * 0.5} M${cx - half * 0.6} ${cy - half * 0.2} L${cx + half * 0.6} ${cy - half * 0.2} M${cx - half * 0.4} ${cy + half * 0.5} L${cx + half * 0.4} ${cy + half * 0.5}" stroke-width="3" stroke-linecap="round" fill="none" />
              <circle cx="${cx}" cy="${cy - half * 0.55}" r="${half * 0.3}" fill-opacity="0.85" />`;
    case 'kids':
      return `<circle cx="${cx - half * 0.2}" cy="${cy - half * 0.4}" r="${half * 0.35}" fill-opacity="0.9" />
              <path d="M${cx - half * 0.7} ${cy + half * 0.3} Q${cx} ${cy - half * 0.1} ${cx + half * 0.7} ${cy + half * 0.3}" fill-opacity="0.85" />`;
    case 'beauty':
      return `<circle cx="${cx}" cy="${cy}" r="${half * 0.55}" fill-opacity="0.9" />
              <rect x="${cx - half * 0.15}" y="${cy - half * 0.9}" width="${half * 0.3}" height="${half * 0.4}" rx="2" fill-opacity="0.95" />`;
    case 'home-living':
      return `<path d="M${cx - half * 0.8} ${cy + half * 0.4} L${cx} ${cy - half * 0.8} L${cx + half * 0.8} ${cy + half * 0.4} Z" fill-opacity="0.9" />
              <rect x="${cx - half * 0.25}" y="${cy}" width="${half * 0.5}" height="${half * 0.4}" rx="1" fill-opacity="0.7" />`;
    case 'kurtas':
    case 'sarees':
    case 'dresses':
      return `<path d="M${cx - half * 0.25} ${cy - half * 0.9} L${cx + half * 0.25} ${cy - half * 0.9} L${cx + half * 0.55} ${cy - half * 0.5} L${cx + half * 0.7} ${cy + half * 0.8} L${cx - half * 0.7} ${cy + half * 0.8} L${cx - half * 0.55} ${cy - half * 0.5} Z" fill-opacity="0.9" />`;
    case 'shirts':
    case 't-shirts':
      return `<path d="M${cx - half * 0.65} ${cy - half * 0.5} L${cx - half * 0.3} ${cy - half * 0.85} L${cx + half * 0.3} ${cy - half * 0.85} L${cx + half * 0.65} ${cy - half * 0.5} L${cx + half * 0.45} ${cy - half * 0.25} L${cx + half * 0.45} ${cy + half * 0.7} L${cx - half * 0.45} ${cy + half * 0.7} L${cx - half * 0.45} ${cy - half * 0.25} Z" fill-opacity="0.92" />`;
    case 'jeans':
    case 'trousers':
      return `<path d="M${cx - half * 0.5} ${cy - half * 0.85} L${cx + half * 0.5} ${cy - half * 0.85} L${cx + half * 0.45} ${cy + half * 0.85} L${cx + half * 0.1} ${cy + half * 0.85} L${cx} ${cy - half * 0.2} L${cx - half * 0.1} ${cy + half * 0.85} L${cx - half * 0.45} ${cy + half * 0.85} Z" fill-opacity="0.92" />`;
    case 'footwear':
      return `<path d="M${cx - half * 0.75} ${cy + half * 0.3} Q${cx - half * 0.3} ${cy - half * 0.2} ${cx + half * 0.1} ${cy - half * 0.1} L${cx + half * 0.75} ${cy - half * 0.1} L${cx + half * 0.75} ${cy + half * 0.3} Z" fill-opacity="0.93" />`;
    case 'bags':
      return `<rect x="${cx - half * 0.55}" y="${cy - half * 0.4}" width="${half * 1.1}" height="${half * 1.0}" rx="5" fill-opacity="0.92" />
              <path d="M${cx - half * 0.35} ${cy - half * 0.4} Q${cx} ${cy - half * 0.95} ${cx + half * 0.35} ${cy - half * 0.4}" fill="none" stroke-width="3" stroke-linecap="round" />`;
    case 'jewellery':
      return `<circle cx="${cx}" cy="${cy - half * 0.2}" r="${half * 0.45}" fill="none" stroke-width="4" fill-opacity="0.3" />
              <circle cx="${cx}" cy="${cy + half * 0.3}" r="${half * 0.12}" fill-opacity="0.95" />`;
    case 'accessories':
      return `<rect x="${cx - half * 0.7}" y="${cy - half * 0.3}" width="${half * 1.4}" height="${half * 0.4}" rx="${half * 0.2}" fill-opacity="0.92" />
              <circle cx="${cx - half * 0.45}" cy="${cy - half * 0.1}" r="${half * 0.08}" fill-opacity="0.5" />
              <circle cx="${cx + half * 0.45}" cy="${cy - half * 0.1}" r="${half * 0.08}" fill-opacity="0.5" />`;
    case 'banner':
    case 'promo':
    default:
      return `<rect x="${cx - half * 0.85}" y="${cy - half * 0.6}" width="${half * 1.7}" height="${half * 1.2}" rx="6" fill-opacity="0.88" />
              <rect x="${cx - half * 0.6}" y="${cy - half * 0.35}" width="${half * 1.2}" height="${half * 0.18}" rx="2" fill-opacity="0.95" />
              <rect x="${cx - half * 0.45}" y="${cy + half * 0.05}" width="${half * 0.9}" height="${half * 0.12}" rx="2" fill-opacity="0.95" />`;
  }
}

function buildProductSvg(seed, w, h) {
  const safeSeed = String(seed).replace(/[^a-zA-Z0-9_-]/g, '-');
  const baseSeed = safeSeed.replace(/-(1|2|3)$/, '');
  const variant = safeSeed.endsWith('-1') ? 1 : safeSeed.endsWith('-2') ? 2 : safeSeed.endsWith('-3') ? 3 : 0;

  const category = inferCategoryFromSeed(safeSeed);
  const palette = CATEGORY_PALETTES[category] || CATEGORY_PALETTES.women;

  const cx = w / 2 + (pseudoRand(baseSeed, 1) - 0.5) * (w * 0.1);
  const cy = h / 2 + (pseudoRand(baseSeed, 2) - 0.5) * (h * 0.08);
  const iconSize = Math.min(w, h) * (0.55 + pseudoRand(baseSeed, 3) * 0.15);

  const shapeColor = variant === 2 ? palette.accent2 : variant === 3 ? palette.shape : palette.accent;
  const accentAlt = variant === 1 ? palette.accent2 : variant === 2 ? palette.shape : palette.accent2;

  const gradId = `g_${hashString(safeSeed)}`;
  const patternId = `p_${hashString(safeSeed + 'p')}`;

  let decorShapes = '';
  const decorCount = 4 + Math.floor(pseudoRand(baseSeed, 10) * 4);
  for (let i = 0; i < decorCount; i++) {
    const r = Math.min(w, h) * (0.02 + pseudoRand(baseSeed, 20 + i) * 0.06);
    const dx = pseudoRand(baseSeed, 30 + i) * w;
    const dy = pseudoRand(baseSeed, 40 + i) * h;
    const op = 0.08 + pseudoRand(baseSeed, 50 + i) * 0.18;
    if (pseudoRand(baseSeed, 60 + i) > 0.5) {
      decorShapes += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="${r.toFixed(1)}" fill="${accentAlt}" fill-opacity="${op.toFixed(2)}" />`;
    } else {
      const rw = r * (1.2 + pseudoRand(baseSeed, 70 + i) * 0.8);
      decorShapes += `<rect x="${(dx - rw / 2).toFixed(1)}" y="${(dy - r / 2).toFixed(1)}" width="${rw.toFixed(1)}" height="${r.toFixed(1)}" rx="2" fill="${accentAlt}" fill-opacity="${op.toFixed(2)}" transform="rotate(${(pseudoRand(baseSeed, 80 + i) * 60 - 30).toFixed(1)} ${dx.toFixed(1)} ${dy.toFixed(1)})" />`;
    }
  }

  let stripeLayer = '';
  if (variant === 2) {
    for (let i = 0; i < 8; i++) {
      const y = (h / 8) * i;
      stripeLayer += `<rect x="0" y="${y}" width="${w}" height="${h * 0.015}" fill="${palette.accent}" fill-opacity="0.09" />`;
    }
  } else if (variant === 3) {
    for (let i = -6; i < 12; i++) {
      const y = (h / 6) * i;
      stripeLayer += `<rect x="${y - w}" y="${y}" width="${w * 2}" height="${h * 0.02}" fill="${palette.shape}" fill-opacity="0.07" transform="rotate(-30 ${w / 2} ${h / 2})" />`;
    }
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.bg1}" />
      <stop offset="100%" stop-color="${palette.bg2}" />
    </linearGradient>
    <pattern id="${patternId}" width="${Math.max(20, w * 0.04)}" height="${Math.max(20, h * 0.04)}" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.8" fill="${palette.accent}" fill-opacity="0.07" />
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${gradId})" />
  <rect width="${w}" height="${h}" fill="url(#${patternId})" />
  ${stripeLayer}
  ${decorShapes}
  <g fill="${shapeColor}">
    ${categoryIconPaths(category, cx, cy, iconSize)}
  </g>
  <rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="${palette.accent}" stroke-opacity="0.2" stroke-width="1" rx="2" />
</svg>`;

  return svg;
}

function svgToDataUri(svg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export function buildImg(seed, w = 800, h = 800) {
  if (!seed) seed = 'loomora-generic';
  const svg = buildProductSvg(seed, w, h);
  return svgToDataUri(svg);
}

export const PIC = (seed, w = 800, h = 800) => buildImg(seed, w, h);

export function safeImgSrc(src) {
  if (src == null) return FALLBACK_JPG;
  if (typeof src !== 'string') return FALLBACK_JPG;
  const s = src.trim();
  if (!s) return FALLBACK_JPG;
  if (s === '#' || s === 'about:blank') return FALLBACK_JPG;
  if (s.startsWith('blob:') || s.startsWith('data:,')) return FALLBACK_JPG;
  if (s.includes('loomora-generating') || s.includes('image-is-generating') || s.includes('text_to_image') || s.includes('coresg-normal.trae.ai')) return FALLBACK_JPG;
  return s;
}

export function handleImgError(e) {
  const t = e && e.currentTarget;
  if (!t) return;
  if (!t.__loomoraFbStage) t.__loomoraFbStage = 0;
  t.__loomoraFbStage += 1;
  t.onerror = null;

  if (t.__loomoraFbStage === 1) {
    t.src = FALLBACK_JPG;
    return;
  }
  t.src = FALLBACK_IMG;
}

export default { PIC, buildImg, safeImgSrc, handleImgError, FALLBACK_IMG, FALLBACK_JPG };
