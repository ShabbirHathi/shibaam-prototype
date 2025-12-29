import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RefreshCw, Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { products, categories, getFeaturedProducts, getBestsellers } from '@/data/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Home = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const featuredFilter = searchParams.get('featured');
  const bestsellerFilter = searchParams.get('bestseller');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Apply featured filter
    if (featuredFilter === 'true') {
      result = getFeaturedProducts();
    }

    // Apply bestseller filter
    if (bestsellerFilter === 'true') {
      result = getBestsellers();
    }

    // Apply price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((p) => p.price >= min && (max ? p.price <= max : true));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [categoryFilter, featuredFilter, bestsellerFilter, sortBy, priceRange]);

  const pageTitle = categoryFilter
    ? categories.find((c) => c.id === categoryFilter)?.name || 'Products'
    : featuredFilter === 'true'
    ? 'Featured Collection'
    : bestsellerFilter === 'true'
    ? 'Bestsellers'
    : 'All Rugs';

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-foreground">Categories</h3>
        <div className="space-y-2">
          <Link
            to="/"
            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
              !categoryFilter ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            All Rugs
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/?category=${category.id}`}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                categoryFilter === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-foreground">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-200">Under $200</SelectItem>
            <SelectItem value="200-500">$200 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
            <SelectItem value="1000-99999">$1,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        {!categoryFilter && !featuredFilter && !bestsellerFilter && (
          <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
            <div className="pattern-texture absolute inset-0 opacity-20" />
            <div className="container relative z-10 px-4 md:px-6">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="animate-fade-up font-display text-4xl font-bold tracking-tight text-cream md:text-5xl lg:text-6xl">
                  Transform Your Space with
                  <span className="block text-primary">Premium Rugs</span>
                </h1>
                <p className="mt-6 animate-fade-up text-lg text-cream/80 [animation-delay:200ms]">
                  Discover our curated collection of handcrafted rugs and carpets. 
                  From traditional Persian designs to modern minimalist styles.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:400ms] animate-fade-up">
                  <Button size="lg" className="gap-2">
                    Shop Collection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Link to="/?featured=true">
                    <Button size="lg" variant="outline" className="border-cream/30 bg-transparent text-cream hover:bg-cream/10">
                      View Featured
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        {!categoryFilter && !featuredFilter && !bestsellerFilter && (
          <section className="border-b border-border bg-card py-8">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 md:grid-cols-4">
                {[
                  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $500' },
                  { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
                  { icon: RefreshCw, title: '30-Day Returns', desc: 'Hassle-free returns' },
                  { icon: Star, title: 'Quality Guaranteed', desc: 'Premium materials' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Quick Links */}
        {!categoryFilter && !featuredFilter && !bestsellerFilter && (
          <section className="py-12">
            <div className="container px-4 md:px-6">
              <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground md:text-3xl">
                Shop by Category
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                {categories.map((category, index) => (
                  <Link
                    key={category.id}
                    to={`/?category=${category.id}`}
                    className="group flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-3xl">{category.icon}</span>
                    <span className="text-center text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Desktop Sidebar */}
              <aside className="hidden w-64 flex-shrink-0 lg:block">
                <div className="sticky top-20 rounded-xl bg-card p-6 shadow-card">
                  <FilterSidebar />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                      {pageTitle}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {filteredProducts.length} products found
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="gap-2 lg:hidden">
                          <Filter className="h-4 w-4" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterSidebar />
                        </div>
                      </SheetContent>
                    </Sheet>

                    {/* Sort Dropdown */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters */}
                {(categoryFilter || priceRange !== 'all') && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {categoryFilter && (
                      <Link
                        to="/"
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {categories.find((c) => c.id === categoryFilter)?.name}
                        <X className="h-3 w-3" />
                      </Link>
                    )}
                    {priceRange !== 'all' && (
                      <button
                        onClick={() => setPriceRange('all')}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {priceRange.replace('-', ' - $')}
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-fade-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-lg text-muted-foreground">No products found</p>
                    <Link to="/">
                      <Button variant="link" className="mt-2">
                        View all products
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
