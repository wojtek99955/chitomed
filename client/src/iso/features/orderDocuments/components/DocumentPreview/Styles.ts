import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { device } from "../../../../../assets/device";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiVectorThreeDuotone } from "react-icons/pi";
import { BsExclamationCircle } from "react-icons/bs";

export const PreviewContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  &:hover {
    border: 1px solid #2d50dc;
  }
`;

export const PreviewHeader = styled.div`
  padding: 15px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${device.laptop} {
    padding: 24px;
  }

  h3 {
    margin: 4px 0 0 0;
    font-size: 1.1rem;
    font-weight: 400;
  }
`;

export const DateWrapper = styled.div`
  text-align: right;

  span {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
`;

export const Label = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  color: #999;
  letter-spacing: 1;
  margin-bottom: 3px;
`;

export const EmptyPreview = styled.div`
  padding: 40px;
  text-align: center;
  color: #bbb;
  border: 2px dashed #eee;
  border-radius: 8px;
  font-style: italic;
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const DeleteIconButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition:
    background 0.2s,
    transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fee2e2;
    transform: scale(1.1);
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  font-size: 1rem;
  color: #ff2b2b;
`;

export const Icon = styled.div`
  background-color: #e0f2fe;
  width: 3rem;
  aspect-ratio: 1/1;
  margin-right: 0.5rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const DocumentIcon = styled(IoDocumentTextOutline)`
  font-size: 2rem;
  color: #2d50dc;
`;

export const ThreeDIcon = styled(PiVectorThreeDuotone)`
  font-size: 2rem;
  color: #2d50dc;
`;

export const IncidentIcon = styled(BsExclamationCircle)`
  font-size: 2rem;
  color: #2d50dc;
`;
