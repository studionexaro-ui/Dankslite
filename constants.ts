
import { Product, Currency } from './types';

export const CURRENCY_CONFIG: Record<Currency, { symbol: string, rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  GHS: { symbol: 'GH₵', rate: 15.50 }, // Example rate
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 }
};

export const MOJOAUTH_API_KEY = "cbb9c9ef-8d17-41ae-b70f-574f1a06de8c";
export const MOJOAUTH_BASE_URL = "https://dankslite_316864c1.auth.mojoauth.com/v1/login";
export const MOJOAUTH_STATIC_STATE = "eyJhbGciOiJSUzI1NiIsImtpZCI6InJlc19lMTFmOWUwZmJmZWJhYTg0NWZiYzkyZGEiLCJ0eXAiOiJKV1QifQ.eyJwcm9qZWN0X2lkIjoiNjk4Y2QzMTM0ZjJmNjgxNTc3ZmNjNDg1IiwiY2xpZW50X2lkIjoiY2JiOWM5ZWYtOGQxNy00MWFlLWI3MGYtNTc0ZjFhMDZkZThjIiwicmVkaXJlY3RfdXJpIjoiaHR0cHM6Ly90ZXN0LmNvbSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzdGF0ZSI6InRlc3Qtc3RhdGUtMTc3MDg0MDE0NjI4NSIsIm5vbmNlIjoidGVzdC1ub25jZS0xNzcwODQwMTQ2Mjg1IiwiZW52IjoicHJvZHVjdGlvbiIsImV4cCI6MTc3MDg0NjE2OCwiaWF0IjoxNzcwODQwMTY4LCJpc3MiOiJtb2pvYXV0aC1vaWRjIiwic3ViIjoiYXV0aG9yaXphdGlvbi1zdGF0ZSJ9.kJJSDAbm_QzyekQY-EgTRbhXIT5mWjbeVlwIxEJkVHJl3a3dw80X7fypSZhkgvjlzc-3xdr1dc_uRtLAJeIIjtzWII25Jy1IGmPkPVlFDNapxZHRkiNMofF9NvlHDf-aIroWLMP6r8rS9Le0QpWFjYjsfoQii1agkgnhTAKaw2OBtwp_gHfSyZhgpHR29TLLbqsQvbgejjNE35KWv2dchwbgYPEJC_vrYU_MIIwwwB_JAG6IX5gQyAxMAaj-eNRZdUvH7E54eenNrwbb5qQ2XvtyfRvzsqrTSiU8owUi923zC5kbfT9cF_TBRNMA45KUPZPkJVumRIke6d_GuWQWrw";

export const PRODUCTS: Product[] = [
  // SAMSUNG - MOBILE
  { id: 's1', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 1299.99, category: 'Mobile', rating: 4.9, image: 'https://images.unsplash.com/photo-1707227157502-3037922d9972?auto=format&fit=crop&q=80&w=800', description: 'Titanium frame, AI-powered 200MP camera, and integrated S Pen.' },
  { id: 's2', name: 'Samsung Galaxy Z Fold 5', brand: 'Samsung', price: 1799.99, category: 'Mobile', rating: 4.7, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800', description: 'The ultimate foldable for multitasking and productivity.' },
  { id: 's3', name: 'Samsung Galaxy A54 5G', brand: 'Samsung', price: 449.99, category: 'Mobile', rating: 4.5, image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800', description: 'Awesome design, awesome camera, awesome screen.' },
  { id: 's-extra1', name: 'Samsung Galaxy S23 FE', brand: 'Samsung', price: 599.99, category: 'Mobile', rating: 4.6, image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800', description: 'Iconic design with pro-grade camera features.' },
  
  // SAMSUNG - LAPTOPS & TABLETS
  { id: 's4', name: 'Samsung Galaxy Book4 Ultra', brand: 'Samsung', price: 2399.99, category: 'Laptop', rating: 4.8, image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?auto=format&fit=crop&q=80&w=800', description: 'Intel Core Ultra 9 with NVIDIA GeForce RTX 4070 graphics.' },
  { id: 's5', name: 'Samsung Galaxy Tab S9 Ultra', brand: 'Samsung', price: 1199.99, category: 'Tablet', rating: 4.8, image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?auto=format&fit=crop&q=80&w=800', description: 'Dynamic AMOLED 2X 14.6" display for massive creativity.' },
  { id: 's-extra2', name: 'Samsung Galaxy Tab S9 FE', brand: 'Samsung', price: 449.00, category: 'Tablet', rating: 4.4, image: 'https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?auto=format&fit=crop&q=80&w=800', description: 'S Pen included. Water and dust resistant for creators on the go.' },

  // SAMSUNG - WEARABLES & ACCESSORIES
  { id: 's6', name: 'Samsung Galaxy Watch6 Classic', brand: 'Samsung', price: 399.99, category: 'Watch', rating: 4.7, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', description: 'The return of the rotating bezel. Advanced health monitoring.' },
  { id: 's7', name: 'Samsung Galaxy Buds2 Pro', brand: 'Samsung', price: 229.99, category: 'Accessory', rating: 4.8, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800', description: '24-bit Hi-Fi audio for a studio-quality listening experience.' },

  // GOOGLE
  { id: 'g1', name: 'Google Pixel 8 Pro', brand: 'Google', price: 999.00, category: 'Mobile', rating: 4.8, image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800', description: 'The most advanced Pixel with Google Tensor G3 and Magic Editor.' },
  { id: 'g2', name: 'Google Pixel Tablet', brand: 'Google', price: 499.00, category: 'Tablet', rating: 4.4, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800', description: 'Designed by Google to be the center of your helpful home.' },
  { id: 'g3', name: 'Google Pixel Watch 2', brand: 'Google', price: 349.99, category: 'Watch', rating: 4.5, image: 'https://images.unsplash.com/photo-1508685096489-7a689bdcd046?auto=format&fit=crop&q=80&w=800', description: 'Personalized help by Google. Heart rate tracking by Fitbit.' },

  // DELL
  { id: 'd1', name: 'Dell XPS 15 9530', brand: 'Dell', price: 1899.00, category: 'Laptop', rating: 4.9, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800', description: 'Stunning 3.5K OLED touch display and power-packed performance.' },
  { id: 'd2', name: 'Alienware m18 Gaming', brand: 'Dell', price: 2499.00, category: 'Laptop', rating: 4.8, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', description: 'Colossal 18" gaming laptop with advanced cooling.' },

  // HP
  { id: 'h1', name: 'HP Spectre x360 14', brand: 'HP', price: 1499.00, category: 'Laptop', rating: 4.8, image: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?auto=format&fit=crop&q=80&w=800', description: 'Sleek 2-in-1 with Intel Evo certification and AI-camera.' },
  { id: 'h2', name: 'HP OMEN 16', brand: 'HP', price: 1299.99, category: 'Laptop', rating: 4.6, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800', description: 'Go beyond with a fast processor and intense graphics.' },

  // MICROSOFT
  { id: 'm1', name: 'Surface Laptop Studio 2', brand: 'Microsoft', price: 1999.00, category: 'Laptop', rating: 4.7, image: 'https://images.unsplash.com/photo-1593642702749-b7d2a5482bb3?auto=format&fit=crop&q=80&w=800', description: 'The most powerful Surface yet. Transition from laptop to stage to studio.' },
  { id: 'm2', name: 'Surface Pro 9', brand: 'Microsoft', price: 1099.00, category: 'Tablet', rating: 4.6, image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800', description: 'The power of a laptop with the flexibility of a tablet.' },
  { id: 'm3', name: 'Xbox Series X', brand: 'Microsoft', price: 499.99, category: 'Console', rating: 4.9, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&q=80&w=800', description: 'The fastest, most powerful Xbox ever built.' },

  // LENOVO
  { id: 'l1', name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', price: 1699.00, category: 'Laptop', rating: 4.9, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800', description: 'Ultralight weight. Ultra-heavy performance. The business gold standard.' },
  { id: 'l2', name: 'Lenovo Legion Slim 7i', brand: 'Lenovo', price: 1549.99, category: 'Laptop', rating: 4.7, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800', description: 'Sleek, powerful gaming laptop with a stunning display.' }
];

export const CONTACT_INFO = {
  name: 'Dankslite Limited',
  address: 'Obuasi Municipal, Ghana',
  emails: ['info@dankslite.com', 'sales@dankslite.com'],
  phones: ['+233 54 077 0102', '+233 50 192 4256'],
  hours: 'Open today: 09:00 am – 05:00 pm'
};

export const COLORS = {
  primary: '#7C3AED', // Violet 600
  secondary: '#F59E0B', // Amber 500
  dark: '#1F2937', // Gray 800
};
