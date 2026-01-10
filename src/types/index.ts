export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  voltage: string;
  capacity: string;
  current: string;
  category: string;
  compatible: string[];
  image: string;
  manufacturer?: string;
  bodyTypeJIS?: string;
  bodyTypeEN?: string;
  technology?: string;
  polarity?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id?: number;
  phone?: string;
  telegram_id?: string;
  firstName: string;
  lastName: string;
  username?: string;
  photo_url?: string;
  cashback: number;
  role?: string;
  totalSpent?: number;
  level?: 'bronze' | 'silver' | 'gold' | 'platinum';
  purchaseCount?: number;
}

export interface Store {
  name: string;
  address: string;
  phone?: string;
}

export interface ServiceCenter {
  name: string;
  address: string;
  description: string;
}