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

export const loginMutation = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "http://localhost:5000/auth/login",
    credentials
  ); // dostosuj ścieżkę jeśli inna
  return response.data;
};
