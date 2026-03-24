import styled, { keyframes } from "styled-components";
import { device } from "../../../../../assets/device";

export const FormContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 13px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  @media ${device.tablet} {
    padding: 40px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #2c50dc;
  margin-bottom: 30px;
  padding-bottom: 10px;

  h1 {
    font-size: 24px;
    color: #2c50dc;
    margin: 0;
  }
`;

export const SectionTitle = styled.h2`
  background: #f4f7f9;
  padding: 10px 15px;
  font-size: 18px;
  border-left: 5px solid #2c50dc;
  margin: 25px 0 15px 0;
  color: black;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 14px;
  }

  input,
  textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
      border-color: #2c50dc;
      outline: none;
      box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
    }
    &::placeholder {
      font-weight: 300;
      opacity: 0.7;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

// export const DropzoneContainer = styled.div<any>`
//   border: 2px dashed ${(props) => (props.$active ? "#0056b3" : "#ccc")};
//   background: ${(props) => (props.$active ? "#f0f7ff" : "#fafafa")};
//   padding: 30px;
//   text-align: center;
//   border-radius: 8px;
//   cursor: pointer;
//   margin-top: 10px;
//   transition: all 0.2s ease;

//   &:hover {
//     border-color: #2c50dc;
//   }
//   p {
//     margin: 0;
//     color: ${(props) => (props.$hasFile ? "#28a745" : "#666")};
//     font-weight: ${(props) => (props.$hasFile ? "bold" : "normal")};
//   }
// `;

export const ErrorText = styled.div`
  color: #d9534f;
  font-size: 12px;
  margin-top: 5px;
`;

export const InfoBox = styled.div`
  background: #fff9e6;
  border: 1px solid #ffeeba;
  padding: 15px;
  margin: 20px 0;
  font-size: 13px;
  border-radius: 4px;
  h4 {
    margin-top: 0;
    color: #856404;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  ul {
    padding-left: 20px;
  }
  li {
    font-size: 1rem;
  }
`;

export const SubmitButton = styled.button`
  background-color: #2c50dc;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  &:hover {
    background-color: #2c50dc;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export const TwoInputsGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
  div {
    width: 100%;
  }
`;

export const WarningBox = styled.div`
  background: #fff5f5;
  border: 1px solid #feb2b2;
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;

  p {
    margin: 0;
    color: #c53030;
    font-weight: bold;
    font-size: 14px;
    font-size: 1rem;
  }
`;

export const InstructionsSection = styled.div`
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 25px;

  h4 {
    margin-bottom: 10px;
    border-bottom: 1px solid #edf2f7;
    padding-bottom: 5px;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 15px;
  }

  li {
    margin-bottom: 8px;
  }
`;

export const ProcedureHighlight = styled.div`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  font-style: italic;
  font-size: 13px;

  p {
    margin: 5px 0;
    font-size: 1rem;
    display: flex;
    gap: 10px;
    &::before {
      content: "•";
      color: #2c50dc;
      font-weight: bold;
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;

  h2 {
    color: #2e7d32;
    margin-bottom: 15px;
    font-size: 24px;
  }

  p {
    color: #555;
    max-width: 500px;
    line-height: 1.6;
    margin-bottom: 30px;
  }
`;

export const SuccessIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
`;

export const SuccessButton = styled.button`
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #004494;
  }
`;


export const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const RemoveFileBtn = styled.button`
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #ef4444;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #fecaca;
  }
`;

export const DropzoneContainer = styled.div<{
  $active: boolean;
  $hasFile: boolean;
  $isUploading?: boolean;
}>`
  /* ... reszta twoich styli ... */
  border: 2px dashed ${(props) => (props.$active ? "#0056b3" : "#ccc")};
  background: ${(props) => (props.$active ? "#f0f7ff" : "#fafafa")};
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;

  cursor: ${(props) =>
    props.$isUploading || props.$hasFile ? "default" : "pointer"};
  opacity: ${(props) => (props.$isUploading ? 0.8 : 1)};
`;

export const FileDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const UploadStatusWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 8px;
  }
`;

export const ProgressBar = styled.div<{ $width: number }>`
  width: 100%;
  max-width: 300px;
  height: 10px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${(props) => props.$width}%;
    background: #2c50dc;
    /* Płynne przejście paska */
    transition: width 0.4s cubic-bezier(0.1, 0.7, 1, 0.1);
  }
`;