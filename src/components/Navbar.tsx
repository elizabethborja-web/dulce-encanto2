import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { ActiveView } from '../types/store';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeView: ActiveView;
  cartCount: number;
  onNavigateSection: (sectionId: string) => void;
  onSwitchView: (view: ActiveView) => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  cartCount,
  onNavigateSection,
  onSwitchView,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const handleAdminClick = () => {
    setMobileMenuOpen(false);
    onSwitchView(activeView === 'admin' ? 'store' : 'admin');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDFB]/95 backdrop-blur-md border-b border-[#EADFD6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('inicio')}
          className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66] rounded-lg"
          aria-label="Ir al inicio de Dulce Encanto"
        >
          <BrandLogo />
        </button>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6D5A5E]"
        >
          <button
            type="button"
            onClick={() => handleLinkClick('inicio')}
            className="hover:text-[#2D1F22] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C49A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66] rounded-sm"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('catalogo')}
            className="hover:text-[#2D1F22] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C49A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66] rounded-sm"
          >
            Catálogo
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('personalizados')}
            className="hover:text-[#2D1F22] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C49A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66] rounded-sm"
          >
            Personalizados
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('contacto')}
            className="hover:text-[#2D1F22] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C49A52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66] rounded-sm"
          >
            Contacto
          </button>
          <button
            type="button"
            onClick={handleAdminClick}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66] rounded-sm ${
              activeView === 'admin'
                ? 'text-[#B84A66] border-[#B84A66] font-semibold'
                : 'border-transparent hover:text-[#2D1F22] hover:border-[#C49A52]'
            }`}
          >
            {activeView === 'admin' ? 'Ver Tienda' : 'Panel Admin'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B84A66] min-h-[40px]"
            aria-label={`Abrir carrito de compras con ${cartCount} productos`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="tabular-nums">Carrito ({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#EADFD6] text-[#2D1F22] hover:bg-[#FAF5F0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66]"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="md:hidden border-t border-[#EADFD6] bg-[#FFFDFB] px-4 py-4 space-y-1"
        >
          <button
            type="button"
            onClick={() => handleLinkClick('inicio')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D1F22] hover:bg-[#FCEEF1] transition-colors"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('catalogo')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D1F22] hover:bg-[#FCEEF1] transition-colors"
          >
            Catálogo
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('personalizados')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D1F22] hover:bg-[#FCEEF1] transition-colors"
          >
            Personalizados
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('contacto')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D1F22] hover:bg-[#FCEEF1] transition-colors"
          >
            Contacto
          </button>
          <button
            type="button"
            onClick={handleAdminClick}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#B84A66] hover:bg-[#FCEEF1] transition-colors"
          >
            {activeView === 'admin' ? 'Volver a la Tienda' : 'Panel Administrativo'}
          </button>
        </nav>
      )}
    </header>
  );
};
