import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../../api/api";

export interface Material {
  _id: string;
  title: string;
  type: 'video' | 'text';
  text?: string;
  video?: string;
  createdAt: string;
}

const getMaterials = async (
  materialId?: string
): Promise<Material | Material[]> => {
  let url = "/material";
  if (materialId) {
    url = `${url}?id=${materialId}`;
  }
  const response = await api.get(url);
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