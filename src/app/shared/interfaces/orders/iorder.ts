

export interface Iorder {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  shippingAddress?: ShippingAddress;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}