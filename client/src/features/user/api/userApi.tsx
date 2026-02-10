import { api } from "../../../api/api";

export interface signUpCredentials {
  email: string;
}

export interface DeleteUserResponse {
  message: string;
  deletedUserId?: string;
  deletedEmail?: string;
}

export const signUp = async (credentials: signUpCredentials): Promise<any> => {
  const response = await api.post<any>("/user", credentials);
  return response.data;
};
