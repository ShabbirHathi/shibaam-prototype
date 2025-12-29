import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOrdersByUserId } from '@/data/orders';
import { useUser } from '@/context/UserContext';

const Purchases = () => {
  const { userId } = useUser();
  const orders = userId ? getOrdersByUserId(userId) : [];
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  
  const purchasedItems = deliveredOrders.flatMap(order => 
    order.items.map(item => ({ ...item, orderId: order.id, purchaseDate: order.createdAt }))
  );

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">Purchased Products</h1>
      
      {purchasedItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {purchasedItems.map((item, index) => (
            <div key={`${item.orderId}-${item.productId}`} className="rounded-xl border border-border bg-card overflow-hidden shadow-card">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={item.productImage} alt={item.productName} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground line-clamp-1">{item.productName}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Purchased {new Date(item.purchaseDate).toLocaleDateString()}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Order: {item.orderId}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No purchased products yet.</p>
          <Link to="/"><Button className="mt-4">Start Shopping</Button></Link>
        </div>
      )}
    </div>
  );
};

export default Purchases;
