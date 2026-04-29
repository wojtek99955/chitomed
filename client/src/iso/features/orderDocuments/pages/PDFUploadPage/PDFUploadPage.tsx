import React, { useState, useRef } from "react";
import { FileText, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import * as S from "./Styles";

const PdfUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Symulacja wysyłania (tutaj dodaj swoje API)
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <S.PageWrapper>
      <S.UploadContainer>
        <S.Header>
          <h1>Prześlij plik</h1>
          <p>Wybierz dokument PDF, który chcesz dodać do systemu.</p>
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
              <span>
                Przeciągnij i upuść plik PDF tutaj lub kliknij, aby wybrać
              </span>
              <small>Maksymalny rozmiar: 10MB</small>
            </S.Placeholder>
          ) : (
            <S.FileInfo>
              <FileText size={48} color="#2c50dc" />
              <S.FileName>{file.name}</S.FileName>
              <S.FileSize>{(file.size / 1024 / 1024).toFixed(2)} MB</S.FileSize>
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
          {status === "success" && (
            <>
              <CheckCircle size={18} style={{ marginRight: "8px" }} />
              Wysłano pomyślnie
            </>
          )}
        </S.SubmitButton>

        {status === "success" && (
          <S.SuccessMessage>
            Dokument został przesłany!
          </S.SuccessMessage>
        )}
      </S.UploadContainer>
    </S.PageWrapper>
  );
};

export default PdfUploadPage;
