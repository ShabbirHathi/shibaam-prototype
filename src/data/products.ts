export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  size: string;
  material: string;
  colors: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  featured?: boolean;
  bestseller?: boolean;
}

export const categories = [
  { id: 'persian', name: 'Persian Rugs', icon: '🏛️' },
  { id: 'modern', name: 'Modern Rugs', icon: '🔲' },
  { id: 'traditional', name: 'Traditional', icon: '🎨' },
  { id: 'shag', name: 'Shag Rugs', icon: '🧶' },
  { id: 'outdoor', name: 'Outdoor Rugs', icon: '🌿' },
  { id: 'runner', name: 'Runners', icon: '➡️' },
  { id: 'area', name: 'Area Rugs', icon: '⬜' },
  { id: 'kids', name: 'Kids Rugs', icon: '🧸' },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Vintage Persian Medallion Rug",
    description: "Handcrafted vintage-inspired Persian rug featuring an intricate medallion design. Made from premium wool with natural dyes for a timeless, authentic look.",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    category: "persian",
    subcategory: "medallion",
    size: "8' x 10'",
    material: "100% Wool",
    colors: ["Rust", "Navy", "Ivory"],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    featured: true,
    bestseller: true,
  },
  {
    id: 2,
    name: "Geometric Modern Wool Rug",
    description: "Contemporary geometric pattern rug perfect for modern living spaces. Hand-tufted with premium New Zealand wool.",
    price: 649,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "modern",
    subcategory: "geometric",
    size: "6' x 9'",
    material: "New Zealand Wool",
    colors: ["Charcoal", "Cream", "Gold"],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    featured: true,
  },
  {
    id: 3,
    name: "Moroccan Berber Shag Rug",
    description: "Plush and cozy Moroccan-inspired shag rug. Features traditional diamond patterns with a modern twist.",
    price: 549,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "shag",
    subcategory: "moroccan",
    size: "5' x 8'",
    material: "Polypropylene Blend",
    colors: ["Ivory", "Black"],
    inStock: true,
    rating: 4.7,
    reviews: 156,
    bestseller: true,
  },
  {
    id: 4,
    name: "Traditional Oriental Rug",
    description: "Classic oriental rug with rich colors and intricate floral patterns. Machine-woven for durability.",
    price: 399,
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    category: "traditional",
    subcategory: "oriental",
    size: "5' x 7'",
    material: "Polypropylene",
    colors: ["Red", "Blue", "Cream"],
    inStock: true,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 5,
    name: "Natural Jute Area Rug",
    description: "Eco-friendly natural jute rug with a beautiful woven texture. Perfect for coastal or bohemian decor.",
    price: 289,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    category: "area",
    subcategory: "natural",
    size: "6' x 9'",
    material: "100% Natural Jute",
    colors: ["Natural", "Bleached"],
    inStock: true,
    rating: 4.4,
    reviews: 98,
  },
  {
    id: 6,
    name: "Kids Playroom Rainbow Rug",
    description: "Colorful and playful rug designed for kids' rooms and playrooms. Soft, durable, and easy to clean.",
    price: 199,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    category: "kids",
    subcategory: "playroom",
    size: "4' x 6'",
    material: "Nylon",
    colors: ["Multi"],
    inStock: true,
    rating: 4.9,
    reviews: 234,
    bestseller: true,
  },
  {
    id: 7,
    name: "Indoor/Outdoor Striped Rug",
    description: "Versatile indoor/outdoor rug with classic stripes. Weather-resistant and easy to maintain.",
    price: 179,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    category: "outdoor",
    subcategory: "striped",
    size: "5' x 8'",
    material: "Polypropylene",
    colors: ["Blue/White", "Gray/White", "Green/White"],
    inStock: true,
    rating: 4.3,
    reviews: 45,
  },
  {
    id: 8,
    name: "Hallway Runner - Vintage Style",
    description: "Elegant hallway runner with vintage-inspired pattern. Perfect for entryways and corridors.",
    price: 249,
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    category: "runner",
    subcategory: "vintage",
    size: "2'6\" x 10'",
    material: "Wool Blend",
    colors: ["Terracotta", "Navy", "Sage"],
    inStock: true,
    rating: 4.6,
    reviews: 78,
    featured: true,
  },
  {
    id: 9,
    name: "Luxe Silk Persian Rug",
    description: "Premium handwoven silk rug featuring traditional Persian motifs. A true statement piece for discerning collectors.",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80",
    category: "persian",
    subcategory: "silk",
    size: "9' x 12'",
    material: "100% Silk",
    colors: ["Burgundy", "Gold", "Ivory"],
    inStock: true,
    rating: 5.0,
    reviews: 32,
    featured: true,
  },
  {
    id: 10,
    name: "Minimalist Abstract Rug",
    description: "Contemporary abstract design rug with subtle textures. Ideal for modern, minimalist interiors.",
    price: 479,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    category: "modern",
    subcategory: "abstract",
    size: "6' x 9'",
    material: "Viscose Blend",
    colors: ["Gray", "Taupe", "Blush"],
    inStock: true,
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 11,
    name: "Bohemian Tassel Rug",
    description: "Free-spirited bohemian rug with decorative tassels and fringe. Adds warmth and character to any room.",
    price: 329,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "area",
    subcategory: "bohemian",
    size: "5' x 7'",
    material: "Cotton Blend",
    colors: ["Multi", "Neutral"],
    inStock: true,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 12,
    name: "Plush Shag Living Room Rug",
    description: "Ultra-soft high-pile shag rug for maximum comfort. Perfect for living rooms and bedrooms.",
    price: 599,
    originalPrice: 749,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "shag",
    subcategory: "plush",
    size: "8' x 10'",
    material: "Polyester",
    colors: ["Ivory", "Gray", "Blush"],
    inStock: true,
    rating: 4.8,
    reviews: 189,
    bestseller: true,
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getBestsellers = (): Product[] => {
  return products.filter(p => p.bestseller);
};
