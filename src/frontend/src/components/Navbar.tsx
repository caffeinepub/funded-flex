import { Link, useRouter } from "@tanstack/react-router";
import { Menu, Pizza, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "Order", path: "/order" },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#B71C1C",
        boxShadow: "0 4px 20px rgba(183,28,28,0.3)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Pizza className="w-5 h-5" style={{ color: "#B71C1C" }} />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-white font-bold text-lg leading-none"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Samay Pizza
              </span>
              <span className="text-xs" style={{ color: "#FFCDD2" }}>
                Gorakhpur
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-white font-semibold"
                    : "text-white hover:bg-white/20"
                }`}
                style={isActive(link.path) ? { color: "#B71C1C" } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/order"
              className="relative flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors shadow-sm"
              style={{ color: "#B71C1C" }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-red-800 px-4 py-3 space-y-1"
          style={{ backgroundColor: "#8B0000" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(link.path)
                  ? "bg-white font-semibold"
                  : "text-white hover:bg-white/20"
              }`}
              style={isActive(link.path) ? { color: "#B71C1C" } : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
