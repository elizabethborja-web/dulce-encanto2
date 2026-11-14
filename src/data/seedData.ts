import heroImg from '../assets/images/hero_dulce_encanto_1794627196333.jpg';
import fresasImg from '../assets/images/product_fresas_chocolate_1794627196044.jpg';
import browniesImg from '../assets/images/product_brownies_cacao_1794627196277.jpg';
import miniTortaImg from '../assets/images/product_mini_torta_1794627197315.jpg';
import vasoPostreImg from '../assets/images/product_vaso_postre_1794627196954.jpg';
import cajaRegaloImg from '../assets/images/product_caja_regalo_1794627197971.jpg';
import { CustomOrder, Order, Product, ProductCategory } from '../types/store';

export const BRAND_INFO = {
  name: 'Dulce Encanto',
  tagline: 'Un dulce momento para cada ocasión',
  whatsappNumber: '573001234567',
  instagramHandle: '@dulceencanto.reposteria',
  tiktokHandle: '@dulceencanto.postres',
  facebookPage: 'Dulce Encanto Repostería',
  email: 'hola@dulceencanto.co',
  city: 'Medellín y Área Metropolitana',
  freeShippingThreshold: 85000,
  standardShippingFee: 8000,
};

export const HERO_IMAGE = heroImg;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Fresas con Chocolate',
  'Brownies',
  'Mini Tortas',
  'Vasos de Postre',
  'Detalles de Regalo',
];

export const GALLERY_PRESETS = [
  { label: 'Fresas con Chocolate Belga', url: fresasImg },
  { label: 'Brownies Artesanales', url: browniesImg },
  { label: 'Mini Torta Floral', url: miniTortaImg },
  { label: 'Vasos de Postre', url: vasoPostreImg },
  { label: 'Caja de Regalo', url: cajaRegaloImg },
  { label: 'Mesa Dulce Encanto', url: heroImg },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-fresas-12',
    name: 'Caja de Fresas con Chocolate Belga',
    category: 'Fresas con Chocolate',
    description:
      'Doce fresas frescas seleccionadas a mano, cubiertas en chocolate oscuro, con leche y chocolate rosado artesanal con lámina de oro comestible y pistacho.',
    details:
      'Incluye caja de presentación color crema con papel encerado, 12 fresas de calibre grande y tarjeta de dedicatoria personalizada.',
    price: 42000,
    image: fresasImg,
    featured: true,
    available: true,
    portionInfo: 'Caja x 12 unidades',
  },
  {
    id: 'prod-mini-torta-rosa',
    name: 'Mini Torta Pétalos & Oro',
    category: 'Mini Tortas',
    description:
      'Bizcocho suave de vainilla bourbon relleno de compota de frutos rojos, cubierto en crema de mantequilla suiza en tonos rosado pastel y marfil.',
    details:
      'Decorada con pétalos comestibles deshidratados y destellos de oro. Ideal para celebraciones íntimas, cumpleaños o aniversarios.',
    price: 58000,
    image: miniTortaImg,
    featured: true,
    available: true,
    portionInfo: '4 a 6 porciones · 12 cm',
  },
  {
    id: 'prod-brownies-cacao',
    name: 'Brownies Fudge de Cacao & Nuez',
    category: 'Brownies',
    description:
      'Textura húmeda y centro fundente elaborados con cacao al 70%, ganache sedoso, nueces tostadas y un toque de flor de sal.',
    details:
      'Horneados cada mañana en lotes pequeños para conservar su corteza crujiente y corazón intenso de chocolate.',
    price: 32000,
    image: browniesImg,
    featured: true,
    available: true,
    portionInfo: 'Caja x 6 porciones',
  },
  {
    id: 'prod-vaso-tres-leches',
    name: 'Vasos de Postre Frutos & Mascarpone',
    category: 'Vasos de Postre',
    description:
      'Capas de bizcocho esponjoso tres leches, crema ligera de mascarpone con vainilla natural, mermelada casera de frambuesa y rizos de chocolate.',
    details:
      'Presentados en vaso reutilizable con cucharita biodegradable y frutos frescos de temporada.',
    price: 24000,
    image: vasoPostreImg,
    featured: false,
    available: true,
    portionInfo: 'Set x 2 vasos (220 g c/u)',
  },
  {
    id: 'prod-caja-regalo-encanto',
    name: 'Cofre Dulce Encanto de Regalo',
    category: 'Detalles de Regalo',
    description:
      'Nuestra caja insignia en tonos rosado pastel y cinta satinada beige con fresas bañadas en chocolate, cubos de brownie y macarons de vainilla.',
    details:
      'Lista para obsequiar con mensaje caligrafiado. Combina tres de nuestras preparaciones más solicitadas en un solo detalle.',
    price: 76000,
    image: cajaRegaloImg,
    featured: false,
    available: true,
    portionInfo: '14 piezas surtidas',
  },
  {
    id: 'prod-fresas-6',
    name: 'Detalle de 6 Fresas Doradas',
    category: 'Fresas con Chocolate',
    description:
      'Media docena de fresas frescas bañadas en chocolate semiamargo y chocolate rubí pastel con delicados hilos dorados y almendra crocante.',
    details:
      'El obsequio perfecto para sorprender en cualquier momento del día sin esperar una fecha especial.',
    price: 25000,
    image: fresasImg,
    featured: false,
    available: true,
    portionInfo: 'Caja x 6 unidades',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'DE-1042',
    customerName: 'Valentina Restrepo',
    customerPhone: '3114589021',
    deliveryAddress: 'Cra 43A #18-45, El Poblado, Apto 602',
    paymentMethod: 'Transferencia',
    notes: 'Incluir tarjeta que diga: Feliz cumpleaños, que cada día sea así de dulce.',
    items: [
      {
        productId: 'prod-mini-torta-rosa',
        name: 'Mini Torta Pétalos & Oro',
        price: 58000,
        quantity: 1,
        image: miniTortaImg,
      },
      {
        productId: 'prod-fresas-6',
        name: 'Detalle de 6 Fresas Doradas',
        price: 25000,
        quantity: 1,
        image: fresasImg,
      },
    ],
    subtotal: 83000,
    deliveryFee: 8000,
    total: 91000,
    status: 'En preparación',
    createdAt: '2026-11-13T14:20:00.000Z',
  },
  {
    id: 'DE-1041',
    customerName: 'Sofía Giraldo',
    customerPhone: '3007894412',
    deliveryAddress: 'Calle 33 #74E-12, Laureles',
    paymentMethod: 'Contraentrega',
    notes: 'Entregar después de las 3:00 p. m.',
    items: [
      {
        productId: 'prod-caja-regalo-encanto',
        name: 'Cofre Dulce Encanto de Regalo',
        price: 76000,
        quantity: 1,
        image: cajaRegaloImg,
      },
    ],
    subtotal: 76000,
    deliveryFee: 8000,
    total: 84000,
    status: 'Entregado',
    createdAt: '2026-11-12T16:45:00.000Z',
  },
];

export const INITIAL_CUSTOM_ORDERS: CustomOrder[] = [
  {
    id: 'PERS-208',
    customerName: 'Camila Montoya',
    customerPhone: '3156428890',
    deliveryDate: '2026-11-21',
    selectedProducts: ['Mini Tortas', 'Fresas con Chocolate'],
    themeColors: 'Rosado pastel, crema y detalles dorados',
    portionsOrSize: '12 personas · mesa dulce íntima',
    specialInstructions:
      'Es para un grado universitario. Quisiera la mini torta con un letrero pequeño dorado que diga "Felicidades Cami" y fresas en tono rosado y blanco.',
    status: 'Confirmado',
    createdAt: '2026-11-13T11:10:00.000Z',
  },
];
