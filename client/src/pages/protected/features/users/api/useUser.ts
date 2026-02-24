import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../../api/api";
import { useEffect, useState } from "react";

export interface User {
  _id: string;
  email: string;
  createdAt: string;
  role: string;
}

/**
 * Funkcja pobierająca dane z API
 */
const getUsers = async (
  userId?: string,
  email?: string,
  sort?: string,
): Promise<User | User[]> => {
  let url = "/user";
  const params = new URLSearchParams();

  if (userId) {
    params.append("id", userId);
  } else {
    if (email) params.append("email", email);
    if (sort) params.append("sort", sort);
  }

  const queryString = params.toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  const response = await api.get(finalUrl);
  const data = response.data;

  if (!data || !Array.isArray(data.users)) {
    throw new Error("Nieprawidłowy format danych z serwera.");
  }

  const users: User[] = data.users.map((item: any) => ({
    _id: item._id,
    email: item.email,
    role: item.role,
    createdAt: item.createdAt,
  }));

  return userId ? users[0] : users;
};

/**
 * Hook useUsers - obsługuje reaktywne sortowanie i wyszukiwanie
 */
export const useUsers = (userId?: string) => {
  const queryClient = useQueryClient();

  // Pobieramy stany początkowe z localStorage
  const [sort, setSort] = useState(
    () => localStorage.getItem("users_sort_direction") || "newest",
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("users_search_query") || "",
  );

  // Klucz zapytania reaguje na zmiany obu stanów
  const queryKey = userId ? ["users", userId] : ["users", { email, sort }];

  const query = useQuery({
    queryKey: queryKey,
    queryFn: () => getUsers(userId, email, sort),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const handleStorageChange = () => {
      // Przy każdej zmianie w localStorage aktualizujemy lokalne stany hooka
      const newSort = localStorage.getItem("users_sort_direction") || "newest";
      const newEmail = localStorage.getItem("users_search_query") || "";

      setSort(newSort);
      setEmail(newEmail);

      // Odświeżamy dane w React Query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    window.addEventListener("storage_change", handleStorageChange);
    return () =>
      window.removeEventListener("storage_change", handleStorageChange);
  }, [queryClient]);

  return query;
};

/**
 * Hook do usuwania użytkownika
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await api.delete(`/user/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
