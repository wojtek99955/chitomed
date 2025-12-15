import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Material {
  _id: string;
  title: string;
  type: 'video' | 'text';
  text?: string;
  videoUrl?: string;
  createdAt: string;
}

const getMaterials = async (
  materialId?: string
): Promise<Material | Material[]> => {
  let url = "http://localhost:5000/material";
console.log(materialId, " id")
  if (materialId) {
    url = `${url}?id=${materialId}`;
  }
console.log(url, "urll")
  const response = await axios.get(url);
  return response.data;
};

export const useMaterials = (materialId?: string) => {
  const queryKey = materialId ? ["materials", materialId] : ["materials"];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getMaterials(materialId),
    enabled: materialId ? !!materialId : true,
    staleTime: 5 * 60 * 1000,
  });
};