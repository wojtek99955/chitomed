import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../api/api";

export const useSaveOrderDocument = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/orderDocuments", data);
      return response.data;
    },
  });
};
