import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../users/api/useUser";
import { useLanguage } from "../../../../../features/language/useLanguage";
import { languages } from "./languages";

const DangerZone = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  text-align: center;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  width: 100%;
  border: none;
  padding: 0.85rem 1.5rem;
  border-radius: 22px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;

  p{
    font-size: 1rem;
  }
  h3{
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.85rem 1.5rem;
  border-radius: 22px;
  cursor: pointer;
`;

interface DeleteAccountProps {
  userId: string;
}

const DeleteAccountSection = ({ userId }: DeleteAccountProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteUser, isPending } = useDeleteUser();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(userId, {
      onSuccess: () => {
        localStorage.removeItem("token"); 
        navigate("/sign-in");
      },
      onError: (error) => {
        alert("Wystąpił błąd podczas usuwania konta.");
        console.error(error);
      },
    });
  };
  const lang = useLanguage();

  return (
    <DangerZone>
      <DeleteButton onClick={() => setIsModalOpen(true)}>
        {languages.deleteBtn[lang]}
      </DeleteButton>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3> {languages.deleteQuestion[lang]}</h3>
            <p> {languages.deleteWarning[lang]}</p>
            <ButtonGroup>
              <CancelButton onClick={() => setIsModalOpen(false)}>
                {languages.cancelBtn[lang]}
              </CancelButton>
              <DeleteButton onClick={handleDelete} disabled={isPending}>
                {isPending ? languages.isLoading[lang] : languages.confirmationBtn[lang]}
              </DeleteButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </DangerZone>
  );
};

export default DeleteAccountSection;
