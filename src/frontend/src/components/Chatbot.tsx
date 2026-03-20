import { ChevronDown, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  from: "bot" | "user";
  text: string;
}

const KB = {
  pizza: [
    { name: "Cheese Corn", regular: 90, medium: 150, large: 250 },
    { name: "Spicy Indian", regular: 100, medium: 150, large: 250 },
    { name: "Simply Veg", regular: 90, medium: 140, large: 230 },
    { name: "Paneer Ka Maza", regular: 100, medium: 160, large: 260 },
    { name: "Double Cheese", regular: 110, medium: 170, large: 270 },
    { name: "Paneer Makhani", regular: 110, medium: 170, large: 270 },
    { name: "Sabz Bahar", regular: 100, medium: 155, large: 255 },
    { name: "Samay Pizza Special", regular: 150, medium: 180, large: 300 },
    { name: "Tandoori Paneer", regular: 120, medium: 180, large: 280 },
    { name: "Veggie Supreme", regular: 110, medium: 170, large: 270 },
    { name: "Best Pataka", regular: 120, medium: 180, large: 280 },
    { name: "Chatpata Paneer", regular: 110, medium: 170, large: 270 },
  ],
  chinese: [
    { name: "Veg Chowmein", half: 50, full: 100 },
    { name: "Paneer Chowmein", half: 60, full: 120 },
    { name: "Mix Chowmein", half: 60, full: 110 },
    { name: "Paneer Chilli", half: 80, full: 150 },
    { name: "Paneer Chilli Gravy", half: 80, full: 150 },
    { name: "Chilli Potato", half: 60, full: 110 },
    { name: "Veg Manchurian Dry", half: 70, full: 130 },
    { name: "Veg Manchurian Gravy", half: 70, full: 130 },
  ],
  rice: [
    { name: "Veg Fried Rice", half: 50, full: 100 },
    { name: "Paneer Fried Rice", half: 60, full: 120 },
    { name: "Veg Biryani", half: 70, full: 130 },
  ],
  burger: [
    { name: "Veg Burger", price: 40 },
    { name: "Classic Burger", price: 60 },
    { name: "Veg Cheese Burger", price: 60 },
    { name: "Classic Cheese Burger", price: 80 },
  ],
};

const QUICK_REPLIES = [
  "Show menu",
  "Pizza prices",
  "Chinese items",
  "How to order?",
  "Delivery info",
  "Contact",
];

function getReply(input: string): string {
  const q = input.toLowerCase().trim();

  if (/^(hi|hello|hey|hii|helo|namaste|namaskar)/.test(q)) {
    return "Namaste! \u{1F64F} Welcome to Samay Pizza, Pipiganj's Favourite Pizza Place! How can I help you today? You can ask me about our menu, prices, delivery, or how to place an order.";
  }

  if (/\bmenu\b|all items|kya hai|what.*have|what.*serve/.test(q)) {
    return "\u{1F355} Pizza \u2013 Regular (\u20B990\u2013\u20B9150), Medium (\u20B9140\u2013\u20B9180), Large (\u20B9230\u2013\u20B9300)\n\u{1F35C} Chinese \u2013 Chowmein, Manchurian, Chilli Paneer, Chilli Potato\n\u{1F35A} Rice \u2013 Fried Rice & Biryani (Half/Full)\n\u{1F354} Burger \u2013 Starting at \u20B940\n\u{1F35F} Snacks \u2013 Fries \u20B960, Lava Cake \u20B980\n\nAsk me about any specific category for full details!";
  }

  if (/pizza/.test(q)) {
    if (/price|cost|rate|kitna|how much|cheap|expensive/.test(q)) {
      const list = KB.pizza
        .map(
          (p) =>
            `\u2022 ${p.name}: R\u20B9${p.regular} | M\u20B9${p.medium} | L\u20B9${p.large}`,
        )
        .join("\n");
      return `\u{1F355} Pizza Prices (Regular | Medium | Large):\n${list}`;
    }
    if (/special|best|popular|recommend/.test(q)) {
      return "Our most popular pizzas are:\n\u2B50 Samay Pizza Special (R\u20B9150 | M\u20B9180 | L\u20B9300)\n\u2B50 Double Cheese (R\u20B9110 | M\u20B9170 | L\u20B9270)\n\u2B50 Paneer Ka Maza (R\u20B9100 | M\u20B9160 | L\u20B9260)\n\u2B50 Tandoori Paneer (R\u20B9120 | M\u20B9180 | L\u20B9280)";
    }
    if (/size|regular|medium|large/.test(q)) {
      return "We have 3 pizza sizes:\n\u{1F4CF} Regular \u2013 Perfect for 1 person\n\u{1F4CF} Medium \u2013 Great for 2 people\n\u{1F4CF} Large \u2013 Ideal for sharing (3\u20134 people)\n\nPrices start from \u20B990 (Regular) to \u20B9300 (Large Special).";
    }
    const list = KB.pizza
      .map(
        (p) =>
          `\u2022 ${p.name}: R\u20B9${p.regular} | M\u20B9${p.medium} | L\u20B9${p.large}`,
      )
      .join("\n");
    return `\u{1F355} Our Pizza Menu (Regular | Medium | Large):\n${list}\n\nAll pizzas are freshly made with premium ingredients!`;
  }

  if (/chinese|chowmein|manchurian|chilli|noodle/.test(q)) {
    const list = KB.chinese
      .map((c) => `\u2022 ${c.name}: Half\u20B9${c.half} | Full\u20B9${c.full}`)
      .join("\n");
    return `\u{1F35C} Chinese Menu (Half | Full):\n${list}`;
  }

  if (/rice|biryani|fried rice/.test(q)) {
    const list = KB.rice
      .map((r) => `\u2022 ${r.name}: Half\u20B9${r.half} | Full\u20B9${r.full}`)
      .join("\n");
    return `\u{1F35A} Rice Menu (Half | Full):\n${list}`;
  }

  if (/burger/.test(q)) {
    const list = KB.burger
      .map((b) => `\u2022 ${b.name}: \u20B9${b.price}`)
      .join("\n");
    return `\u{1F354} Burger Menu:\n${list}`;
  }

  if (/snack|fries|fry|lava|cake|extra/.test(q)) {
    return "\u{1F35F} Snacks & Extras:\n\u2022 French Fries: \u20B960\n\u2022 Lava Cake: \u20B980\n\u2022 Extra Cheese: \u20B920\n\u2022 Extra Toppings: \u20B920";
  }

  if (/cheap|budget|less|minimum|sabse kam|low price/.test(q)) {
    return "Our most affordable items:\n\u{1F4B0} Veg Burger \u2013 \u20B940\n\u{1F4B0} Veg Chowmein (Half) \u2013 \u20B950\n\u{1F4B0} Veg Fried Rice (Half) \u2013 \u20B950\n\u{1F4B0} French Fries \u2013 \u20B960\n\u{1F4B0} Cheese Corn Pizza (Regular) \u2013 \u20B990";
  }

  if (/order|how to|kaise|place.*order|buy|kharidna/.test(q)) {
    return "You can order in 3 easy ways:\n1\uFE0F\u20E3 Online \u2013 Go to our Menu page, add items to cart, and checkout\n2\uFE0F\u20E3 Call \u2013 Ring us at +91 87536 71877\n3\uFE0F\u20E3 WhatsApp \u2013 Message us at +91 87536 71877\n\nWe accept cash on delivery!";
  }

  if (/deliver|delivery|how long|kitna time|delivery.*area/.test(q)) {
    return "\u{1F69A} Delivery Info:\n\u2022 Area: Pipiganj, Gorakhpur & nearby areas\n\u2022 Time: 30 minutes or less\n\u2022 Hours: Daily 10:00 AM \u2013 10:00 PM\n\nFor delivery enquiries, call +91 87536 71877.";
  }

  if (/open|close|timing|hours|kab|schedule/.test(q)) {
    return "\u23F0 We are open Daily from 10:00 AM to 10:00 PM. Come visit us or order for delivery!";
  }

  if (/contact|phone|call|email|whatsapp|reach/.test(q)) {
    return "\u{1F4DE} Contact Samay Pizza:\n\u2022 Phone/WhatsApp: +91 87536 71877\n\u2022 Email: samaypizza@gmail.com\n\u2022 Address: Sonauli Road Pipiganj, Gorakhpur (U.P)\n\nWe're happy to take your order!";
  }

  if (/address|where|location|kahan|find|map/.test(q)) {
    return "\u{1F4CD} Find Us:\nSonauli Road Pipiganj, Gorakhpur, Uttar Pradesh\n\nOpen Daily: 10:00 AM \u2013 10:00 PM";
  }

  if (/pay|payment|cash|card/.test(q)) {
    return "\u{1F4B3} Payment Options:\n\u2022 Cash on Delivery\n\nFor any payment queries, call +91 87536 71877.";
  }

  if (/thank|thanks|shukriya|dhanyawad|great|nice/.test(q)) {
    return "You're welcome! \u{1F60A} We hope to serve you the best pizza in Pipiganj. Is there anything else I can help you with?";
  }

  if (/bye|goodbye|see you|alvida/.test(q)) {
    return "Goodbye! \u{1F44B} Come back anytime. Enjoy your meal from Samay Pizza! \u{1F355}";
  }

  if (/veg|vegetarian/.test(q)) {
    return "\u2705 All items on our menu are vegetarian! We use fresh, quality ingredients for every dish.";
  }

  return "I'm not sure about that, but I'd love to help! You can ask me about:\n\u2022 \u{1F355} Pizza, \u{1F35C} Chinese, \u{1F35A} Rice, \u{1F354} Burger, \u{1F35F} Snacks\n\u2022 Pricing, Delivery, Ordering, Contact\n\nOr call us directly at +91 87536 71877!";
}

let msgCounter = 0;
function newId() {
  msgCounter += 1;
  return String(msgCounter);
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: newId(),
      from: "bot",
      text: "Namaste! \u{1F64F} I'm Samay, your pizza assistant! Ask me about our menu, prices, delivery, or how to order. \u{1F355}",
    },
  ]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: newId(), from: "user", text: trimmed };
    const botReply: Message = {
      id: newId(),
      from: "bot",
      text: getReply(trimmed),
    };
    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
    if (!openRef.current) setUnread((n) => n + 1);
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#B71C1C" }}
        aria-label="Chat with us"
      >
        {open ? (
          <ChevronDown className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: "480px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
            border: "1px solid #F5C6C6",
            backgroundColor: "#fff",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ backgroundColor: "#B71C1C" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">
                🍕
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  Samay Pizza
                </p>
                <p className="text-red-200 text-xs">
                  Online \u00B7 Replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
            style={{ backgroundColor: "#FFFAF9" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed"
                  style={
                    msg.from === "user"
                      ? {
                          backgroundColor: "#B71C1C",
                          color: "#fff",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          backgroundColor: "#fff",
                          color: "#1a1a1a",
                          border: "1px solid #F5C6C6",
                          borderBottomLeftRadius: "4px",
                        }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div
            className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0"
            style={{ borderTop: "1px solid #FFE0E0", backgroundColor: "#fff" }}
          >
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr}
                type="button"
                onClick={() => sendMessage(qr)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border font-medium transition-all hover:bg-red-50"
                style={{ borderColor: "#B71C1C", color: "#B71C1C" }}
              >
                {qr}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
            style={{ borderTop: "1px solid #FFE0E0", backgroundColor: "#fff" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about menu, delivery..."
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: "#1a1a1a" }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-40"
              style={{ backgroundColor: "#B71C1C" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
