import { Link } from 'react-router-dom';
import { Package, ShoppingBag, ShoppingCart, TrendingUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getOrdersByUserId } from '@/data/orders';
import { useUser } from '@/context/UserContext';

const Overview = () => {
  const { userId } = useUser();
  const { getCartCount } = useCart();
  const orders = userId ? getOrdersByUserId(userId) : [];
  
  const activeOrders = orders.filter(o => o.status !== 'Delivered').length;
  const purchasedProducts = orders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.items.length, 0);

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: Package, color: 'bg-primary/10 text-primary', link: '/dashboard/orders' },
    { label: 'Active Orders', value: activeOrders, icon: TrendingUp, color: 'bg-amber/10 text-amber', link: '/dashboard/orders' },
    { label: 'Purchased Items', value: purchasedProducts, icon: ShoppingBag, color: 'bg-accent/10 text-accent', link: '/dashboard/purchases' },
    { label: 'Cart Items', value: getCartCount(), icon: ShoppingCart, color: 'bg-destructive/10 text-destructive', link: '/dashboard/cart' },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">Dashboard</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-foreground">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-sm font-medium text-primary hover:underline">View All</Link>
        </div>
        {orders.length > 0 ? (
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-mono text-sm">{order.id}</td>
                      <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm font-medium">${order.totalAmount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-accent/10 text-accent' :
                          order.status === 'Shipped' ? 'bg-primary/10 text-primary' :
                          'bg-amber/10 text-amber-foreground'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
