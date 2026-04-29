import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 20px;
`;

export const UploadContainer = styled.div`
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  h1 {
    font-size: 24px;
    color: #1e293b;
    margin-bottom: 8px;
  }
  p {
    color: #64748b;
    font-size: 14px;
  }
`;

export const Dropzone = styled.div<{ $active: boolean; $hasFile: boolean }>`
  border: 2px dashed ${(props) => (props.$active ? "#2c50dc" : "#e2e8f0")};
  background: ${(props) => (props.$active ? "#f0f4ff" : "#ffffff")};
  padding: 40px 20px;
  border-radius: 12px;
  text-align: center;
  cursor: ${(props) => (props.$hasFile ? "default" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    border-color: #2c50dc;
    background: #f8faff;
  }
`;

export const IconWrapper = styled.div`
  color: #2c50dc;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
`;

export const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  color: #64748b;
  span {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  small {
    font-size: 12px;
    opacity: 0.7;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const FileName = styled.span`
  font-weight: 600;
  color: #1e293b;
  margin-top: 10px;
  font-size: 14px;
`;

export const FileSize = styled.span`
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 15px;
`;

export const RemoveButton = styled.button`
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  &:hover {
    background: #fecaca;
  }
`;

export const SubmitButton = styled.button<{ $status: string }>`
  width: 100%;
  margin-top: 25px;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background: ${(props) => {
    if (props.$status === "success") return "#10b981";
    return "#2c50dc";
  }};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const SuccessMessage = styled.div`
  margin-top: 15px;
  color: #059669;
  font-size: 13px;
  text-align: center;
  font-weight: 500;
`;
