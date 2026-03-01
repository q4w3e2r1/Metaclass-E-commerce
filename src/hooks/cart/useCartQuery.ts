import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, removeFromCart } from "@/api/cart";

export const useCart = () => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    addToCart: addMutation.mutate,
    removeFromCart: removeMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
};