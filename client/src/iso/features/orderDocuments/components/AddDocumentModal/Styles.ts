import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  animation: ${slideUp} 0.3s ease-out;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-section {
    display: flex;
    align-items: center;
    gap: 12px;
    h3 {
      margin: 0;
      font-size: 18px;
      color: #0f172a;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  &:hover {
    color: #0f172a;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #475569;
    margin-bottom: 8px;
  }
  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    &:focus {
      outline: none;
      border-color: #2c50dc;
      box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
    }
  }
`;

export const UploadBox = styled.div<{
  $hasFile: boolean;
  $isDragging: boolean;
}>`
  border: 2px dashed
    ${(props) =>
      props.$isDragging ? "#2c50dc" : props.$hasFile ? "#2c50dc" : "#cbd5e1"};
  background-color: ${(props) =>
    props.$isDragging ? "#f0f4ff" : props.$hasFile ? "#f8faff" : "#ffffff"};
  transform: ${(props) => (props.$isDragging ? "scale(1.02)" : "scale(1)")};
  border-radius: 14px;
  transition: all 0.2s ease-in-out;

  label {
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    text-align: center;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    color: #64748b;
  }

  span {
    font-size: 14px;
    color: #1e293b;
    font-weight: 500;
  }
  small {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }

  .change-text {
    margin-top: 12px;
    color: #2c50dc;
    font-size: 13px;
    text-decoration: underline;
  }
`;

export const FileInfo = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  strong {
    font-size: 14px;
    color: #0f172a;
    word-break: break-all;
  }
  span {
    font-size: 12px;
    color: #64748b;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  background: #f8fafc;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const PrimaryButton = styled.button`
  background: #2c50dc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  background: white;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #f1f5f9;
  }
`;
