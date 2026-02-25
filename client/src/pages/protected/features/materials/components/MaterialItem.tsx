import styled from "styled-components";
import type { Material } from "../api/useMaterial";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import EditMaterial from "./EditMaterial";
import { AnimatePresence } from "framer-motion";
import { useDeleteMaterial } from "../api/useDeleteMaterial";
import DeleteConfirmation from "./DeleteConfirmation";
import { useAuthData } from "../../../../../features/auth/useAuthData";
import EditMaterial from "./EditMaterial";
import { useGetCategories } from "../../categories/api/useGetCategories";
import { useLanguage } from "../../../../../features/auth/hooks/useLanguage";

const MaterialItemContainer = styled.div`
  background: white;
  background-color: #f8f8fa;
  position: relative;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(1);
  }
`;

const ContentInfo = styled.div`
  flex-grow: 1;
  padding: 1rem;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: black;
  font-weight: 600;
`;

const Category = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  background-color: white;
  color: #2d50dc;
  text-transform: uppercase;
  max-width: 150px;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const IconButton = styled.button`
  border: none;
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  transition: color 0.2s;
  aspect-ratio: 1/1;
  background-color: #2d50dc;
  padding: 0.2rem;
  border-radius: 50%;
  width: 1.8rem;
  transition: all 200ms;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Cover = styled.div`
  border-radius: 6px;
  width: 100%;
  height: 12rem;
  background-image: url("https://chitomed-files.b-cdn.net/background-gradient-tiny.webp");
  background-size: cover;
  overflow: hidden; /* Opcjonalnie, żeby nic nie wystawało */
  user-select: none;
  img {
    width: 100%;
    height: 100%; /* TO JEST KLUCZOWE */
    object-fit: contain;
    user-select: none;
    pointer-events: none;
  }
`;

const MaterialItem: React.FC<{ material: Material }> = ({ material }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const lang = useLanguage();
  const { mutate } = useDeleteMaterial();
  const { role } = useAuthData();
  const navigate = useNavigate();

  const { data: categoriesData = [] } = useGetCategories();

  const getCategoryDisplayName = () => {
    const category = categoriesData.find(
      (cat: any) => cat._id === material.categoryId,
    );

    if (!category) return lang === "pl" ? "Brak kategorii" : "No category";

    if (typeof category.name === "string") return category.name;

    return (
      category.name?.[lang as "pl" | "en"] ||
      category.name?.["pl"] ||
      "Category"
    );
  };

  const categoryName = getCategoryDisplayName();

  const handleEdit = (e: any) => {
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    mutate(material._id);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const openMaterial = () => {
    navigate(`/material/${material._id}`);
  };

  return (
    <>
      <MaterialItemContainer onClick={openMaterial}>
        {/* Tutaj renderujemy już czysty string, nie obiekt */}
        <Category>{categoryName}</Category>

        <Cover>
          <img src="https://chitomed-files.b-cdn.net/Vector%20(1).svg" alt="" />
        </Cover>

        <ContentInfo>
          <Title>{material.title}</Title>
        </ContentInfo>

        {role === "admin" && (
          <Actions>
            <IconButton onClick={handleEdit} aria-label="Edit Material">
              <FaEdit />
            </IconButton>
            <IconButton
              className="delete-btn"
              onClick={handleDeleteClick}
              aria-label="Delete Material">
              <FaTrashAlt />
            </IconButton>
          </Actions>
        )}
      </MaterialItemContainer>

      <AnimatePresence>
        {isEditOpen && (
          <EditMaterial setIsOpen={setIsEditOpen} material={material} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <DeleteConfirmation
            itemName={material.title}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MaterialItem;