import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";

export interface OrderDocument {
  _id: string;
  orderId: string;
  documentType: string;
  data: any;
  createdAt: string;
}

export const useOrderDocuments = (id: string | undefined) => {
  return useQuery<OrderDocument[]>({
    queryKey: ["orderDocuments", id],
    queryFn: async () => {
      const response = await api.get(`/orderDocuments/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
