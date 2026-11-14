import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { CustomOrderSection } from './components/CustomOrderSection';
import { FeaturedAndAbout } from './components/FeaturedAndAbout';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { BRAND_INFO } from './data/seedData';
import { storageService } from './services/storageService';
import {
  ActiveView,
  CartItem,
  CustomOrder,
  CustomOrderStatus,
  Order,
  OrderStatus,
  Product,
  ToastMessage,
} from './types/store';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('store');
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [cart, setCart] = useState<CartItem[]>(() => storageService.getCart());
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(() =>
    storageService.getCustomOrders()
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    storageService.saveProducts(products);
  }, [products]);

  useEffect(() => {
    storageService.saveCart(cart);
  }, [cart]);

  useEffect(() => {
    storageService.saveOrders(orders);
  }, [orders]);

  useEffect(() => {
    storageService.saveCustomOrders(customOrders);
  }, [customOrders]);

  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const featuredProducts = useMemo(() => {
    const featured = products.filter((p) => p.featured && p.available);
    return featured.length > 0 ? featured : products.filter((p) => p.available).slice(0, 3);
  }, [products]);

  const scrollToSection = (sectionId: string) => {
    if (activeView !== 'store') {
      setActiveView('store');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSwitchView = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    if (!product.available) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, product, quantity: Math.min(20, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(
      'Agregado al carrito',
      `${quantity} × ${product.name}`
    );
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(20, quantity) }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Producto eliminado del carrito', undefined, 'info');
  };

  const handleConfirmOrder = (payload: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'Transferencia' | 'Contraentrega';
    notes: string;
  }): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryFee =
      subtotal >= BRAND_INFO.freeShippingThreshold ? 0 : BRAND_INFO.standardShippingFee;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `DE-${Math.floor(1050 + Math.random() * 8900)}`,
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      deliveryAddress: payload.deliveryAddress,
      paymentMethod: payload.paymentMethod,
      notes: payload.notes,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal,
      deliveryFee,
      total,
      status: 'Pendiente',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    showToast(`Pedido ${newOrder.id} confirmado`, 'Lo puedes consultar en el Panel Admin.');
    return newOrder;
  };

  const handleCreateCustomOrder = (payload: {
    customerName: string;
    customerPhone: string;
    deliveryDate: string;
    selectedProducts: string[];
    themeColors: string;
    portionsOrSize: string;
    specialInstructions: string;
  }): CustomOrder => {
    const newCustomOrder: CustomOrder = {
      id: `PERS-${Math.floor(210 + Math.random() * 780)}`,
      ...payload,
      status: 'Nuevo',
      createdAt: new Date().toISOString(),
    };

    setCustomOrders((prev) => [newCustomOrder, ...prev]);
    showToast(
      'Solicitud personalizada enviada',
      `Referencia ${newCustomOrder.id} registrada correctamente.`
    );
    return newCustomOrder;
  };

  // Admin Handlers
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Nuevo postre publicado', newProduct.name);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === updated.id ? { ...item, product: updated } : item
      )
    );
    showToast('Producto actualizado', updated.name);
  };

  const handleDeleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Producto eliminado', target?.name, 'info');
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    showToast('Estado del pedido actualizado', `${orderId} → ${status}`);
  };

  const handleUpdateCustomOrderStatus = (customOrderId: string, status: CustomOrderStatus) => {
    setCustomOrders((prev) =>
      prev.map((c) => (c.id === customOrderId ? { ...c, status } : c))
    );
    showToast('Solicitud actualizada', `${customOrderId} → ${status}`);
  };

  const handleResetDemoData = () => {
    const reset = storageService.resetDemoData();
    setProducts(reset.products);
    setOrders(reset.orders);
    setCustomOrders(reset.customOrders);
    showToast('Datos de ejemplo restablecidos', undefined, 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-[#2D1F22]">
      <Navbar
        activeView={activeView}
        cartCount={cartCount}
        onNavigateSection={scrollToSection}
        onSwitchView={handleSwitchView}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {activeView === 'store' ? (
          <>
            <HeroSection
              onExploreCatalog={() => scrollToSection('catalogo')}
              onGoCustomOrder={() => scrollToSection('personalizados')}
            />
            <FeaturedAndAbout
              featuredProducts={featuredProducts}
              onExploreCatalog={() => scrollToSection('catalogo')}
              onQuickAdd={(product) => handleAddToCart(product, 1)}
              onSelectProduct={() => scrollToSection('catalogo')}
            />
            <CatalogSection products={products} onAddToCart={handleAddToCart} />
            <CustomOrderSection
              products={products}
              onCreateCustomOrder={handleCreateCustomOrder}
            />
            <ContactSection
              onNotifyCopy={(label) => showToast(label, undefined, 'info')}
            />
          </>
        ) : (
          <AdminPanel
            products={products}
            orders={orders}
            customOrders={customOrders}
            onBackToStore={() => handleSwitchView('store')}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateCustomOrderStatus={handleUpdateCustomOrderStatus}
            onResetDemoData={handleResetDemoData}
          />
        )}
      </main>

      <Footer
        onNavigateSection={scrollToSection}
        onSwitchView={handleSwitchView}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onConfirmOrder={handleConfirmOrder}
        onGoToCatalog={() => scrollToSection('catalogo')}
      />

      {/* Toast Notifications */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-[#2D1F22] text-white shadow-lg border border-[#C49A52]/30"
          >
            {toast.type === 'info' ? (
              <Info className="w-5 h-5 text-[#E8D8B9] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#F4D5DD] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-[#FAF5F0]/80 mt-0.5 truncate">
                  {toast.description}
                </p>
              )}
              {toast.title === 'Agregado al carrito' && (
                <button
                  type="button"
                  onClick={() => {
                    dismissToast(toast.id);
                    setIsCartOpen(true);
                  }}
                  className="text-xs font-semibold text-[#F4D5DD] hover:underline mt-1"
                >
                  Ver carrito
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Cerrar notificación"
              className="text-[#FAF5F0]/60 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
