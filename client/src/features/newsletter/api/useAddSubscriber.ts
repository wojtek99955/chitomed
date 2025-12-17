import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";

interface SubscribeData {
  email: string;
}

const subscribeToNewsletter = async (data: SubscribeData) => {
  const response = await api.post("/newsletter", data);
  return response.data;
};

export const useSubscribeToNewsletter = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      console.error("Newsletter subscription failed:", error);

      alert(
        "Failed to subscribe: " +
          (error?.response?.data?.message || error.message)
      );
    },
  });
};
