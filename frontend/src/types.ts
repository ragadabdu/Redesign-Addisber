export interface Product {
  id: string;
  name: string;
  category: 'Electronics' | 'Fashion' | 'Home & Kitchen' | 'Groceries' | 'Beauty & Personal Care';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'NEW' | 'SALE' | 'HOT' | 'TRENDING';
  isFlashSale?: boolean;
  description: string;
  specs?: Record<string, string>;
  inStock: boolean;
  stockCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  colSpan?: string;
  rowSpan?: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  fullName: string;
  phone: string;
  city: string;
  subcity: string;
  paymentMethod: string;
  status: 'Processing' | 'Dispatched' | 'Delivered';
}
export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  subcity?: string;
}
