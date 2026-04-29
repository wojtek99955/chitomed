import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../api/api";

export const useSaveOrderDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/orderDocuments", data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Odświeżamy listę dokumentów dla tego konkretnego zamówienia
      queryClient.invalidateQueries({
        queryKey: ["orderDocuments", variables.orderId],
      });
    },
  });
};
