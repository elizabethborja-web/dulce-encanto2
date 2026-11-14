import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '../services/storageService';
import { Product } from '../types/store';
import { SafeImage } from './SafeImage';
import cajaRegaloImg from '../assets/images/product_caja_regalo_1794627197971.jpg';

interface FeaturedAndAboutProps {
  featuredProducts: Product[];
  onExploreCatalog: () => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const FeaturedAndAbout: React.FC<FeaturedAndAboutProps> = ({
  featuredProducts,
  onExploreCatalog,
  onQuickAdd,
  onSelectProduct,
}) => {
  return (
    <>
      {/* Productos Destacados */}
      <section className="py-16 lg:py-20 bg-[#FFFDFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A52] mb-2">
                Selección de la Casa
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D1F22] text-balance">
                Productos destacados
              </h2>
            </div>

            <button
              type="button"
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B84A66] hover:text-[#9E3B55] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <span>Ver todo el catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="group flex flex-col rounded-3xl bg-[#FAF5F0] border border-[#EADFD6] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="aspect-[4/3] w-full overflow-hidden bg-[#F3EAE0] focus-visible:outline-none"
                  aria-label={`Ver ${product.name}`}
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fallbackTitle={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </button>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-[#6D5A5E] mb-1">
                    <span className="font-medium text-[#B84A66]">Favorito</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.category}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#2D1F22] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#6D5A5E] line-clamp-2 mb-5">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-[#EADFD6]">
                    <span className="text-lg font-semibold text-[#2D1F22] tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onQuickAdd(product)}
                      className="px-4 py-2.5 rounded-full bg-[#FFFDFB] hover:bg-[#B84A66] text-[#2D1F22] hover:text-white border border-[#EADFD6] hover:border-[#B84A66] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nuestro Emprendimiento */}
      <section id="nosotros" className="py-16 lg:py-20 bg-[#FCEEF1]/55 border-y border-[#EADFD6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] rounded-3xl overflow-hidden border border-[#EADFD6] bg-[#FFFDFB]">
                <SafeImage
                  src={cajaRegaloImg}
                  alt="Caja de regalo Dulce Encanto con fresas cubiertas en chocolate, brownies y macarons"
                  fallbackTitle="Nuestra Esencia Dulce Encanto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#B84A66] mb-2">
                Nuestro Emprendimiento
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D1F22] text-balance mb-4">
                Hecho a mano para celebrar con dulzura y estilo
              </h2>
              <p className="text-base text-[#6D5A5E] leading-relaxed mb-4">
                <strong className="font-semibold text-[#2D1F22]">Dulce Encanto</strong> nació de la pasión por transformar pequeños instantes en recuerdos inolvidables. Cada fresa seleccionada, cada brownie horneado con cacao puro y cada mini torta decorada con delicadeza refleja nuestro amor por el detalle.
              </p>
              <p className="text-base text-[#6D5A5E] leading-relaxed mb-8">
                Cuidamos tanto el sabor como la presentación: empacamos en cajas en tonos rosado pastel, beige y dorado para que cada pedido llegue listo para sorprender en cumpleaños, aniversarios, grados o agradecimientos especiales.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EADFD6]">
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#2D1F22] tabular-nums">
                    100%
                  </p>
                  <p className="text-xs text-[#6D5A5E] mt-0.5">Artesanal y fresco</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#2D1F22] tabular-nums">
                    24h
                  </p>
                  <p className="text-xs text-[#6D5A5E] mt-0.5">Pedidos a medida</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#2D1F22] tabular-nums">
                    +500
                  </p>
                  <p className="text-xs text-[#6D5A5E] mt-0.5">Detalles entregados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
