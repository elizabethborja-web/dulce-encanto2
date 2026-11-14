import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/seedData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onGoCustomOrder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onGoCustomOrder,
}) => {
  return (
    <section id="inicio" className="bg-[#FAF5F0] border-b border-[#EADFD6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#B84A66] mb-3">
              Repostería Artesanal · Detalles Dulces
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-[#2D1F22] text-balance mb-4">
              Un dulce momento para cada ocasión
            </h1>

            <p className="text-base sm:text-lg text-[#6D5A5E] leading-relaxed mb-8 max-w-xl">
              En <strong className="font-semibold text-[#2D1F22]">Dulce Encanto</strong> elaboramos fresas con chocolate belga, brownies fundentes, mini tortas florales y vasos de postre hechos a mano con ingredientes frescos y presentación de regalo.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-all duration-150 shadow-sm hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B84A66]"
              >
                <span>Ver el catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onGoCustomOrder}
                className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#FFFDFB] hover:bg-[#FCEEF1] text-[#2D1F22] border border-[#C49A52]/60 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B84A66]"
              >
                Pedido personalizado
              </button>
            </div>
          </motion.div>

          {/* Right Photographic Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] rounded-3xl overflow-hidden border border-[#EADFD6] bg-[#F3EAE0] shadow-sm">
              <SafeImage
                src={HERO_IMAGE}
                alt="Mesa artesanal de Dulce Encanto con mini torta rosada, fresas con chocolate, brownies y vasos de postre"
                fallbackTitle="Dulce Encanto — Mesa Artesanal"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Promise Strip */}
        <div className="mt-10 pt-8 border-t border-[#EADFD6] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-semibold text-[#C49A52] mb-1">01. Chocolate Real</p>
            <p className="text-sm font-medium text-[#2D1F22]">Cobertura belga templada y cacao al 70% sin sucedáneos.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#C49A52] mb-1">02. Horneado Diario</p>
            <p className="text-sm font-medium text-[#2D1F22]">Preparaciones frescas cada mañana en pequeños lotes.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#C49A52] mb-1">03. Empaque Boutique</p>
            <p className="text-sm font-medium text-[#2D1F22]">Cajas crema, cintas satinadas y tarjeta personalizada incluida.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#C49A52] mb-1">04. Entregas Seguras</p>
            <p className="text-sm font-medium text-[#2D1F22]">Envíos programados con cuidado refrigerado puerta a puerta.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
