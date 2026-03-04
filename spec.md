# Specification

## Summary
**Goal:** Build a complete 3-page food delivery website for "Samay Pizza," replacing all existing content with a deep red and white themed restaurant site.

**Planned changes:**
- Remove all existing Funded Flex branding, routes, components, and pages
- Create a **Home page** with a hero section ("Welcome to Samay Pizza"), fast delivery feature icons, an "Order Now" button linking to the Menu page, and a footer with address (Sonauli Road Pipiganj, Gorakhpur, U.P.), WhatsApp (+918957401994), email (monikakgupta2507@gmail.com), and website (samaypizza.com)
- Create a **Menu page** with 5 categorized sections (Pizza with Regular/Medium/Large pricing, Chinese with Half/Full pricing, Rice with Half/Full pricing, Burgers with fixed pricing, Snacks/Extras), each item having an "Add to Cart" button with size/variant selection where applicable
- Create an **Order/Checkout page** with a cart summary (items, quantities, sizes, totals), a customer form (Name, Phone, Address), a "Place Order" button that opens WhatsApp (wa.me/918957401994) with a pre-filled order message, and a UPI payment section displaying UPI ID monikabhojwal2507@okhdfcbank with a QR code
- Add a backend canister with methods to submit and persist orders (customer name, phone, address, order summary, total) and an admin query to retrieve all orders
- Apply deep red (#B71C1C / #C0392B) and white theme consistently across all pages with hover effects, red buttons with white text, and food-appropriate iconography
- Add navigation between all three pages

**User-visible outcome:** Users can browse the Samay Pizza menu, add items to a cart, fill in their delivery details, and place an order via WhatsApp or pay via UPI QR code — all within a fully responsive, branded deep red and white restaurant website.
