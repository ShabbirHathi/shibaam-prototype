import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/"><Button className="mt-4">Start Shopping</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">My Cart</h1>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted">
              <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{item.product.name}</h3>
              <p className="text-sm text-muted-foreground">{item.product.size}</p>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <p className="font-bold">${item.product.price * item.quantity}</p>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${getCartTotal().toLocaleString()}</span>
        </div>
        <Link to="/checkout" className="mt-4 block">
          <Button className="w-full gap-2" size="lg">
            Proceed to Checkout<ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
