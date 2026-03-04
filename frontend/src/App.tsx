import { createRouter, RouterProvider, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAFA', color: '#1a1a1a' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage });
const menuRoute = createRoute({ getParentRoute: () => rootRoute, path: '/menu', component: MenuPage });
const orderRoute = createRoute({ getParentRoute: () => rootRoute, path: '/order', component: OrderPage });

const routeTree = rootRoute.addChildren([homeRoute, menuRoute, orderRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  );
}
