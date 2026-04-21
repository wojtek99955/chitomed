import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../api/api";

export const useDeleteOrderDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await api.delete(`/orderDocuments/${orderId}`);
      return response.data;
    },
    // Po udanym usunięciu, odświeżamy zapytania o dokumenty
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderDocuments"] });
    },
    onError: (error: any) => {
      console.error("Błąd podczas usuwania dokumentu:", error);
    },
  });
};
