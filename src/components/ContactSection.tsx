import React from 'react';
import { Clock, Instagram, Mail, MapPin, MessageCircle, Share2 } from 'lucide-react';
import { BRAND_INFO } from '../data/seedData';
import { buildWhatsAppUrl } from '../services/storageService';

interface ContactSectionProps {
  onNotifyCopy: (label: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNotifyCopy }) => {
  const whatsappGeneralUrl = buildWhatsAppUrl(
    'Hola Dulce Encanto, me gustaría recibir asesoría para realizar un pedido.'
  );

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    onNotifyCopy(label);
  };

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-[#FFFDFB] border-t border-[#EADFD6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left WhatsApp & Social CTA */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C49A52] mb-2">
              Atención Cercana
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#2D1F22] text-balance mb-4">
              Hablemos sobre tu próximo detalle
            </h2>
            <p className="text-base text-[#6D5A5E] leading-relaxed mb-8 max-w-lg">
              ¿Tienes dudas sobre sabores, disponibilidad para hoy o eventos especiales? Escríbenos directamente y te atenderemos con gusto.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#B84A66] hover:bg-[#9E3B55] text-white text-sm font-semibold transition-all duration-150 shadow-sm hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Escribir por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(BRAND_INFO.email, 'Correo copiado')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#FAF5F0] hover:bg-[#FCEEF1] text-[#2D1F22] border border-[#EADFD6] text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <Mail className="w-4 h-4 text-[#C49A52]" />
                <span>{BRAND_INFO.email}</span>
              </button>
            </div>

            {/* Social Media Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() =>
                  handleCopy(BRAND_INFO.instagramHandle, 'Usuario de Instagram copiado')
                }
                className="p-4 rounded-2xl bg-[#FAF5F0] hover:bg-[#FCEEF1] border border-[#EADFD6] text-left transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#B84A66] mb-2" />
                <p className="text-xs text-[#6D5A5E]">Instagram</p>
                <p className="text-sm font-semibold text-[#2D1F22] truncate">
                  {BRAND_INFO.instagramHandle}
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(BRAND_INFO.tiktokHandle, 'Usuario de TikTok copiado')}
                className="p-4 rounded-2xl bg-[#FAF5F0] hover:bg-[#FCEEF1] border border-[#EADFD6] text-left transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#B84A66] mb-2" />
                <p className="text-xs text-[#6D5A5E]">TikTok</p>
                <p className="text-sm font-semibold text-[#2D1F22] truncate">
                  {BRAND_INFO.tiktokHandle}
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(BRAND_INFO.facebookPage, 'Página de Facebook copiada')}
                className="p-4 rounded-2xl bg-[#FAF5F0] hover:bg-[#FCEEF1] border border-[#EADFD6] text-left transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#B84A66] mb-2" />
                <p className="text-xs text-[#6D5A5E]">Facebook</p>
                <p className="text-sm font-semibold text-[#2D1F22] truncate">
                  {BRAND_INFO.facebookPage}
                </p>
              </button>
            </div>
          </div>

          {/* Right Hours & Business Info Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#FAF5F0] border border-[#EADFD6] p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFFDFB] border border-[#EADFD6] flex items-center justify-center text-[#B84A66] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-semibold text-[#2D1F22] mb-3">
                    Horarios de atención
                  </h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4 py-1.5 border-b border-[#EADFD6]">
                      <dt className="text-[#6D5A5E]">Lunes a Viernes</dt>
                      <dd className="font-semibold text-[#2D1F22] tabular-nums">9:00 a. m. – 7:00 p. m.</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5 border-b border-[#EADFD6]">
                      <dt className="text-[#6D5A5E]">Sábados</dt>
                      <dd className="font-semibold text-[#2D1F22] tabular-nums">9:00 a. m. – 6:00 p. m.</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5">
                      <dt className="text-[#6D5A5E]">Domingos y Festivos</dt>
                      <dd className="font-semibold text-[#2D1F22] tabular-nums">10:00 a. m. – 2:00 p. m.</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EADFD6] flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFFDFB] border border-[#EADFD6] flex items-center justify-center text-[#C49A52] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#2D1F22] mb-1">
                    Cobertura y pedidos
                  </h3>
                  <p className="text-sm text-[#6D5A5E] leading-relaxed">
                    Taller artesanal ubicado en {BRAND_INFO.city}. Realizamos entregas programadas a domicilio y retiros en taller con cita previa. Los pedidos personalizados se reciben con mínimo 24 horas de anticipación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
