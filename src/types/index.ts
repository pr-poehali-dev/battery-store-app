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
}

export interface Store {
  name: string;
  address: string;
}

export interface ServiceCenter {
  name: string;
  address: string;
  description: string;
}