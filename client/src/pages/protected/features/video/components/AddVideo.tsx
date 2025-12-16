import React, { useState } from "react";
import { useField } from "formik";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa"; // Dodaj ikonę dla lepszego wyglądu (np. z react-icons)
import { handleUpload } from "../api/uploadVideo";

// --- STYLE ---

// Nowy styl dla kontenera, który będzie pełnił rolę przycisku
const StyledInputWrapper = styled.div<{ $hasFile: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  min-height: 6rem; /* Utrzymanie minimalnej wysokości */
  border: 1px solid ${({ $hasFile }) => ($hasFile ? "#10b981" : "#d1d5db")};
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ $hasFile }) => ($hasFile ? "#059669" : "#3b82f6")};
  }

  &:focus-within {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

// Ukryty Input File musi mieć 100% wysokości i szerokości,
// i być przezroczysty, aby przechwytywać kliknięcia
const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2; /* Upewnienie się, że jest na wierzchu */
`;

// Styl dla wyświetlania nazwy pliku/statusu
const FileNameDisplay = styled.span<{ $hasFile: boolean }>`
  flex-grow: 1;
  color: ${({ $hasFile }) => ($hasFile ? "#10b981" : "#6b7280")};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
  text-align: center;
`;

const UploadIcon = styled(FaUpload)`
  color: #6b7280;
  font-size: 1.1rem;
  ${StyledInputWrapper}:hover & {
    color: #3b82f6;
  }
  ${StyledInputWrapper}[data-file-present="true"] & {
    color: #10b981;
  }
`;

const Container = styled.div`
  margin-bottom: 2rem;
  /* border: 1px solid red;  <-- USUWAMY W PRODUKCJI */
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.4rem;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  font-weight: 500;
`;

const Loading = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: auto;
`

const SelectVideoMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: auto;
`;

const AddVideo: React.FC<any> = ({ name, label, setVideoId }) => {
  const [field, meta, helpers] = useField(name);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isSuccess, setIsSuccess] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);

  const fileValue = field.value as File | null;
  const currentFileName = fileValue ? fileValue.name : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    // 1. Zapisujemy plik w Formiku
    helpers.setValue(file);

    // 2. Oznaczamy pole jako "dotknięte" (touched), aby uruchomić walidację
    helpers.setTouched(true);
    handleUpload(
      file!,
      setVideoId,
      setUploadPercentage,
      setIsSuccess,
      setIsLoading
    );
  };

  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>

      <StyledInputWrapper
        $hasFile={!!currentFileName}
        data-file-present={!!currentFileName}>
        <FileInput
          id={name}
          name={name}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          // Aby umożliwić ponowne wybranie tego samego pliku, input nie powinien być kontrolowany
          // value jest automatycznie puste, ale Formik próbuje je ustawić, więc go nie używamy
        />

        {/* Widoczny element UI */}
        {!currentFileName && !isLoading && (
          <FileNameDisplay $hasFile={!!currentFileName}>
            <SelectVideoMessage>
              <UploadIcon /> Wybierz plik wideo...
            </SelectVideoMessage>
          </FileNameDisplay>
        )}

        {isLoading && <Loading>Przesyłanie {uploadPercentage}%</Loading>}
        {isSuccess && <>Wideo przsesłane</>}
      </StyledInputWrapper>

      {meta.error && meta.touched ? <ErrorText>{meta.error}</ErrorText> : null}
    </Container>
  );
};

export default AddVideo;
