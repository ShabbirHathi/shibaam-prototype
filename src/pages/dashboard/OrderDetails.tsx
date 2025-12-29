import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderTracker from '@/components/OrderTracker';
import { getOrderById } from '@/data/orders';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/dashboard/orders"><Button className="mt-4">Back to Orders</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/dashboard/orders" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" />Back to Orders
      </Link>
      
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Order {order.id}</h1>
          <p className="mt-1 text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
          order.status === 'Delivered' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
        }`}>
          {order.status === 'OutForDelivery' ? 'Out for Delivery' : order.status}
        </span>
      </div>

      {/* Order Tracking */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-6 font-display text-lg font-semibold">Order Tracking</h2>
        <OrderTracker currentStatus={order.status} trackingHistory={order.trackingHistory} />
      </div>

      {/* Order Items */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-6 font-display text-lg font-semibold">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted">
                <img src={item.productImage} alt={item.productName} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.productName}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium">${item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-border pt-4 text-right">
          <span className="text-lg font-bold">Total: ${order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
