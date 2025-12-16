import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../../api/api";

const deleteMaterial = async (id: string) => {
  const response = await api.delete(`/material/${id}`);
  return response.data;
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMaterial,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },

    onError: (error) => {
      console.error("Material deletion failed:", error);
      alert(
        "Failed to delete material: " +
          (error as any).response?.data?.message || error.message
      );
    },
  });
};
