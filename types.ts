
export type Brand = 'Google' | 'Dell' | 'HP' | 'Microsoft' | 'Lenovo' | 'Samsung' | 'All';
export type Currency = 'USD' | 'GHS' | 'EUR' | 'GBP';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  description: string;
  image: string;
  category: 'Mobile' | 'Laptop' | 'Tablet' | 'Accessory' | 'Console' | 'Monitor' | 'Watch';
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  lastLogin: string;
}

export interface EmailMessage {
  id: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: 'AUTH' | 'ORDER';
  otp?: string;
}

export interface AppState {
  cart: CartItem[];
  user: User | null;
  selectedBrand: Brand;
  searchQuery: string;
  isCartOpen: boolean;
  isAuthOpen: boolean;
  isCheckoutOpen: boolean;
  currency: Currency;
  inbox: EmailMessage[];
}
