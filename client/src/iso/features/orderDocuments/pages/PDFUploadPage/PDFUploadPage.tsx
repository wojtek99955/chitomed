import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom"; // Dodajemy useParams
import {
  FileText,
  Upload,
  X,
  // CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import * as S from "./Styles";
import { useOrderDocuments } from "../../api/useOrderDocuments";

const PdfUploadPage = () => {
  const { id } = useParams<{ id: string }>(); // Pobieramy ID z URL

  // 1. Sprawdzamy czy dokument (id) istnieje w bazie
  const { data: documents, isLoading, isError } = useOrderDocuments(id);
console.log(documents," documents")
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
  // LOGIKA LOADINGU
  if (isLoading) {
    return (
      <S.PageWrapper>
        <S.StatusCenter>
          <Loader2 size={40} className="animate-spin" color="#2c50dc" />
        </S.StatusCenter>
      </S.PageWrapper>
    );
  }

  // LOGIKA BŁĘDNEGO ID (Jeśli API nie zwróci danych lub rzuci błąd)
  // Zakładamy, że documents to tablica - sprawdzamy czy przyszła i czy nie jest pusta
  if (hasError) {
    return (
      <S.PageWrapper>
        <S.ErrorCard>
          <AlertTriangle size={48} color="#dc2626" />
          <h2>Błędny link lub brak zamówienia</h2>
          <p>
            Przepraszamy, ale podany identyfikator zamówienia nie istnieje w
            naszym systemie lub wygasł.
          </p>
        </S.ErrorCard>
      </S.PageWrapper>
    );
  }

  // FUNKCJE FORMULARZA (bez zmian)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile?: File) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setStatus("idle");
    } else if (selectedFile) {
      alert("Proszę wybrać plik w formacie PDF.");
    }
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
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    // Tutaj Twoje API do wysyłki PDF
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // RENDEREOWANIE WŁAŚCIWEGO FORMULARZA (Tylko jeśli ID jest poprawne)
  return (
    <S.PageWrapper>
      <S.UploadContainer>
        <S.Header>
          <S.Badge>ID: {id}</S.Badge>
          <h1>Prześlij plik PDF</h1>
          <p>Prześlij podpisany dokument w formacie pdf.</p>
        </S.Header>

        <S.Dropzone
          $active={isDragging}
          $hasFile={!!file}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !file && fileInputRef.current?.click()}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            hidden
          />

          {!file ? (
            <S.Placeholder>
              <S.IconWrapper>
                <Upload size={40} />
              </S.IconWrapper>
              <span>Przeciągnij PDF tutaj lub kliknij</span>
            </S.Placeholder>
          ) : (
            <S.FileInfo>
              <FileText size={48} color="#2c50dc" />
              <S.FileName>{file.name}</S.FileName>
              <S.RemoveButton
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}>
                <X size={16} /> Usuń
              </S.RemoveButton>
            </S.FileInfo>
          )}
        </S.Dropzone>

        <S.SubmitButton
          disabled={!file || status === "uploading"}
          onClick={handleUpload}
          $status={status}>
          {status === "idle" && "Wyślij dokument"}
          {status === "uploading" && "Przesyłanie..."}
          {status === "success" && "Wysłano pomyślnie ✅"}
        </S.SubmitButton>
      </S.UploadContainer>
    </S.PageWrapper>
  );
};

export default PdfUploadPage;
