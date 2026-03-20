import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/usePlaceOrder";

interface FormData {
  name: string;
  phone: string;
  address: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^[6-9]\d{9}$/.test(data.phone.trim()))
    errors.phone = "Enter a valid 10-digit mobile number";
  if (!data.address.trim()) errors.address = "Delivery address is required";
  return errors;
}

export default function OrderPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();
  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      "🍕 *New Order from Samay Pizza Website*",
      "",
      "*Customer Details:*",
      `👤 Name: ${form.name}`,
      `📞 Phone: ${form.phone}`,
      `📍 Address: ${form.address}`,
      "",
      "*Order Items:*",
      ...items.map(
        (item) =>
          `• ${item.name} (${item.size}) x${item.quantity} = ₹${item.price * item.quantity}`,
      ),
      "",
      `💰 *Total Amount: ₹${totalPrice}*`,
      "",
      "Please confirm the order. Thank you! 🙏",
    ];
    return lines.join("\n");
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty. Please add items first.");
      return;
    }

    const orderItemsText = items
      .map(
        (item) =>
          `${item.name} (${item.size}) x${item.quantity} = ₹${item.price * item.quantity}`,
      )
      .join(", ");

    // Save order to backend
    try {
      await placeOrder({
        customerName: form.name,
        phoneNumber: form.phone,
        address: form.address,
        orderItems: orderItemsText,
        totalPrice: `₹${totalPrice}`,
      });
    } catch {
      // Non-blocking — still open WhatsApp
    }

    // Open WhatsApp
    const message = buildWhatsAppMessage();
    window.open(
      `https://wa.me/918753671877?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    setOrderPlaced(true);
    clearCart();
    toast.success("Order sent via WhatsApp! 🎉");
  };

  if (orderPlaced) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <div className="text-center max-w-md">
          <CheckCircle
            className="w-20 h-20 mx-auto mb-4"
            style={{ color: "#4CAF50" }}
          />
          <h2
            className="text-2xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Order Sent! 🎉
          </h2>
          <p className="text-gray-500 mb-6">
            Your order has been sent via WhatsApp. We'll confirm it shortly. We
            look forward to serving you!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            style={{ backgroundColor: "#B71C1C" }}
          >
            Order More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Header */}
      <div className="red-gradient-bg py-10 px-4 sm:px-6 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Your Order
        </h1>
        <p style={{ color: "#FFCDD2" }} className="text-base">
          Review your cart and place your order
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Add some delicious items from our menu!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              style={{ backgroundColor: "#B71C1C" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Cart + Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Cart Summary */}
              <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <ShoppingCart
                      className="w-5 h-5"
                      style={{ color: "#B71C1C" }}
                    />
                    Cart Summary
                  </h2>
                  <Link
                    to="/menu"
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#B71C1C" }}
                  >
                    + Add More
                  </Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="px-5 py-3.5 flex items-center gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.size} · {item.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-300 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-500" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-300 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <span
                        className="font-semibold text-sm w-16 text-right"
                        style={{ color: "#B71C1C" }}
                      >
                        ₹{item.price * item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  className="px-5 py-4 border-t flex items-center justify-between"
                  style={{ backgroundColor: "#FFF8F0" }}
                >
                  <span className="font-bold text-gray-800">Total</span>
                  <span
                    className="font-bold text-xl"
                    style={{ color: "#B71C1C" }}
                  >
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              {/* Customer Form */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 text-lg mb-4">
                  Delivery Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name <span style={{ color: "#B71C1C" }}>*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: "#B71C1C" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number <span style={{ color: "#B71C1C" }}>*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                        errors.phone ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs mt-1" style={{ color: "#B71C1C" }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Delivery Address{" "}
                      <span style={{ color: "#B71C1C" }}>*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House no., Street, Area, Gorakhpur"
                      rows={3}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all resize-none ${
                        errors.address ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs mt-1" style={{ color: "#B71C1C" }}>
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Place Order */}
            <div className="lg:col-span-2 space-y-5">
              {/* Place Order */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 text-lg mb-4">
                  Place Order
                </h2>
                <div
                  className="rounded-xl p-4 mb-4 text-sm"
                  style={{
                    backgroundColor: "#FFF8F0",
                    border: "1px solid #FFCDD2",
                  }}
                >
                  <p className="text-gray-600">
                    Clicking <strong>"Place Order via WhatsApp"</strong> will
                    open WhatsApp with your complete order details pre-filled.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-xl transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
                  style={{ backgroundColor: "#25D366" }}
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <SiWhatsapp className="w-5 h-5" />
                  )}
                  {isPending ? "Placing Order..." : "Place Order via WhatsApp"}
                </button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Order will be sent to +91 87536 71877
                </p>
              </div>

              {/* Order Total Summary */}
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "#B71C1C" }}
              >
                <div className="flex items-center justify-between text-white">
                  <span className="font-medium">Total Payable</span>
                  <span className="font-bold text-2xl">₹{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
