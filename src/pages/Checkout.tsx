import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CreditCard, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Order, OrderItem, mockOrders } from '@/data/orders';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { isLoggedIn, userId } = useUser();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-20">
          <div className="text-center">
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mb-6 text-muted-foreground">
              Add some rugs before checking out.
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zip'];
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create order items
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Create new order
    const newOrder: Order = {
      id: orderId,
      userId: isLoggedIn ? userId! : undefined,
      isGuest: !isLoggedIn,
      items: orderItems,
      totalAmount: getCartTotal() + (getCartTotal() >= 500 ? 0 : 49),
      status: 'Placed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      },
      trackingHistory: [
        {
          status: 'Placed',
          timestamp: new Date().toISOString(),
          description: 'Order confirmed and payment received',
        },
      ],
    };

    // Store order (in a real app, this would be sent to the backend)
    mockOrders.push(newOrder);
    localStorage.setItem('lastOrder', JSON.stringify(newOrder));

    // Clear cart
    clearCart();

    setIsProcessing(false);

    // Navigate to success page
    navigate('/order-success', { state: { orderId } });
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Shipping Information */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                    Shipping Information
                  </h2>

                  {!isLoggedIn && (
                    <div className="mb-6 rounded-lg bg-secondary/50 p-4">
                      <p className="text-sm text-muted-foreground">
                        <Link to="/login" className="font-medium text-primary hover:underline">
                          Sign in
                        </Link>{' '}
                        to save your information for faster checkout next time.
                      </p>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="NY"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="10001"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info (Placeholder) */}
                <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                    <CreditCard className="h-5 w-5" />
                    Payment
                  </h2>
                  <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-4">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Payment processing is simulated for this demo. Click "Place Order" to complete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="mb-6 font-display text-xl font-semibold text-foreground">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="max-h-64 space-y-4 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-foreground">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 border-t border-border pt-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3 text-lg font-semibold text-foreground">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 w-full gap-2"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
