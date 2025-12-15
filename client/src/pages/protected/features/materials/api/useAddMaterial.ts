
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface MaterialData {
  title: string;
  type: "video" | "text";
  text?: string;
  videoUrl?: string;
}

const addMaterial = async (data: MaterialData) => {
  // Replace with your actual backend URL
  const response = await axios.post("http://localhost:5000/material", data);
  return response.data;
};

export const useAddMaterial = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMaterial,
    onSuccess: () => {
      // Invalidate the materials list query to automatically refresh the list
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
