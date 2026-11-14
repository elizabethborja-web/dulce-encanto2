import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../services/storageService';
import { Product } from '../types/store';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < 20 ? prev + 1 : 20));
  };

  const handleAdd = () => {
    if (!product.available) return;
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <article className="group flex flex-col bg-[#FFFDFB] rounded-3xl border border-[#EADFD6] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF5F0] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B84A66]"
        aria-label={`Ver detalles de ${product.name}`}
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex-1 flex flex-col p-5 sm:p-6">
        {/* Clean unboxed zero-pill metadata */}
        <div className="flex items-center gap-2 text-xs text-[#6D5A5E] mb-1.5 truncate">
          <span className="font-medium text-[#B84A66]">{product.category}</span>
          <span aria-hidden="true">·</span>
          <span>{product.portionInfo}</span>
          {!product.available && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#9E3B55]">Agotado</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="text-left focus-visible:outline-none focus-visible:underline"
        >
          <h3 className="font-display text-2xl font-semibold text-[#2D1F22] leading-snug mb-2 group-hover:text-[#B84A66] transition-colors">
            {product.name}
          </h3>
        </button>

        <p className="text-sm text-[#6D5A5E] leading-relaxed line-clamp-2 mb-5">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-[#EADFD6] flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-lg font-semibold text-[#2D1F22] tabular-nums">
              {formatPrice(product.price)}
            </span>

            {/* Quantity selector */}
            <div
              className="inline-flex items-center rounded-full border border-[#EADFD6] bg-[#FAF5F0] p-0.5"
              aria-label={`Cantidad para ${product.name}`}
            >
              <button
                type="button"
                onClick={handleDecrease}
                disabled={!product.available || quantity <= 1}
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FFFDFB] disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66]"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#2D1F22]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                disabled={!product.available || quantity >= 20}
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-[#2D1F22] hover:bg-[#FFFDFB] disabled:opacity-40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66]"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.available}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] disabled:bg-[#EADFD6] disabled:text-[#6D5A5E] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B84A66] min-h-[44px]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>{product.available ? 'Agregar al carrito' : 'No disponible'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
