import { Link } from '@tanstack/react-router';
import { Clock, Star, Truck, ChefHat, Phone, ArrowRight, Pizza, Flame, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const features = [
  {
    icon: <Truck className="w-7 h-7" style={{ color: '#B71C1C' }} />,
    title: '30-Min Delivery',
    desc: 'Hot & fresh at your doorstep',
  },
  {
    icon: <ChefHat className="w-7 h-7" style={{ color: '#B71C1C' }} />,
    title: 'Fresh Ingredients',
    desc: 'Made fresh every day',
  },
  {
    icon: <Flame className="w-7 h-7" style={{ color: '#B71C1C' }} />,
    title: 'Hot & Tasty',
    desc: 'Served piping hot always',
  },
  {
    icon: <Star className="w-7 h-7" style={{ color: '#B71C1C' }} />,
    title: 'Best Quality',
    desc: 'Premium taste guaranteed',
  },
];

const categories = [
  { emoji: '🍕', name: 'Pizza', desc: 'Regular, Medium & Large' },
  { emoji: '🍜', name: 'Chinese', desc: 'Chowmein, Manchurian & more' },
  { emoji: '🍚', name: 'Rice', desc: 'Fried Rice & Biryani' },
  { emoji: '🍔', name: 'Burger', desc: 'Veg & Classic Burgers' },
  { emoji: '🍟', name: 'Snacks', desc: 'Fries, Lava Cake & more' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1200x500.png')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-up"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
            >
              <Pizza className="w-4 h-4" />
              <span>Gorakhpur's Favourite Pizza Place</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-fade-up-delay-1"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Welcome to<br />
              <span style={{ color: '#FFD54F' }}>Samay Pizza</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 leading-relaxed animate-fade-up-delay-2" style={{ color: '#FFCDD2' }}>
              Fresh, hot &amp; delicious pizza delivered to your door. Serving Gorakhpur with love since day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up-delay-3">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-3.5 rounded-full text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ color: '#B71C1C' }}
              >
                Order Now <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/918957401994"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-all shadow-lg hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <SiWhatsapp className="w-5 h-5" />
                WhatsApp Order
              </a>
            </div>

            {/* Quick info */}
            <div className="flex flex-wrap gap-4 mt-8 animate-fade-up-delay-3">
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <Clock className="w-4 h-4" style={{ color: '#FFD54F' }} />
                <span>Open Daily 10am – 10pm</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <Phone className="w-4 h-4" style={{ color: '#FFD54F' }} />
                <span>+91 89574 01994</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center pt-1.5" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
            <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div key={i} className="pizza-card p-5 text-center group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-all"
                  style={{ backgroundColor: '#FFEBEE' }}
                >
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-14" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Our <span style={{ color: '#B71C1C' }}>Menu</span>
            </h2>
            <p className="text-gray-500 text-base max-w-md mx-auto">
              From crispy pizzas to sizzling Chinese — we've got everything to satisfy your cravings
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to="/menu"
                className="pizza-card p-5 text-center group cursor-pointer block"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                  {cat.emoji}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{cat.name}</h3>
                <p className="text-gray-500 text-xs">{cat.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-pizza"
              style={{ backgroundColor: '#B71C1C' }}
            >
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 red-gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Hungry? Order Now! 🍕
          </h2>
          <p className="text-lg mb-8" style={{ color: '#FFCDD2' }}>
            Call us or WhatsApp your order. We deliver hot &amp; fresh to your doorstep in Gorakhpur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918957401994"
              className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg hover:opacity-90"
              style={{ color: '#B71C1C' }}
            >
              <Phone className="w-5 h-5" />
              Call: +91 89574 01994
            </a>
            <a
              href="https://wa.me/918957401994"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <SiWhatsapp className="w-5 h-5" />
              WhatsApp Order
            </a>
          </div>
        </div>
      </section>

      {/* Address / Info Strip */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFEBEE' }}>
                <Clock className="w-5 h-5" style={{ color: '#B71C1C' }} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Opening Hours</p>
                <p className="text-gray-500 text-sm">Daily: 10:00 AM – 10:00 PM</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFEBEE' }}>
                <Phone className="w-5 h-5" style={{ color: '#B71C1C' }} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Order by Phone</p>
                <a href="tel:+918957401994" className="text-sm font-medium hover:underline" style={{ color: '#B71C1C' }}>
                  +91 89574 01994
                </a>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFEBEE' }}>
                <MapPin className="w-5 h-5" style={{ color: '#B71C1C' }} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Find Us</p>
                <p className="text-gray-500 text-sm">Sonauli Road Pipiganj, Gorakhpur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
