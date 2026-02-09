import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../../api/api";

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

const getCategories = async (categoryId?: string): Promise<Category[]> => {
  // Zawsze obiecujemy tablicę
  let url = "/categories";
  if (categoryId) {
    url = `${url}?id=${categoryId}`;
  }

  const response = await api.get(url);

  // Jeśli backend zwrócił pojedynczy obiekt zamiast tablicy, zapakuj go w tablicę
  const data = response.data;
  return Array.isArray(data) ? data : [data];
};

export const useGetCategories = (categoryId?: string) => {
  const queryKey = categoryId ? ["categories", categoryId] : ["categories"];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getCategories(categoryId),
    enabled: categoryId ? !!categoryId : true,
    staleTime: 5 * 60 * 1000,
  });
};
