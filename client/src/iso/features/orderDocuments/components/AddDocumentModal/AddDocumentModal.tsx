import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, FileText, Loader2, Save } from "lucide-react";
import { useSaveOrderDocument } from "../../api/useSaveOrderDocument";
import { api } from "../../../../../api/api";
import * as S from "./Styles";

interface AddDocumentModalProps {
  orderId: string;
  onClose: () => void;
}

const AddDocumentModal = ({ orderId, onClose }: AddDocumentModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // NOWY STAN

  const { mutateAsync: saveToDb } = useSaveOrderDocument();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Funkcja pomocnicza do ustawiania pliku i nazwy
  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    if (!customName) {
      const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      setCustomName(nameWithoutExt);
    }
  };

  // Obsługa wyboru z inputa
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  // OBSŁUGA DRAG & DROP
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading) return;

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !customName || !orderId) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await api.post("/upload/upload-document", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { url } = uploadRes.data;

      await saveToDb({
        orderId,
        documentType: "OrderAttachment",
        data: {
          fileUrl: url,
          displayName: customName,
          originalName: file.name,
          fileType: file.name.split(".").pop()?.toLowerCase(),
          uploadedAt: new Date().toISOString(),
        },
      });

      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Wystąpił błąd podczas dodawania dokumentu.");
    } finally {
      setIsUploading(false);
    }
  };

  const modalContent = (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <div className="title-section">
            <Save size={20} color="#2c50dc" />
            <h3>Dodaj dokument do zamówienia</h3>
          </div>
          <S.CloseButton onClick={onClose} title="Zamknij (Esc)">
            <X size={20} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.FormGroup>
            <label>Nazwa dokumentu</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Nazwa (opcjonalnie)"
              disabled={isUploading}
            />
          </S.FormGroup>

          {/* Zaktualizowany UploadBox z obsługą zdarzeń Drag & Drop */}
          <S.UploadBox
            $hasFile={!!file}
            $isDragging={isDragging} // Przekazujemy stan do styli
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <input
              type="file"
              id="file-portal-upload"
              onChange={handleFileChange}
              hidden
              disabled={isUploading}
            />
            <label htmlFor="file-portal-upload">
              {!file ? (
                <>
                  <div className="icon-wrapper">
                    <Upload size={24} />
                  </div>
                  <span>
                    {isDragging
                      ? "Upuść plik tutaj"
                      : "Kliknij lub przeciągnij plik tutaj"}
                  </span>
                  <small>Wszystkie formaty są dozwolone</small>
                </>
              ) : (
                <>
                  <FileText size={32} color="#2c50dc" />
                  <S.FileInfo>
                    <strong>{file.name}</strong>
                    <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </S.FileInfo>
                  <span className="change-text">Zmień plik lub upuść nowy</span>
                </>
              )}
            </label>
          </S.UploadBox>
        </S.ModalBody>

        <S.ModalFooter>
          <S.SecondaryButton onClick={onClose} disabled={isUploading}>
            Anuluj
          </S.SecondaryButton>
          <S.PrimaryButton
            disabled={!file || !customName || isUploading}
            onClick={handleSubmit}>
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Przesyłanie...
              </>
            ) : (
              "Dodaj"
            )}
          </S.PrimaryButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.Overlay>
  );

  const target = document.getElementById("add-document-modal");
  return target ? createPortal(modalContent, target) : modalContent;
};

export default AddDocumentModal;
