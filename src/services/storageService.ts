import {
  BRAND_INFO,
  INITIAL_CUSTOM_ORDERS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
} from '../data/seedData';
import { CartItem, CustomOrder, Order, Product } from '../types/store';

const STORAGE_KEYS = {
  PRODUCTS: 'dulce_encanto_products_v1',
  CART: 'dulce_encanto_cart_v1',
  ORDERS: 'dulce_encanto_orders_v1',
  CUSTOM_ORDERS: 'dulce_encanto_custom_orders_v1',
};

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export const storageService = {
  getProducts(): Product[] {
    const stored = safeRead<Product[] | null>(STORAGE_KEYS.PRODUCTS, null);
    if (!stored || stored.length === 0) {
      safeWrite(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    return stored;
  },

  saveProducts(products: Product[]): void {
    safeWrite(STORAGE_KEYS.PRODUCTS, products);
  },

  getCart(): CartItem[] {
    return safeRead<CartItem[]>(STORAGE_KEYS.CART, []);
  },

  saveCart(cart: CartItem[]): void {
    safeWrite(STORAGE_KEYS.CART, cart);
  },

  getOrders(): Order[] {
    const stored = safeRead<Order[] | null>(STORAGE_KEYS.ORDERS, null);
    if (!stored) {
      safeWrite(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return stored;
  },

  saveOrders(orders: Order[]): void {
    safeWrite(STORAGE_KEYS.ORDERS, orders);
  },

  getCustomOrders(): CustomOrder[] {
    const stored = safeRead<CustomOrder[] | null>(STORAGE_KEYS.CUSTOM_ORDERS, null);
    if (!stored) {
      safeWrite(STORAGE_KEYS.CUSTOM_ORDERS, INITIAL_CUSTOM_ORDERS);
      return INITIAL_CUSTOM_ORDERS;
    }
    return stored;
  },

  saveCustomOrders(customOrders: CustomOrder[]): void {
    safeWrite(STORAGE_KEYS.CUSTOM_ORDERS, customOrders);
  },

  resetDemoData(): {
    products: Product[];
    orders: Order[];
    customOrders: CustomOrder[];
  } {
    safeWrite(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    safeWrite(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    safeWrite(STORAGE_KEYS.CUSTOM_ORDERS, INITIAL_CUSTOM_ORDERS);
    return {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      customOrders: INITIAL_CUSTOM_ORDERS,
    };
  },
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return isoDate;
  }
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BRAND_INFO.whatsappNumber}?text=${encoded}`;
}
