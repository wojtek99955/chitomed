import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 2rem;
`;

export const DropdownButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  background: white;
  border: 1px solid ${(props) => (props.$active ? "#3b82f6" : "#e2e8f0")};
  border-radius: 8px;
  color: ${(props) => (props.$active ? "#1e40af" : "#1e293b")};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  .icon-left {
    color: #3b82f6;
  }
  .icon-right {
    margin-left: auto;
    transform: ${(props) => (props.$active ? "rotate(180deg)" : "rotate(0)")};
    transition: transform 0.2s;
    color: #94a3b8;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  padding: 10px;
  min-width: 320px;
`;

export const DropdownHeader = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 10px 15px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 8px;
`;

export const LinkItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 12px 15px;
  border-radius: 8px;
  transition: background 0.15s;

  &:hover {
    background: #f1f5f9;
  }

  .link-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    overflow: hidden;

    strong {
      font-size: 0.85rem;
      color: #1e293b;
    }

    .url-preview {
      font-size: 0.75rem;
      color: #94a3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: monospace;
    }
  }
`;

export const CopyButton = styled.button<{ $copied?: boolean }>`
  background: ${(props) => (props.$copied ? "#dcfce7" : "#f1f5f9")};
  border: 1px solid ${(props) => (props.$copied ? "#86efac" : "#e2e8f0")};
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.$copied ? "#bbf7d0" : "#e2e8f0")};
    border-color: ${(props) => (props.$copied ? "#4ade80" : "#cbd5e1")};
  }
`;

export const DropdownFooter = styled.div`
  font-size: 0.7rem;
  color: #94a3b8;
  padding: 10px 15px 5px;
  text-align: center;
  border-top: 1px solid #f1f5f9;
  margin-top: 8px;
`;
