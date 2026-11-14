import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { BRAND_INFO } from '../data/seedData';
import { buildWhatsAppUrl, formatPrice } from '../services/storageService';
import { CartItem, Order } from '../types/store';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onConfirmOrder: (payload: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    paymentMethod: 'Transferencia' | 'Contraentrega';
    notes: string;
  }) => Order;
  onGoToCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
  onGoToCatalog,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Transferencia' | 'Contraentrega'>('Transferencia');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee =
    subtotal === 0
      ? 0
      : subtotal >= BRAND_INFO.freeShippingThreshold
      ? 0
      : BRAND_INFO.standardShippingFee;
  const total = subtotal + deliveryFee;

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('cart');
      setConfirmedOrder(null);
    }
    onClose();
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (customerName.trim().length < 3) {
      nextErrors.customerName = 'Ingresa tu nombre completo.';
    }
    if (!/^[0-9+\s()-]{7,15}$/.test(customerPhone.trim())) {
      nextErrors.customerPhone = 'Ingresa un número de teléfono o WhatsApp válido.';
    }
    if (deliveryAddress.trim().length < 6) {
      nextErrors.deliveryAddress = 'Ingresa la dirección o punto de entrega.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const createdOrder = onConfirmOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod,
      notes: notes.trim(),
    });
    setConfirmedOrder(createdOrder);
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setNotes('');
    setStep('confirmed');
  };

  const whatsappConfirmUrl = confirmedOrder
    ? buildWhatsAppUrl(
        `Hola Dulce Encanto, acabo de confirmar mi pedido ${confirmedOrder.id} a nombre de ${confirmedOrder.customerName} por un total de ${formatPrice(confirmedOrder.total)}. Productos: ${confirmedOrder.items
          .map((i) => `${i.quantity}x ${i.name}`)
          .join(', ')}.`
      )
    : '#';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2D1F22]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFDFB] h-full flex flex-col border-l border-[#EADFD6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EADFD6] flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#2D1F22]">
              {step === 'cart' && 'Tu carrito dulce'}
              {step === 'checkout' && 'Confirmar pedido'}
              {step === 'confirmed' && 'Pedido confirmado'}
            </h2>
            {step === 'cart' && (
              <p className="text-xs text-[#6D5A5E]">
                Envío gratis en compras desde {formatPrice(BRAND_INFO.freeShippingThreshold)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar carrito"
            className="w-10 h-10 rounded-full border border-[#EADFD6] inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FAF5F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#FCEEF1] border border-[#F4D5DD] mx-auto flex items-center justify-center text-[#B84A66]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C49A52] mb-1">
                  Pedido #{confirmedOrder.id}
                </p>
                <h3 className="font-display text-3xl font-semibold text-[#2D1F22] mb-2">
                  ¡Gracias por tu compra, {confirmedOrder.customerName}!
                </h3>
                <p className="text-sm text-[#6D5A5E]">
                  Hemos registrado tu pedido correctamente. Nuestro equipo lo preparará con mucho cariño.
                </p>
              </div>

              <div className="text-left rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6D5A5E]">Dirección</span>
                  <span className="font-medium text-[#2D1F22] text-right max-w-[60%]">
                    {confirmedOrder.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D5A5E]">Método de pago</span>
                  <span className="font-medium text-[#2D1F22]">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EADFD6] font-semibold">
                  <span className="text-[#2D1F22]">Total</span>
                  <span className="text-[#B84A66] tabular-nums">
                    {formatPrice(confirmedOrder.total)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={whatsappConfirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2D1F22] hover:bg-[#422F33] text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar comprobante por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full px-6 py-3 rounded-full border border-[#EADFD6] text-sm font-medium text-[#2D1F22] hover:bg-[#FAF5F0] transition-colors"
                >
                  Seguir explorando la tienda
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#FCEEF1] flex items-center justify-center text-[#B84A66] mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#2D1F22] mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-sm text-[#6D5A5E] max-w-xs mb-6">
                Explora nuestras fresas con chocolate, brownies y mini tortas para armar un detalle especial.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToCatalog();
                }}
                className="px-6 py-3 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-colors"
              >
                Ir al catálogo
              </button>
            </div>
          ) : step === 'cart' ? (
            <ul className="divide-y divide-[#EADFD6]">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-4 flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FAF5F0] border border-[#EADFD6] shrink-0">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-lg font-semibold text-[#2D1F22] leading-snug">
                        {product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        aria-label={`Eliminar ${product.name}`}
                        className="p-1.5 text-[#6D5A5E] hover:text-[#9E3B55] transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#6D5A5E] mb-3 tabular-nums">
                      {formatPrice(product.price)} c/u
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-[#EADFD6] bg-[#FAF5F0] p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FFFDFB]"
                          aria-label={`Disminuir cantidad de ${product.name}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FFFDFB]"
                          aria-label={`Aumentar cantidad de ${product.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#2D1F22] tabular-nums">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <form id="checkout-form" onSubmit={validateAndSubmit} className="space-y-4">
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                  Nombre completo *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. Laura Gómez"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                />
                {errors.customerName && (
                  <p className="text-xs text-[#9E3B55] mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ej. 300 123 4567"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                />
                {errors.customerPhone && (
                  <p className="text-xs text-[#9E3B55] mt-1">{errors.customerPhone}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                  Dirección de entrega *
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Calle, barrio, apartamento o referencia"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                />
                {errors.deliveryAddress && (
                  <p className="text-xs text-[#9E3B55] mt-1">{errors.deliveryAddress}</p>
                )}
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                  Método de pago
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(['Transferencia', 'Contraentrega'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-colors ${
                        paymentMethod === method
                          ? 'bg-[#FCEEF1] border-[#B84A66] text-[#B84A66]'
                          : 'bg-[#FAF5F0] border-[#EADFD6] text-[#6D5A5E]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="checkout-notes" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                  Dedicatoria o nota de entrega (opcional)
                </label>
                <textarea
                  id="checkout-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mensaje para la tarjeta de regalo o horario preferido..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer Totals & Actions */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-[#EADFD6] bg-[#FAF5F0] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#6D5A5E]">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6D5A5E]">
                <span>Domicilio</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? 'Gratis' : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#2D1F22] pt-2 border-t border-[#EADFD6]">
                <span>Total a pagar</span>
                <span className="tabular-nums text-[#B84A66]">{formatPrice(total)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-6 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-colors"
              >
                Continuar para confirmar pedido
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3.5 rounded-full border border-[#EADFD6] bg-[#FFFDFB] text-sm font-medium text-[#2D1F22] hover:bg-[#FCEEF1] transition-colors"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-colors"
                >
                  Confirmar pedido
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
