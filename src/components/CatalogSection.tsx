import React, { useMemo, useState } from 'react';
import { Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/seedData';
import { formatPrice } from '../services/storageService';
import { Product, ProductCategory } from '../types/store';
import { ProductCard } from './ProductCard';
import { SafeImage } from './SafeImage';

interface CatalogSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalQty, setModalQty] = useState(1);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleOpenProduct = (product: Product) => {
    setModalQty(1);
    setActiveProduct(product);
  };

  const handleAddFromModal = () => {
    if (!activeProduct || !activeProduct.available) return;
    onAddToCart(activeProduct, modalQty);
    setActiveProduct(null);
  };

  return (
    <section id="catalogo" className="py-16 lg:py-24 bg-[#FFFDFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A52] mb-2">
            Catálogo Dulce Encanto
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2D1F22] text-balance mb-3">
            Nuestros postres y detalles
          </h2>
          <p className="text-base text-[#6D5A5E]">
            Elige tus favoritos, ajusta la cantidad deseada y agrégalos a tu carrito para coordinar la entrega.
          </p>
        </div>

        {/* Interactive Category Tabs + Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Filtrar postres por categoría"
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'Todos'}
              onClick={() => setSelectedCategory('Todos')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === 'Todos'
                  ? 'bg-[#2D1F22] text-white'
                  : 'bg-[#FAF5F0] text-[#6D5A5E] hover:text-[#2D1F22] border border-[#EADFD6]'
              }`}
            >
              Todos
            </button>
            {PRODUCT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-[#2D1F22] text-white'
                    : 'bg-[#FAF5F0] text-[#6D5A5E] hover:text-[#2D1F22] border border-[#EADFD6]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#6D5A5E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar postre..."
              aria-label="Buscar postre en el catálogo"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF5F0] border border-[#EADFD6] text-sm text-[#2D1F22] placeholder:text-[#6D5A5E]/70 focus:outline-none focus:ring-2 focus:ring-[#B84A66]"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-[#EADFD6] bg-[#FAF5F0] p-12 text-center">
            <p className="font-display text-2xl font-semibold text-[#2D1F22] mb-2">
              No encontramos postres con ese filtro
            </p>
            <p className="text-sm text-[#6D5A5E] mb-6">
              Prueba seleccionando otra categoría o limpia la búsqueda para ver todo nuestro menú.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onSelectProduct={handleOpenProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D1F22]/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FFFDFB] rounded-3xl border border-[#EADFD6] overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProduct(null)}
              aria-label="Cerrar detalle del producto"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[#FFFDFB]/90 border border-[#EADFD6] inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FCEEF1] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#FAF5F0]">
              <SafeImage
                src={activeProduct.image}
                alt={activeProduct.name}
                fallbackTitle={activeProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-2 text-xs text-[#6D5A5E] mb-2">
                <span className="font-medium text-[#B84A66]">{activeProduct.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeProduct.portionInfo}</span>
              </div>

              <h3
                id="product-modal-title"
                className="font-display text-3xl font-semibold text-[#2D1F22] mb-3"
              >
                {activeProduct.name}
              </h3>

              <p className="text-sm text-[#6D5A5E] leading-relaxed mb-3">
                {activeProduct.description}
              </p>
              <p className="text-xs text-[#6D5A5E] leading-relaxed bg-[#FAF5F0] p-3.5 rounded-2xl border border-[#EADFD6] mb-6">
                {activeProduct.details}
              </p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-[#2D1F22] tabular-nums">
                    {formatPrice(activeProduct.price)}
                  </span>

                  <div className="inline-flex items-center rounded-full border border-[#EADFD6] bg-[#FAF5F0] p-0.5">
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => (q > 1 ? q - 1 : 1))}
                      disabled={!activeProduct.available || modalQty <= 1}
                      className="w-9 h-9 rounded-full inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FFFDFB] disabled:opacity-40"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">
                      {modalQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => (q < 20 ? q + 1 : 20))}
                      disabled={!activeProduct.available || modalQty >= 20}
                      className="w-9 h-9 rounded-full inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FFFDFB] disabled:opacity-40"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddFromModal}
                  disabled={!activeProduct.available}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] disabled:bg-[#EADFD6] text-white text-sm font-semibold transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {activeProduct.available
                      ? `Agregar · ${formatPrice(activeProduct.price * modalQty)}`
                      : 'Producto agotado'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
