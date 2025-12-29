import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RefreshCw, Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  const product = id ? getProductById(parseInt(id)) : undefined;

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">Product Not Found</h1>
            <Link to="/">
              <Button className="mt-4">Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/?category=${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl bg-muted aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.bestseller && (
                    <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                      Bestseller
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="rounded-full bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
                  {product.category.replace('-', ' ')}
                </p>
                <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber text-amber'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="rounded-md bg-destructive/10 px-2 py-1 text-sm font-medium text-destructive">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Details */}
              <div className="grid gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium text-foreground">{product.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Material</p>
                  <p className="font-medium text-foreground">{product.material}</p>
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="mb-3 text-sm font-medium text-foreground">
                  Color: <span className="text-muted-foreground">{product.colors[selectedColor]}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(index)}
                      className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                        selectedColor === index
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="mb-3 text-sm font-medium text-foreground">Quantity</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="secondary" className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                {[
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: Shield, text: 'Secure Checkout' },
                  { icon: RefreshCw, text: '30-Day Returns' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <feature.icon className="h-4 w-4 text-primary" />
                    {feature.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Related Products
                </h2>
                <Link to={`/?category=${product.category}`}>
                  <Button variant="ghost" className="gap-2">
                    View All
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
