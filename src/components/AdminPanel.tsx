import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Edit3,
  Plus,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import { GALLERY_PRESETS, PRODUCT_CATEGORIES } from '../data/seedData';
import { formatPrice, formatShortDate } from '../services/storageService';
import {
  CustomOrder,
  CustomOrderStatus,
  Order,
  OrderStatus,
  Product,
  ProductCategory,
} from '../types/store';
import { SafeImage } from './SafeImage';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  customOrders: CustomOrder[];
  onBackToStore: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onUpdateCustomOrderStatus: (customOrderId: string, status: CustomOrderStatus) => void;
  onResetDemoData: () => void;
}

type AdminTab = 'productos' | 'pedidos' | 'personalizados';

const ORDER_STATUSES: OrderStatus[] = [
  'Pendiente',
  'En preparación',
  'Listo para entrega',
  'Entregado',
  'Cancelado',
];

const CUSTOM_STATUSES: CustomOrderStatus[] = [
  'Nuevo',
  'Cotizado',
  'Confirmado',
  'Completado',
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  orders,
  customOrders,
  onBackToStore,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateCustomOrderStatus,
  onResetDemoData,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('productos');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Fresas con Chocolate');
  const [price, setPrice] = useState('');
  const [portionInfo, setPortionInfo] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(GALLERY_PRESETS[0].url);
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openNewProductForm = () => {
    setEditingProduct(null);
    setName('');
    setCategory('Fresas con Chocolate');
    setPrice('');
    setPortionInfo('Caja x 6 unidades');
    setDescription('');
    setDetails('');
    setImage(GALLERY_PRESETS[0].url);
    setFeatured(false);
    setAvailable(true);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditProductForm = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setPortionInfo(product.portionInfo);
    setDescription(product.description);
    setDetails(product.details);
    setImage(product.image);
    setFeatured(product.featured);
    setAvailable(product.available);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * 2) {
      setFormErrors((prev) => ({
        ...prev,
        image: 'La imagen debe pesar menos de 2 MB.',
      }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
        setFormErrors((prev) => {
          const copy = { ...prev };
          delete copy.image;
          return copy;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    const numericPrice = Number(price);

    if (name.trim().length < 3) {
      nextErrors.name = 'Ingresa un nombre válido (mínimo 3 caracteres).';
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      nextErrors.price = 'Ingresa un precio mayor a 0.';
    }
    if (description.trim().length < 10) {
      nextErrors.description = 'Escribe una descripción de al menos 10 caracteres.';
    }
    if (!image.trim()) {
      nextErrors.image = 'Selecciona o sube una fotografía para el postre.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    const payload = {
      name: name.trim(),
      category,
      price: Math.round(numericPrice),
      portionInfo: portionInfo.trim() || 'Presentación estándar',
      description: description.trim(),
      details:
        details.trim() ||
        'Elaborado artesanalmente con ingredientes frescos y empaque de regalo.',
      image: image.trim(),
      featured,
      available,
    };

    if (editingProduct) {
      onUpdateProduct({ ...payload, id: editingProduct.id });
    } else {
      onAddProduct(payload);
    }

    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'Pendiente' || o.status === 'En preparación'
  ).length;
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelado')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <section className="min-h-[82vh] bg-[#FAF5F0] py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#EADFD6]">
          <div>
            <button
              type="button"
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B84A66] hover:text-[#9E3B55] mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la tienda</span>
            </button>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D1F22]">
              Panel Administrativo · Dulce Encanto
            </h1>
            <p className="text-sm text-[#6D5A5E] mt-1">
              Administra tus postres, actualiza precios o fotografías y consulta los pedidos recibidos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onResetDemoData}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFFDFB] hover:bg-[#FCEEF1] text-[#6D5A5E] hover:text-[#2D1F22] border border-[#EADFD6] text-xs font-medium transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer ejemplos</span>
            </button>

            <button
              type="button"
              onClick={openNewProductForm}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar nuevo postre</span>
            </button>
          </div>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          <div className="rounded-2xl bg-[#FFFDFB] border border-[#EADFD6] p-5">
            <p className="text-xs text-[#6D5A5E]">Productos activos</p>
            <p className="font-display text-3xl font-semibold text-[#2D1F22] mt-1 tabular-nums">
              {products.filter((p) => p.available).length} / {products.length}
            </p>
          </div>
          <div className="rounded-2xl bg-[#FFFDFB] border border-[#EADFD6] p-5">
            <p className="text-xs text-[#6D5A5E]">Pedidos por atender</p>
            <p className="font-display text-3xl font-semibold text-[#B84A66] mt-1 tabular-nums">
              {pendingOrdersCount}
            </p>
          </div>
          <div className="rounded-2xl bg-[#FFFDFB] border border-[#EADFD6] p-5">
            <p className="text-xs text-[#6D5A5E]">Pedidos personalizados</p>
            <p className="font-display text-3xl font-semibold text-[#2D1F22] mt-1 tabular-nums">
              {customOrders.length}
            </p>
          </div>
          <div className="rounded-2xl bg-[#FFFDFB] border border-[#EADFD6] p-5">
            <p className="text-xs text-[#6D5A5E]">Ventas registradas</p>
            <p className="font-display text-3xl font-semibold text-[#2D1F22] mt-1 tabular-nums">
              {formatPrice(totalRevenue)}
            </p>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'productos'}
            onClick={() => setActiveTab('productos')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'productos'
                ? 'bg-[#2D1F22] text-white'
                : 'bg-[#FFFDFB] text-[#6D5A5E] border border-[#EADFD6] hover:text-[#2D1F22]'
            }`}
          >
            Catálogo de Productos ({products.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'pedidos'}
            onClick={() => setActiveTab('pedidos')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'pedidos'
                ? 'bg-[#2D1F22] text-white'
                : 'bg-[#FFFDFB] text-[#6D5A5E] border border-[#EADFD6] hover:text-[#2D1F22]'
            }`}
          >
            Pedidos de Tienda ({orders.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'personalizados'}
            onClick={() => setActiveTab('personalizados')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'personalizados'
                ? 'bg-[#2D1F22] text-white'
                : 'bg-[#FFFDFB] text-[#6D5A5E] border border-[#EADFD6] hover:text-[#2D1F22]'
            }`}
          >
            Pedidos Personalizados ({customOrders.length})
          </button>
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === 'productos' && (
          <div className="bg-[#FFFDFB] rounded-3xl border border-[#EADFD6] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EADFD6] text-xs font-semibold text-[#6D5A5E] bg-[#FAF5F0]/60">
                    <th className="py-3.5 px-5">Postre</th>
                    <th className="py-3.5 px-4">Categoría</th>
                    <th className="py-3.5 px-4">Precio</th>
                    <th className="py-3.5 px-4">Estado</th>
                    <th className="py-3.5 px-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EADFD6] text-sm">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAF5F0]/40 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-12 rounded-xl overflow-hidden bg-[#FAF5F0] border border-[#EADFD6] shrink-0">
                            <SafeImage
                              src={product.image}
                              alt={product.name}
                              fallbackTitle={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-[#2D1F22]">{product.name}</p>
                            <p className="text-xs text-[#6D5A5E]">
                              {product.portionInfo}
                              {product.featured ? ' · Destacado en inicio' : ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#6D5A5E] whitespace-nowrap">
                        {product.category}
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#2D1F22] tabular-nums whitespace-nowrap">
                        {formatPrice(product.price)}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold ${
                            product.available ? 'text-[#2D1F22]' : 'text-[#9E3B55]'
                          }`}
                        >
                          {product.available ? 'Disponible' : 'Agotado'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditProductForm(product)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#EADFD6] bg-[#FAF5F0] hover:bg-[#FCEEF1] text-xs font-medium text-[#2D1F22] transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>

                          {confirmDeleteId === product.id ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  onDeleteProduct(product.id);
                                  setConfirmDeleteId(null);
                                }}
                                className="px-3 py-1.5 rounded-full bg-[#9E3B55] text-white text-xs font-semibold"
                              >
                                Confirmar
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2.5 py-1.5 rounded-full border border-[#EADFD6] text-xs text-[#6D5A5E]"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(product.id)}
                              aria-label={`Eliminar ${product.name}`}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#EADFD6] text-[#6D5A5E] hover:text-[#9E3B55] hover:bg-[#FCEEF1] transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Store Orders */}
        {activeTab === 'pedidos' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-3xl bg-[#FFFDFB] border border-[#EADFD6] p-12 text-center">
                <p className="font-display text-2xl font-semibold text-[#2D1F22] mb-1">
                  Aún no hay pedidos en la tienda
                </p>
                <p className="text-sm text-[#6D5A5E]">
                  Cuando los clientes confirmen una compra desde el carrito aparecerá aquí.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-3xl bg-[#FFFDFB] border border-[#EADFD6] p-5 sm:p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EADFD6]">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#6D5A5E] mb-1">
                        <span className="font-semibold text-[#B84A66]">Pedido #{order.id}</span>
                        <span aria-hidden="true">·</span>
                        <span>{formatShortDate(order.createdAt)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{order.paymentMethod}</span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#2D1F22]">
                        {order.customerName}
                      </h3>
                      <p className="text-xs text-[#6D5A5E]">
                        Tel: {order.customerPhone} · {order.deliveryAddress}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right mr-2">
                        <p className="text-xs text-[#6D5A5E]">Total</p>
                        <p className="text-lg font-semibold text-[#2D1F22] tabular-nums">
                          {formatPrice(order.total)}
                        </p>
                      </div>

                      <select
                        aria-label={`Estado del pedido ${order.id}`}
                        value={order.status}
                        onChange={(e) =>
                          onUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="px-3.5 py-2 rounded-full bg-[#FAF5F0] border border-[#EADFD6] text-xs font-semibold text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-[#6D5A5E] mb-2">Productos</p>
                      <ul className="space-y-1.5">
                        {order.items.map((item, idx) => (
                          <li key={`${order.id}-${idx}`} className="flex justify-between text-[#2D1F22]">
                            <span>
                              <strong className="tabular-nums">{item.quantity}x</strong> {item.name}
                            </span>
                            <span className="tabular-nums text-[#6D5A5E]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#6D5A5E] mb-1">Notas / Dedicatoria</p>
                      <p className="text-sm text-[#2D1F22] bg-[#FAF5F0] rounded-2xl p-3 border border-[#EADFD6]">
                        {order.notes || 'Sin instrucciones adicionales.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Custom Orders */}
        {activeTab === 'personalizados' && (
          <div className="space-y-4">
            {customOrders.length === 0 ? (
              <div className="rounded-3xl bg-[#FFFDFB] border border-[#EADFD6] p-12 text-center">
                <p className="font-display text-2xl font-semibold text-[#2D1F22] mb-1">
                  Sin solicitudes personalizadas todavía
                </p>
                <p className="text-sm text-[#6D5A5E]">
                  Los pedidos enviados desde el formulario de Pedidos Personalizados aparecerán aquí.
                </p>
              </div>
            ) : (
              customOrders.map((req) => (
                <div
                  key={req.id}
                  className="rounded-3xl bg-[#FFFDFB] border border-[#EADFD6] p-5 sm:p-6 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EADFD6]">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#6D5A5E] mb-1">
                        <span className="font-semibold text-[#B84A66]">Solicitud #{req.id}</span>
                        <span aria-hidden="true">·</span>
                        <span>Entrega deseada: {req.deliveryDate}</span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#2D1F22]">
                        {req.customerName}
                      </h3>
                      <p className="text-xs text-[#6D5A5E]">
                        WhatsApp / Tel: {req.customerPhone} · {req.portionsOrSize}
                      </p>
                    </div>

                    <select
                      aria-label={`Estado de la solicitud ${req.id}`}
                      value={req.status}
                      onChange={(e) =>
                        onUpdateCustomOrderStatus(req.id, e.target.value as CustomOrderStatus)
                      }
                      className="px-3.5 py-2 rounded-full bg-[#FAF5F0] border border-[#EADFD6] text-xs font-semibold text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66] self-start sm:self-auto"
                    >
                      {CUSTOM_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-[#6D5A5E]">
                        Productos seleccionados
                      </p>
                      <p className="text-[#2D1F22] font-medium">
                        {req.selectedProducts.join(' · ')}
                      </p>
                      <p className="text-xs text-[#6D5A5E] pt-1">
                        Paleta / Temática: <strong className="text-[#2D1F22]">{req.themeColors}</strong>
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#6D5A5E] mb-1">
                        Instrucciones especiales
                      </p>
                      <p className="text-sm text-[#2D1F22] bg-[#FAF5F0] rounded-2xl p-3 border border-[#EADFD6]">
                        {req.specialInstructions}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D1F22]/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-product-modal-title"
          onClick={() => setIsFormOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FFFDFB] rounded-3xl border border-[#EADFD6] p-6 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#EADFD6]">
              <h2
                id="admin-product-modal-title"
                className="font-display text-3xl font-semibold text-[#2D1F22]"
              >
                {editingProduct ? 'Editar producto' : 'Agregar nuevo postre'}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                aria-label="Cerrar formulario"
                className="w-9 h-9 rounded-full border border-[#EADFD6] inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FAF5F0]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prod-name" className="block text-xs font-semibold text-[#2D1F22] mb-1">
                    Nombre del postre *
                  </label>
                  <input
                    id="prod-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Fresas con Chocolate Blanco"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-[#9E3B55] mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="prod-cat" className="block text-xs font-semibold text-[#2D1F22] mb-1">
                    Categoría *
                  </label>
                  <select
                    id="prod-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prod-price" className="block text-xs font-semibold text-[#2D1F22] mb-1">
                    Precio (COP) *
                  </label>
                  <input
                    id="prod-price"
                    type="number"
                    min={1000}
                    step={500}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ej. 38000"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                  />
                  {formErrors.price && (
                    <p className="text-xs text-[#9E3B55] mt-1">{formErrors.price}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="prod-portion" className="block text-xs font-semibold text-[#2D1F22] mb-1">
                    Presentación / Porciones
                  </label>
                  <input
                    id="prod-portion"
                    type="text"
                    value={portionInfo}
                    onChange={(e) => setPortionInfo(e.target.value)}
                    placeholder="Ej. Caja x 8 unidades"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="prod-desc" className="block text-xs font-semibold text-[#2D1F22] mb-1">
                  Descripción corta *
                </label>
                <textarea
                  id="prod-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe los ingredientes, coberturas y sabor del postre..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                />
                {formErrors.description && (
                  <p className="text-xs text-[#9E3B55] mt-1">{formErrors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="prod-details" className="block text-xs font-semibold text-[#2D1F22] mb-1">
                  Detalles adicionales (opcional)
                </label>
                <input
                  id="prod-details"
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Empaque, tarjeta de dedicatoria o notas de conservación..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                />
              </div>

              {/* Photo Selection & Upload */}
              <div className="space-y-2.5 pt-1">
                <label htmlFor="prod-img-url" className="block text-xs font-semibold text-[#2D1F22]">
                  Fotografía del producto *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {GALLERY_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                        image === preset.url
                          ? 'border-[#B84A66] ring-2 ring-[#FCEEF1]'
                          : 'border-[#EADFD6] opacity-80 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <SafeImage
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <input
                    id="prod-img-url"
                    type="text"
                    value={image.startsWith('data:') ? '' : image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="O pega una URL de imagen..."
                    className="w-full px-4 py-2 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-xs focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                  />

                  <label className="inline-flex items-center justify-center px-4 py-2 rounded-2xl border border-[#EADFD6] bg-[#FAF5F0] hover:bg-[#FCEEF1] text-xs font-medium text-[#2D1F22] cursor-pointer transition-colors">
                    <span>Subir foto desde tu dispositivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
                {formErrors.image && (
                  <p className="text-xs text-[#9E3B55]">{formErrors.image}</p>
                )}
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-[#2D1F22] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="w-4 h-4 accent-[#B84A66]"
                  />
                  <span>Disponible en catálogo</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-[#2D1F22] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#B84A66]"
                  />
                  <span>Mostrar en productos destacados</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EADFD6]">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#EADFD6] text-sm font-medium text-[#6D5A5E] hover:text-[#2D1F22]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProduct ? 'Guardar cambios' : 'Publicar postre'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
