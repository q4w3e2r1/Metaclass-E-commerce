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

  const handleAddToCart = async (productId: number) => {
    return addMutation.mutateAsync(productId);
  };

  const handleRemoveFromCart = async (productId: number) => {
    return removeMutation.mutateAsync(productId);
  };

  return {
    cart: cartQuery.data,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    isLoading: cartQuery.isLoading,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isProcessing: addMutation.isPending || removeMutation.isPending,
  };
};