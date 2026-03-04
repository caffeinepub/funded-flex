import { Link } from '@tanstack/react-router';
import { MapPin, Phone, Mail, Pizza, Heart } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'samaypizza';
  const utmLink = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer style={{ backgroundColor: '#B71C1C', color: 'white' }}>
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Pizza className="w-6 h-6" style={{ color: '#B71C1C' }} />
              </div>
              <div>
                <h3 className="font-bold text-xl leading-none" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  Samay Pizza
                </h3>
                <p className="text-xs" style={{ color: '#FFCDD2' }}>Fresh &amp; Delicious</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#FFCDD2' }}>
              Serving the best pizza, Chinese, burgers and more in Gorakhpur. Made fresh with love, delivered hot to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Our Menu', path: '/menu' },
                { label: 'Place Order', path: '/order' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm transition-colors hover:text-white" style={{ color: '#FFCDD2' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FFCDD2' }} />
                <span className="text-sm" style={{ color: '#FFCDD2' }}>
                  Sonauli Road Pipiganj,<br />Gorakhpur (U.P.)
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <SiWhatsapp className="w-4 h-4 flex-shrink-0" style={{ color: '#4CAF50' }} />
                <a href="https://wa.me/918957401994" className="text-sm transition-colors hover:text-white" style={{ color: '#FFCDD2' }}>
                  +91 89574 01994
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#FFCDD2' }} />
                <a href="tel:+918957401994" className="text-sm transition-colors hover:text-white" style={{ color: '#FFCDD2' }}>
                  +91 89574 01994
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#FFCDD2' }} />
                <a href="mailto:monikakgupta2507@gmail.com" className="text-sm transition-colors hover:text-white break-all" style={{ color: '#FFCDD2' }}>
                  monikakgupta2507@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-red-800 py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm" style={{ color: '#FFCDD2' }}>
          <p>© {year} Samay Pizza. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 fill-current" style={{ color: '#FFCDD2' }} /> using{' '}
            <a href={utmLink} target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-medium">
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
