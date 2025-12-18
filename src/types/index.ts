// Interface for Product data from API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Interface for Cart Items (Product + quantity)
export interface CartItem extends Product {
  quantity: number;
}

// Interface for Filter state
export interface Filters {
  category: string;
  maxPrice: number;
}