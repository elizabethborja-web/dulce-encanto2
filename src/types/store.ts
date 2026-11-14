export type ProductCategory =
  | 'Fresas con Chocolate'
  | 'Brownies'
  | 'Mini Tortas'
  | 'Vasos de Postre'
  | 'Detalles de Regalo';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  details: string;
  price: number;
  image: string;
  featured: boolean;
  available: boolean;
  portionInfo: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Pendiente'
  | 'En preparación'
  | 'Listo para entrega'
  | 'Entregado'
  | 'Cancelado';

export interface OrderItemSnapshot {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'Transferencia' | 'Contraentrega';
  notes: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type CustomOrderStatus =
  | 'Nuevo'
  | 'Cotizado'
  | 'Confirmado'
  | 'Completado';

export interface CustomOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryDate: string;
  selectedProducts: string[];
  themeColors: string;
  portionsOrSize: string;
  specialInstructions: string;
  status: CustomOrderStatus;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}

export type ActiveView = 'store' | 'admin';
