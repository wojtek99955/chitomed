import styled from "styled-components";
import type { Material } from "../api/useMaterial";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaBook, FaVideo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditMaterial from "./EditMaterial";
import { AnimatePresence } from "framer-motion";
import { useDeleteMaterial } from "../api/useDeleteMaterial";
import DeleteConfirmation from "./DeleteConfirmation";

const MaterialItemContainer = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    transform: scale(1.01);
  }
  &:active {
    transform: scale(1);
  }
`;

const ContentInfo = styled.div`
  flex-grow: 1;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
`;

const Metadata = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TypeBadge = styled.span<{ type: "video" | "text" }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-weight: 600;
  color: white;
  background-color: ${({ type }) => (type === "video" ? "#ef4444" : "#059669")};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const IconButton = styled.button`
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 1.1rem;
  transition: color 0.2s;
  background-color: green;
  aspect-ratio: 1/1;
  background-color: #f3f4f6;
  padding: 0.2rem;
  border-radius: 6px;
  width: 2.2rem;
  transition: all 200ms;
  &:hover {
    background-color: #dde0e5;
  }
`;

const MaterialItem: React.FC<{ material: Material }> = ({ material }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleEdit = (e: any) => {
    e.stopPropagation();
    setIsEditOpen(true);
    console.log(`Editing material: ${material._id}`);
  };
  const { mutate } = useDeleteMaterial();

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

  let navigate = useNavigate();

  const openMaterial = () => {
    navigate(`/material/${material._id}`);
  };

  return (
    <>
      <MaterialItemContainer onClick={openMaterial}>
        <ContentInfo>
          <Title>{material.title}</Title>
          <Metadata>
            <TypeBadge type={material.type}>
              {material.type === "video" ? <FaVideo /> : <FaBook />}
              {material.type.toUpperCase()}
            </TypeBadge>
            <span>
              Created: {new Date(material.createdAt).toLocaleDateString()}
            </span>
          </Metadata>
        </ContentInfo>
        <Actions>
          <IconButton onClick={handleEdit} aria-label="Edit Material">
            <FaEdit />
          </IconButton>
          <IconButton
            className="delete-btn"
            onClick={(e) => handleDeleteClick(e)}
            aria-label="Delete Material">
            <FaTrashAlt />
          </IconButton>
        </Actions>
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
