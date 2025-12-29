import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, ShoppingCart, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const menuItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/orders', label: 'My Orders', icon: Package },
  { path: '/dashboard/purchases', label: 'Purchased Products', icon: ShoppingBag },
  { path: '/dashboard/cart', label: 'My Cart', icon: ShoppingCart },
  { path: '/dashboard/profile', label: 'Profile', icon: User },
];

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const Sidebar = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="flex h-full flex-col">
      <div className="mb-6 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary text-lg font-bold text-primary-foreground">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Button variant="ghost" className="mt-auto justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex flex-1 gap-8 px-4 py-8 md:px-6">
        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-20 rounded-xl border border-border bg-card p-6 shadow-card">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
