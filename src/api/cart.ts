import { api } from "./axios";
import type { CartResponse } from "@/types/cart";

export const getCart = async () => {
    const { data } = await api.get<CartResponse>("/cart");
    return data;
  };
  
  export const addToCart = async (productId: number) => {
    const { data } = await api.post("/cart/add", {
      product: productId,
      quantity: 1,
    });
    return data;
  };
  
  export const removeFromCart = async (productId: number) => {
    const { data } = await api.post("/cart/remove", {
      product: productId,
      quantity: 1,
    });
    return data;
  };