import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../../api/api";

// Aktualizacja interfejsu zgodnie z danymi z backendu
export interface User {
  _id: string;
  email: string;
  createdAt:string;
  role: string; // Dodajemy pole role
  // Dodaj inne pola, jeśli backend je zwraca (np. createdAt)
}

/**
 * Funkcja asynchroniczna pobierająca dane użytkownika (pojedynczego lub listę).
 *
 * WAŻNE ZAŁOŻENIE:
 * 1. POBIERANIE LISTY (brak userId): Endpoint to /user, zwraca { users: [u1, u2, ...] }
 * 2. POBIERANIE POJEDYNCZEGO (z userId): Endpoint to /user?id={userId}, zwraca { users: [u1] }
 *
 * @param userId - Opcjonalne ID użytkownika.
 * @returns Promise, który zwraca pojedynczy obiekt User lub tablicę User[].
 */
const getUsers = async (userId: string | undefined): Promise<User | User[]> => {
  let url = "/user";

  // Jeśli podano ID, dodajemy je jako parametr zapytania
  if (userId) {
    url = `${url}?id=${userId}`;
  }

  const response = await api.get(url);

  // Struktura odpowiedzi z backendu: { count: number, message: string, users: User[] }
  const data = response.data;

  if (!data || !Array.isArray(data.users)) {
    // Rzucamy błąd, jeśli dane nie mają oczekiwanej struktury
    throw new Error(
      "Nieprawidłowy format danych z serwera. Oczekiwano pola 'users'."
    );
  }

  const users: User[] = data.users.map((item: any) => ({
    _id: item._id,
    email: item.email,
    role: item.role,
    createdAt: item.createdAt,

    // Dodaj inne mapowane pola, jeśli są w interfejsie User
  }));

  if (userId) {
    // Jeśli szukaliśmy pojedynczego użytkownika, zwracamy pierwszy element tablicy.
    // Jeśli lista jest pusta, rzucamy błąd (lub zwracamy undefined, zależnie od potrzeb).
    const singleUser = users[0];
    if (!singleUser) {
      throw new Error(`Użytkownik o ID ${userId} nie został znaleziony.`);
    }
    return singleUser;
  } else {
    // Jeśli szukaliśmy listy, zwracamy całą tablicę.
    return users;
  }
};

export const useUsers = (userId?: string) => {
  // Klucz zapytania, który różnicuje cache
  const queryKey = userId ? ["users", userId] : ["users"];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getUsers(userId),
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
};
