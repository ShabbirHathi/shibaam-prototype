import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

const OrderSuccess = () => {
  const location = useLocation();
  const { isLoggedIn } = useUser();
  const orderId = location.state?.orderId || 'ORD-DEMO-12345';

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            {/* Success Animation */}
            <div className="mb-8 flex justify-center animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>

            <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl animate-fade-up">
              Order Placed Successfully!
            </h1>
            <p className="mb-8 text-lg text-muted-foreground animate-fade-up [animation-delay:100ms]">
              Thank you for shopping with RugsRoyale. Your order has been confirmed.
            </p>

            {/* Order Info Card */}
            <div className="mb-8 rounded-xl border border-border bg-card p-6 text-left shadow-card animate-fade-up [animation-delay:200ms]">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono text-lg font-semibold text-foreground">{orderId}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Order confirmation email sent</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>Estimated delivery: 5-7 business days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>You'll receive tracking updates via email</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-up [animation-delay:300ms]">
              {isLoggedIn ? (
                <Link to="/dashboard/orders">
                  <Button size="lg" className="w-full gap-2 sm:w-auto">
                    Track Order
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto">
                    Sign in to track order
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link to="/">
                <Button size="lg" variant="outline" className="w-full gap-2 sm:w-auto">
                  <Home className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {!isLoggedIn && (
              <p className="mt-8 text-sm text-muted-foreground animate-fade-up [animation-delay:400ms]">
                Create an account to track your orders, view purchase history, and enjoy faster checkout.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
