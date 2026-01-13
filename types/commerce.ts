export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  variants?: ProductVariant[];
  category: string;
  tags?: string[];
  inStock: boolean;
  stockQuantity?: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  options: {
    [key: string]: string;
  };
  inStock: boolean;
  stockQuantity?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: Customer;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  billingAddress: Address;
}

export interface Customer {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}