export interface Product {
    id: number;
    title: string;
    price: number;
  }
  
  export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
  }
  
  export type CartResponse = CartItem[];