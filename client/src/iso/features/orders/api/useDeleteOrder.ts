import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../api/api";

// Funkcja API do usuwania
const deleteOrderReq = async (id: string): Promise<void> => {
  await api.delete(`/orders/${id}`);
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrderReq(id),
    // Po udanym usunięciu odświeżamy listę zamówień
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    // Opcjonalnie: obsługa błędów
    onError: (error: any) => {
      console.error(
        "Błąd podczas usuwania zamówienia:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
