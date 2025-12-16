import { api } from "../../../api/api";

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


export const loginMutation = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>( // Użyj "api" zamiast "axios"
    "/auth/login",
    credentials
  );
  return response.data;
};

export const logoutMutation = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>( 
    "/auth/logout", 
    {} 
  );
  return response.data;
};

