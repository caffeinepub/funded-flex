import { useState } from 'react';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from '@tanstack/react-router';

// ─── Menu Data ───────────────────────────────────────────────────────────────

interface SizedItem {
  name: string;
  sizes: { label: string; price: number }[];
}

interface FixedItem {
  name: string;
  price: number | null;
  note?: string;
}

const pizzaItems: SizedItem[] = [
  { name: 'Cheese Corn', sizes: [{ label: 'Regular', price: 90 }, { label: 'Medium', price: 150 }, { label: 'Large', price: 250 }] },
  { name: 'Spicy Indian', sizes: [{ label: 'Regular', price: 100 }, { label: 'Medium', price: 150 }, { label: 'Large', price: 250 }] },
  { name: 'Simply Veg', sizes: [{ label: 'Regular', price: 90 }, { label: 'Medium', price: 140 }, { label: 'Large', price: 230 }] },
  { name: 'Paneer Ka Maza', sizes: [{ label: 'Regular', price: 100 }, { label: 'Medium', price: 160 }, { label: 'Large', price: 260 }] },
  { name: 'Double Cheese', sizes: [{ label: 'Regular', price: 110 }, { label: 'Medium', price: 170 }, { label: 'Large', price: 270 }] },
  { name: 'Paneer Makhani', sizes: [{ label: 'Regular', price: 110 }, { label: 'Medium', price: 170 }, { label: 'Large', price: 270 }] },
  { name: 'Sabz Bahar', sizes: [{ label: 'Regular', price: 100 }, { label: 'Medium', price: 155 }, { label: 'Large', price: 255 }] },
  { name: 'Samay Pizza Special', sizes: [{ label: 'Regular', price: 150 }, { label: 'Medium', price: 180 }, { label: 'Large', price: 300 }] },
  { name: 'Tandoori Paneer', sizes: [{ label: 'Regular', price: 120 }, { label: 'Medium', price: 180 }, { label: 'Large', price: 280 }] },
  { name: 'Veggie Supreme', sizes: [{ label: 'Regular', price: 110 }, { label: 'Medium', price: 170 }, { label: 'Large', price: 270 }] },
  { name: 'Best Pataka', sizes: [{ label: 'Regular', price: 120 }, { label: 'Medium', price: 180 }, { label: 'Large', price: 280 }] },
  { name: 'Chatpata Paneer', sizes: [{ label: 'Regular', price: 110 }, { label: 'Medium', price: 170 }, { label: 'Large', price: 270 }] },
];

const chineseItems: SizedItem[] = [
  { name: 'Veg Chowmein', sizes: [{ label: 'Half', price: 50 }, { label: 'Full', price: 100 }] },
  { name: 'Paneer Chowmein', sizes: [{ label: 'Half', price: 60 }, { label: 'Full', price: 120 }] },
  { name: 'Mix Chowmein', sizes: [{ label: 'Half', price: 60 }, { label: 'Full', price: 110 }] },
  { name: 'Paneer Chilli', sizes: [{ label: 'Half', price: 80 }, { label: 'Full', price: 150 }] },
  { name: 'Paneer Chilli Gravy', sizes: [{ label: 'Half', price: 80 }, { label: 'Full', price: 150 }] },
  { name: 'Chilli Potato', sizes: [{ label: 'Half', price: 60 }, { label: 'Full', price: 110 }] },
  { name: 'Veg Manchurian Dry', sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 130 }] },
  { name: 'Veg Manchurian Gravy', sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 130 }] },
];

const riceItems: SizedItem[] = [
  { name: 'Veg Fried Rice', sizes: [{ label: 'Half', price: 50 }, { label: 'Full', price: 100 }] },
  { name: 'Paneer Fried Rice', sizes: [{ label: 'Half', price: 60 }, { label: 'Full', price: 120 }] },
  { name: 'Veg Biryani', sizes: [{ label: 'Half', price: 70 }, { label: 'Full', price: 130 }] },
];

const burgerItems: FixedItem[] = [
  { name: 'Veg Burger', price: 40 },
  { name: 'Classic Burger', price: 60 },
  { name: 'Veg Cheese Burger', price: 60 },
  { name: 'Classic Cheese Burger', price: 80 },
];

const snackItems: FixedItem[] = [
  { name: 'French Fries', price: 60 },
  { name: 'Lava Cake', price: 80 },
  { name: 'Extra Cheese', price: 20, note: 'Add-on' },
  { name: 'Extra Toppings', price: 20, note: 'Add-on' },
];

// ─── Sized Item Card ──────────────────────────────────────────────────────────

function SizedItemCard({ item, category }: { item: SizedItem; category: string }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const size = item.sizes[selectedSize];
    addToCart({
      id: `${category}-${item.name}-${size.label}`,
      name: item.name,
      size: size.label,
      price: size.price,
      category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pizza-card p-4 flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {item.sizes.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(i)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                selectedSize === i
                  ? 'text-white border-transparent'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
              }`}
              style={selectedSize === i ? { backgroundColor: '#B71C1C', borderColor: '#B71C1C' } : {}}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-lg" style={{ color: '#B71C1C' }}>
          ₹{item.sizes[selectedSize].price}
        </span>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all ${
            added ? 'opacity-80' : 'hover:opacity-90 active:scale-95'
          }`}
          style={{ backgroundColor: added ? '#4CAF50' : '#B71C1C' }}
        >
          {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          {added ? 'Added!' : 'Add'}
        </button>
      </div>
    </div>
  );
}

// ─── Fixed Item Card ──────────────────────────────────────────────────────────

function FixedItemCard({ item, category }: { item: FixedItem; category: string }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!item.price) return;
    addToCart({
      id: `${category}-${item.name}`,
      name: item.name,
      size: item.note || 'Regular',
      price: item.price,
      category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pizza-card p-4 flex items-center justify-between gap-3">
      <div>
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
        {item.note && (
          <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block" style={{ backgroundColor: '#FFEBEE', color: '#B71C1C' }}>
            {item.note}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {item.price ? (
          <span className="font-bold text-base" style={{ color: '#B71C1C' }}>₹{item.price}</span>
        ) : (
          <span className="text-gray-400 text-sm">Ask price</span>
        )}
        {item.price && (
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all ${
              added ? 'opacity-80' : 'hover:opacity-90 active:scale-95'
            }`}
            style={{ backgroundColor: added ? '#4CAF50' : '#B71C1C' }}
          >
            {added ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {added ? 'Added!' : 'Add'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="text-3xl">{emoji}</div>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
          {title}
        </h2>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
      <div className="flex-1 h-px ml-2" style={{ backgroundColor: '#FFCDD2' }} />
    </div>
  );
}

// ─── Main Menu Page ───────────────────────────────────────────────────────────

export default function MenuPage() {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Page Header */}
      <div className="red-gradient-bg py-10 px-4 sm:px-6 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Our Menu
        </h1>
        <p style={{ color: '#FFCDD2' }} className="text-base">
          Fresh, delicious food made with love — Sonauli Road Pipiganj, Gorakhpur
        </p>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-40">
          <Link
            to="/order"
            className="flex items-center gap-2 text-white font-semibold px-5 py-3 rounded-full shadow-pizza-lg transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#B71C1C' }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>View Cart ({totalItems})</span>
          </Link>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Pizza Section */}
        <section>
          <SectionHeader emoji="🍕" title="Pizza" subtitle="Choose your size: Regular / Medium / Large" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pizzaItems.map((item, i) => (
              <SizedItemCard key={i} item={item} category="Pizza" />
            ))}
          </div>
        </section>

        {/* Chinese Section */}
        <section>
          <SectionHeader emoji="🍜" title="Chinese" subtitle="Choose your portion: Half / Full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chineseItems.map((item, i) => (
              <SizedItemCard key={i} item={item} category="Chinese" />
            ))}
          </div>
        </section>

        {/* Rice Section */}
        <section>
          <SectionHeader emoji="🍚" title="Rice" subtitle="Choose your portion: Half / Full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {riceItems.map((item, i) => (
              <SizedItemCard key={i} item={item} category="Rice" />
            ))}
          </div>
        </section>

        {/* Burger Section */}
        <section>
          <SectionHeader emoji="🍔" title="Burger" subtitle="Freshly made veg & classic burgers" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {burgerItems.map((item, i) => (
              <FixedItemCard key={i} item={item} category="Burger" />
            ))}
          </div>
        </section>

        {/* Snacks Section */}
        <section>
          <SectionHeader emoji="🍟" title="Snacks & Extras" subtitle="Perfect sides and add-ons" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {snackItems.map((item, i) => (
              <FixedItemCard key={i} item={item} category="Snacks" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
