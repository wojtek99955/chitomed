import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface EditMaterialData {
  _id: string;
  title: string;
  type: "video" | "text";
  text?: string;
  videoUrl?: string;
}

const editMaterial = async (data: EditMaterialData) => {
    console.log(data, "   iddd")
  const response = await axios.patch(
    `http://localhost:5000/material/${data._id}`,
    data
  );
  return response.data;
};

export const useEditMaterial = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      onSuccessCallback();
    },
    onError: (error) => {
      console.error("Material edit failed:", error);
      alert(
        "Nie udało się zapisać zmian: " +
          ((error as any).response?.data?.message || (error as any).message)
      );
    },
  });
};
