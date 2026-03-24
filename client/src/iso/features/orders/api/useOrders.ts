import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";

export interface Order {
  _id: string;
  orderNumber?: string;
  patientId: string;
  doctorName: string;
  doctorEmail?: string;
  status:
    | "nowe"
    | "projektowanie"
    | "akceptacja"
    | "produkcja"
    | "wysłano"
    | "zakończone"
    | "incydent";
  createdAt: string;
  updatedAt: string;
}

const getOrders = async (orderId?: string): Promise<Order | Order[]> => {
  const url = orderId ? `/orders?id=${orderId}` : "/orders";
  const response = await api.get(url);
  return response.data;
};

export const useOrders = (orderId?: string) => {
  return useQuery({
    queryKey: orderId ? ["orders", orderId] : ["orders"],
    queryFn: () => getOrders(orderId),
    enabled: true,
    staleTime: 2 * 60 * 1000,
  });
};