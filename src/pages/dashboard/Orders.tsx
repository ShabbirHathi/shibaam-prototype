import { Link } from 'react-router-dom';
import { Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOrdersByUserId } from '@/data/orders';
import { useUser } from '@/context/UserContext';

const Orders = () => {
  const { userId } = useUser();
  const orders = userId ? getOrdersByUserId(userId) : [];

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">My Orders</h1>
      
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-muted-foreground">{order.id}</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">${order.totalAmount}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    order.status === 'Delivered' ? 'bg-accent/10 text-accent' :
                    order.status === 'Shipped' || order.status === 'OutForDelivery' ? 'bg-primary/10 text-primary' :
                    'bg-amber/10 text-amber-foreground'
                  }`}>
                    {order.status === 'OutForDelivery' ? 'Out for Delivery' : order.status}
                  </span>
                  <Link to={`/dashboard/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item.productId} className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img src={item.productImage} alt={item.productName} className="h-full w-full object-cover" />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No orders yet.</p>
          <Link to="/"><Button className="mt-4">Start Shopping</Button></Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
