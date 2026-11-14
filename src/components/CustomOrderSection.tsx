import React, { useState } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../services/storageService';
import { CustomOrder, Product } from '../types/store';

interface CustomOrderSectionProps {
  products: Product[];
  onCreateCustomOrder: (payload: {
    customerName: string;
    customerPhone: string;
    deliveryDate: string;
    selectedProducts: string[];
    themeColors: string;
    portionsOrSize: string;
    specialInstructions: string;
  }) => CustomOrder;
}

export const CustomOrderSection: React.FC<CustomOrderSectionProps> = ({
  products,
  onCreateCustomOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [themeColors, setThemeColors] = useState('Rosado pastel, beige y detalles dorados');
  const [portionsOrSize, setPortionsOrSize] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedOrder, setSubmittedOrder] = useState<CustomOrder | null>(null);

  const toggleProductSelection = (name: string) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (customerName.trim().length < 3) {
      nextErrors.customerName = 'Por favor escribe tu nombre completo.';
    }
    if (!/^[0-9+\s()-]{7,15}$/.test(customerPhone.trim())) {
      nextErrors.customerPhone = 'Ingresa un número de WhatsApp o teléfono válido.';
    }
    if (!deliveryDate) {
      nextErrors.deliveryDate = 'Selecciona la fecha deseada para tu entrega o evento.';
    }
    if (selectedProducts.length === 0) {
      nextErrors.selectedProducts = 'Selecciona al menos un tipo de postre para tu detalle.';
    }
    if (specialInstructions.trim().length < 10) {
      nextErrors.specialInstructions =
        'Cuéntanos los detalles especiales, sabores o dedicatoria (mínimo 10 caracteres).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const created = onCreateCustomOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryDate,
      selectedProducts,
      themeColors: themeColors.trim() || 'A elección de Dulce Encanto',
      portionsOrSize: portionsOrSize.trim() || 'Por definir',
      specialInstructions: specialInstructions.trim(),
    });

    setSubmittedOrder(created);
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryDate('');
    setSelectedProducts([]);
    setPortionsOrSize('');
    setSpecialInstructions('');
  };

  const whatsappCustomUrl = submittedOrder
    ? buildWhatsAppUrl(
        `Hola Dulce Encanto, envié la solicitud de pedido personalizado ${submittedOrder.id} a nombre de ${submittedOrder.customerName} para el ${submittedOrder.deliveryDate}. Productos: ${submittedOrder.selectedProducts.join(', ')}. Indicaciones: ${submittedOrder.specialInstructions}`
      )
    : '#';

  return (
    <section id="personalizados" className="py-16 lg:py-24 bg-[#FAF5F0] border-t border-[#EADFD6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Context Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#B84A66] mb-2">
              A Tu Medida
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2D1F22] text-balance mb-4">
              Pedidos personalizados
            </h2>
            <p className="text-base text-[#6D5A5E] leading-relaxed mb-8">
              ¿Planeas un cumpleaños, aniversario, baby shower o regalo corporativo? Diseñamos cada detalle según tus colores, sabores favoritos y dedicatoria especial.
            </p>

            <div className="space-y-5 border-t border-[#EADFD6] pt-6">
              <div>
                <p className="text-xs font-semibold text-[#C49A52] mb-1">01. Elige tus postres</p>
                <p className="text-sm text-[#6D5A5E]">
                  Combina fresas con chocolate, brownies, mini tortas y vasos de postre en la misma solicitud.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#C49A52] mb-1">02. Personaliza la estética</p>
                <p className="text-sm text-[#6D5A5E]">
                  Indica paleta de colores, mensaje en la tarjeta, iniciales o temática del evento.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#C49A52] mb-1">03. Confirmación rápida</p>
                <p className="text-sm text-[#6D5A5E]">
                  Recibimos tu solicitud en nuestro sistema y te confirmamos disponibilidad y cotización en menos de 2 horas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDFB] rounded-3xl border border-[#EADFD6] p-6 sm:p-8 shadow-xs">
              {submittedOrder ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-[#FCEEF1] border border-[#F4D5DD] mx-auto flex items-center justify-center text-[#B84A66]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#C49A52] mb-1">
                      Solicitud #{submittedOrder.id}
                    </p>
                    <h3 className="font-display text-3xl font-semibold text-[#2D1F22] mb-2">
                      ¡Hemos recibido tu pedido personalizado!
                    </h3>
                    <p className="text-sm text-[#6D5A5E] max-w-md mx-auto">
                      Gracias, {submittedOrder.customerName}. Nuestro taller de repostería ya tiene tu solicitud para el {submittedOrder.deliveryDate}.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={whatsappCustomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Coordinar detalles por WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedOrder(null)}
                      className="px-6 py-3 rounded-full border border-[#EADFD6] text-sm font-medium text-[#2D1F22] hover:bg-[#FAF5F0] transition-colors"
                    >
                      Crear otra solicitud
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="custom-name" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                        Tu nombre *
                      </label>
                      <input
                        id="custom-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Mariana Vélez"
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                      />
                      {errors.customerName && (
                        <p className="text-xs text-[#9E3B55] mt-1">{errors.customerName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="custom-phone" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="custom-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Ej. 310 555 0199"
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                      />
                      {errors.customerPhone && (
                        <p className="text-xs text-[#9E3B55] mt-1">{errors.customerPhone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="custom-date" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                        Fecha de entrega o evento *
                      </label>
                      <input
                        id="custom-date"
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                      />
                      {errors.deliveryDate && (
                        <p className="text-xs text-[#9E3B55] mt-1">{errors.deliveryDate}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="custom-portions" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                        Cantidad o porciones estimadas
                      </label>
                      <input
                        id="custom-portions"
                        type="text"
                        value={portionsOrSize}
                        onChange={(e) => setPortionsOrSize(e.target.value)}
                        placeholder="Ej. Para 10 personas / 24 unidades"
                        className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-[#2D1F22] mb-2">
                      Selecciona los productos que deseas incluir *
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {products.map((product) => {
                        const checked = selectedProducts.includes(product.name);
                        return (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => toggleProductSelection(product.name)}
                            aria-pressed={checked}
                            className={`text-left px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-colors flex items-center justify-between gap-2 ${
                              checked
                                ? 'bg-[#FCEEF1] border-[#B84A66] text-[#2D1F22]'
                                : 'bg-[#FAF5F0] border-[#EADFD6] text-[#6D5A5E] hover:border-[#C49A52]'
                            }`}
                          >
                            <span className="truncate">{product.name}</span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                checked
                                  ? 'bg-[#B84A66] border-[#B84A66] text-white'
                                  : 'border-[#C49A52]/60'
                              }`}
                            >
                              {checked ? '✓' : ''}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.selectedProducts && (
                      <p className="text-xs text-[#9E3B55] mt-1.5">{errors.selectedProducts}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="custom-colors" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                      Paleta de colores o temática
                    </label>
                    <input
                      id="custom-colors"
                      type="text"
                      value={themeColors}
                      onChange={(e) => setThemeColors(e.target.value)}
                      placeholder="Ej. Rosado pastel, blanco y dorado"
                      className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                    />
                  </div>

                  <div>
                    <label htmlFor="custom-instructions" className="block text-xs font-semibold text-[#2D1F22] mb-1.5">
                      Instrucciones especiales y dedicatoria *
                    </label>
                    <textarea
                      id="custom-instructions"
                      rows={4}
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Cuéntanos sabores preferidos, mensaje para la tarjeta, restricciones alimentarias o detalles de diseño..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
                    />
                    {errors.specialInstructions && (
                      <p className="text-xs text-[#9E3B55] mt-1">{errors.specialInstructions}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-colors shadow-xs"
                  >
                    Enviar pedido personalizado
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
