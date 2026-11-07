export enum ProductCategory {
  ALL = 'All Models',
  LOW_TOP = 'Low-Top',
  BOOT = 'Boot',
  STUDIO_MULE = 'Studio Mule',
  RUNNER = 'Runner',
  DERBY = 'Derby',
  HIGH_TOP = 'High-Top',
}

export enum SortOption {
  FEATURED = 'featured',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  LIGHTEST = 'lightest',
}

export enum LedgerFilter {
  ALL = 'all',
  LOW_DROP = 'low_drop',
  RESOLEABLE = 'resoleable',
}

export enum CheckoutStep {
  BAG = 'bag',
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  CONFIRMED = 'confirmed',
}

export enum PaymentMethod {
  CARD = 'card',
  WIRE = 'wire',
  COD = 'cod',
}

export enum ShippingMethod {
  STANDARD = 'standard',
  PRIORITY = 'priority',
}

export interface ColorwayOption {
  id: string;
  label: string;
  swatchPrimary: 'red' | 'blue' | 'yellow' | 'black' | 'chalk';
  swatchSecondary: 'red' | 'blue' | 'yellow' | 'black' | 'chalk';
  code: string;
}

export interface Product {
  id: string;
  index: string;
  name: string;
  category: Exclude<ProductCategory, ProductCategory.ALL>;
  price: number;
  statusNote: string;
  image: string;
  imageAlt: string;
  shortSummary: string;
  description: string;
  upperMaterial: string;
  soleCompound: string;
  liningMaterial: string;
  lastCode: string;
  stackMm: number;
  dropMm: number;
  weightGrams: number;
  resoleable: boolean;
  resoleMethod: string;
  origin: string;
  colorways: ColorwayOption[];
  availableSizes: number[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  index: string;
  price: number;
  image: string;
  imageAlt: string;
  sizeEu: number;
  colorwayId: string;
  colorwayLabel: string;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: ShippingMethod;
}

export interface ConfirmedOrder {
  orderNumber: string;
  placedAt: string;
  items: CartItem[];
  shipping: ShippingDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  total: number;
}

export interface SizeChartRow {
  eu: number;
  usMen: string;
  usWomen: string;
  uk: string;
  mondoCm: string;
}

export interface DisclosureEntry {
  id: string;
  index: string;
  title: string;
  summary: string;
  points: string[];
}
