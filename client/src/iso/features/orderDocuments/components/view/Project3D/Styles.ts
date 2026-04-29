import styled from "styled-components";

export const ProjectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-top: 10px;
`;

export const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconWrapper = styled.div`
  background: white;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const FileName = styled.h4`
  margin: 0;
  font-size: 14px;
  color: #1e293b;
  font-weight: 600;
`;

export const FileDetails = styled.p`
  margin: 0;
  font-size: 12px;
  color: #64748b;
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #2c50dc;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1e3bb3;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 80, 220, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;
