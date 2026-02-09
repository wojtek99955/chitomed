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

const MaterialItemContainer = styled.div`
  background: white;
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
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
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.8rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
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

const Cover = styled.div`
  border: 1px solid #d5dbf4;
  border-radius: 6px;
  width: 100%;
  height: 10rem;
  background-image: url("https://chitomed-files.b-cdn.net/background-gradient-tiny.webp");
  background-size: cover;
  overflow: hidden; /* Opcjonalnie, żeby nic nie wystawało */

  img {
    width: 100%;
    height: 100%; /* TO JEST KLUCZOWE */
    object-fit: contain;
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
  const { role } = useAuthData();

  return (
    <>
      <MaterialItemContainer onClick={openMaterial}>
        <ContentInfo>
          <Title>{material.title}</Title>
          <Metadata>
            <span>
              Created: {new Date(material.createdAt).toLocaleDateString()}
            </span>
          </Metadata>
        </ContentInfo>

        <Cover>
          <img src="https://chitomed-files.b-cdn.net/Vector%20(1).svg" alt="" />
        </Cover>

        {role === "admin" && (
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
        )}
      </MaterialItemContainer>
      <AnimatePresence>
        {isEditOpen && (
          <></>
          // <EditMaterial setIsOpen={setIsEditOpen} material={material} />
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
