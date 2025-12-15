import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface LogoutResponse {
  message: string;
}

// 1. Stwórz nową, skonfigurowaną instancję Axios
const api = axios.create({
  baseURL: "http://localhost:5000",
  // KLUCZOWY DODATEK!
  withCredentials: true,
});

// 2. Zaktualizuj swoje mutacje, aby używały tej instancji
export const loginMutation = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>( // Użyj "api" zamiast "axios"
    "/auth/login",
    credentials
  );
  return response.data;
};

// Tak samo dla logoutMutation oraz dla getMaterials
export const logoutMutation = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>( // Użyj "api" zamiast "axios"
    "/auth/logout", 
    {} 
  );
  return response.data;
};

// Upewnij się, że getMaterials (które wywołuje błąd 403) też używa 'api'
// const getMaterials = async () => {
//     const response = await api.get('/material'); 
//     return response.data;
// }