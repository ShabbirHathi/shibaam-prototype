import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mb-6 text-muted-foreground">
              Looks like you haven't added any rugs yet.
            </p>
            <Link to="/">
              <Button className="gap-2">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="mb-8 font-display text-3xl font-bold text-foreground">
            Shopping Cart ({getCartCount()} items)
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card animate-fade-in"
                  >
                    {/* Image */}
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <div className="h-24 w-24 overflow-hidden rounded-lg bg-muted md:h-32 md:w-32">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover transition-transform hover:scale-110"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.product.size} • {item.product.material}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-foreground">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/" className="mt-6 inline-block">
                <Button variant="ghost" className="gap-2">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{getCartTotal() >= 500 ? 'Free' : '$49'}</span>
                  </div>
                  {getCartTotal() < 500 && (
                    <p className="text-sm text-primary">
                      Add ${(500 - getCartTotal()).toLocaleString()} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-semibold text-foreground">
                      <span>Total</span>
                      <span>
                        ${(getCartTotal() + (getCartTotal() >= 500 ? 0 : 49)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="mt-6 block">
                  <Button className="w-full gap-2" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
