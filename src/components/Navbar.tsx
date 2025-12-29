import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { categories } from '@/data/products';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isLoggedIn } = useUser();
  const location = useLocation();
  const cartCount = getCartCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-lg text-primary-foreground">R</span>
          </div>
          <span className="hidden font-display text-xl font-semibold text-foreground sm:inline-block">
            RugsRoyale
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Categories
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link to={`/?category=${category.id}`} className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/?featured=true"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Featured
          </Link>
          <Link
            to="/?bestseller=true"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Bestsellers
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="hidden sm:flex">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col gap-2 px-4 py-4">
            <Link
              to="/"
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="border-t border-border pt-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
                Categories
              </p>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/?category=${category.id}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
            {!isLoggedIn && (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="mt-2 w-full">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
