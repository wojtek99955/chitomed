import { useState } from "react";
import { PlusCircle } from "lucide-react";
import AddDocumentModal from "../AddDocumentModal/AddDocumentModal";
import { useParams } from "react-router-dom";
import * as S from "./Styles"
const AddDocument = () => {
    const {id:orderId} = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* 2. Przycisk wyzwalający */}
      <S.Button
        onClick={openModal}
        style={{

        }}>
        <PlusCircle size={18} />
        Dodaj dokument
      </S.Button>

      {/* 3. Logiczne renderowanie Modala */}
      {/* Mimo że jest tutaj w kodzie, dzięki createPortal wyrenderuje się w #modal-root */}
      {isModalOpen && (
        <AddDocumentModal orderId={orderId!} onClose={closeModal} />
      )}
    </>
  );
};

export default AddDocument;
