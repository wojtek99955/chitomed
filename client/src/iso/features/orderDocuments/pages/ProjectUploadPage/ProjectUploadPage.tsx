import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  FileArchive, // Ikona dla .zip
  Box, // Ikona dla .stl
  X,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import * as S from "./Styles";
import { useOrderDocuments } from "../../api/useOrderDocuments";
import { useSaveOrderDocument } from "../../api/useSaveOrderDocument";
import { api } from "../../../../../api/api";

const ProjectUploadPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: documents, isLoading, isError } = useOrderDocuments(id);
  const { mutateAsync: saveOrderDocument } = useSaveOrderDocument();

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasError =
    isError ||
    (documents as any)?.isError ||
    !documents ||
    (Array.isArray(documents) && documents.length === 0);

  // Funkcja walidująca - dopuszcza tylko ZIP i STL
  const validateFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    // Lista dozwolonych rozszerzeń
    const allowedExtensions = ["zip", "stl"];
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();

    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      setStatus("idle");
    } else {
      alert(
        "Niedozwolony format pliku. Proszę wybrać plik .zip (paczka danych) lub .stl (model 3D).",
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateFile(e.target.files?.[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    validateFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !id) return;

    setStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await api.post("/upload/upload-document", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { url, fileName } = uploadRes.data;

      // Zapisujemy do bazy z typem 3DModels/Data
      await saveOrderDocument({
        orderId: id,
        documentType: "3Dproject",
        data: {
          fileUrl: url,
          originalName: fileName,
          fileType: fileName.split(".").pop()?.toLowerCase(),
        },
      });

      setStatus("success");
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("error");
      alert("Błąd podczas przesyłania. Spróbuj ponownie.");
    }
  };

  const renderFileIcon = () => {
    const ext = file?.name.split(".").pop()?.toLowerCase();
    // Pokazujemy ikonę paczki dla zip, lub kostki dla stl
    if (ext === "zip") return <FileArchive size={48} color="#2c50dc" />;
    if (ext === "stl") return <Box size={48} color="#2c50dc" />;
    // Defaultowo (w razie błędu) ikona paczki
    return <FileArchive size={48} color="#2c50dc" />;
  };

  // Logika ładowania i błędów (bez zmian)
  if (isLoading) {
    return (
      <S.PageWrapper>
        <S.StatusCenter>
          <Loader2 size={40} className="animate-spin" color="#2c50dc" />
          <p>Weryfikacja zamówienia...</p>
        </S.StatusCenter>
      </S.PageWrapper>
    );
  }

  if (hasError) {
    return (
      <S.PageWrapper>
        <S.ErrorCard>
          <AlertTriangle size={48} color="#dc2626" />
          <h2>Błędny link</h2>
          <p>Podany identyfikator jest nieprawidłowy.</p>
        </S.ErrorCard>
      </S.PageWrapper>
    );
  }

  return (
    <S.PageWrapper>
      <S.UploadContainer>
        <S.Header>
          <S.Badge>ID Zamówienia: {id}</S.Badge>
          <h1>Prześlij plik</h1>
          <p>Wybierz model STL lub paczkę ZIP.</p>
        </S.Header>

        <S.Dropzone
          $active={isDragging}
          $hasFile={!!file}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() =>
            !file && status !== "success" && fileInputRef.current?.click()
          }>
          {/* USUNIĘTO .pdf Z accept */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".zip,.stl"
            hidden
          />

          {status === "success" ? (
            <S.FileInfo>
              <CheckCircle size={48} color="#10b981" />
              <S.FileName>Przesłano pomyślnie!</S.FileName>
              <p style={{ fontSize: "12px", color: "#64748b" }}>{file?.name}</p>
            </S.FileInfo>
          ) : !file ? (
            <S.Placeholder>
              <S.IconWrapper>
                {/* Zmiana ikony placeholder na paczkę archiwum */}
                <FileArchive size={40} color="#2c50dc" />
              </S.IconWrapper>
              <span>Wybierz plik lub przeciągnij</span>
              <small>Akceptowane: .ZIP (DICOM) lub .STL (Modele)</small>
            </S.Placeholder>
          ) : (
            <S.FileInfo>
              {renderFileIcon()}
              <S.FileName>{file.name}</S.FileName>
              <S.RemoveButton
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}>
                <X size={16} /> Usuń
              </S.RemoveButton>
            </S.FileInfo>
          )}
        </S.Dropzone>

        {status !== "success" && (
          <S.SubmitButton
            disabled={!file || status === "uploading"}
            onClick={handleUpload}
            $status={status}>
            {status === "uploading"
              ? "Trwa przesyłanie..."
              : "Wyślij"}
          </S.SubmitButton>
        )}

        {status === "success" && (
          <S.SuccessMessage>
            Plik został pomyślnie przesłany i dołączony do bazy.
          </S.SuccessMessage>
        )}
      </S.UploadContainer>
    </S.PageWrapper>
  );
};

export default ProjectUploadPage;
