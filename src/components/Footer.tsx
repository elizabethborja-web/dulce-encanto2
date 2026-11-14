import React from 'react';
import { BRAND_INFO } from '../data/seedData';
import { ActiveView } from '../types/store';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSwitchView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onSwitchView,
}) => {
  return (
    <footer className="bg-[#FAF5F0] border-t border-[#EADFD6] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#EADFD6]">
          <div>
            <BrandLogo />
            <p className="text-sm text-[#6D5A5E] mt-2">
              {BRAND_INFO.tagline} · Repostería artesanal y detalles dulces.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#6D5A5E]">
            <button
              type="button"
              onClick={() => onNavigateSection('inicio')}
              className="hover:text-[#2D1F22] transition-colors"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('catalogo')}
              className="hover:text-[#2D1F22] transition-colors"
            >
              Catálogo
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('personalizados')}
              className="hover:text-[#2D1F22] transition-colors"
            >
              Personalizados
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('contacto')}
              className="hover:text-[#2D1F22] transition-colors"
            >
              Contacto
            </button>
            <button
              type="button"
              onClick={() => onSwitchView('admin')}
              className="hover:text-[#B84A66] font-medium transition-colors"
            >
              Panel Admin
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6D5A5E]">
          <p>© {new Date().getFullYear()} {BRAND_INFO.name}. Todos los derechos reservados.</p>
          <p>{BRAND_INFO.city} · {BRAND_INFO.instagramHandle}</p>
        </div>
      </div>
    </footer>
  );
};
