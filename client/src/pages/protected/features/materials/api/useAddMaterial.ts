
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../../api/api";

export interface MaterialData {
  title: string;
  text?: string;
  videoUrl?: string;
}

const addMaterial = async (data: MaterialData) => {
  const response = await api.post("/material", data);
  return response.data;
};

export const useAddMaterial = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      onSuccessCallback();
    },
    onError: (error) => {
      console.error("Material creation failed:", error);
      alert(
        "Failed to add material: " + (error as any).response?.data?.message ||
          error.message
      );
    },
  });
};
