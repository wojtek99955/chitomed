import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../../../../assets/device";

export const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 100% 1fr;
  gap: 1rem;
  width: 100%;
  display: flex;
  position: relative;
  top: 8rem;
  padding: 1rem;

  @media ${device.laptop} {
    top: 10rem;
    flex-direction: row;
    width: calc(100% - 15rem);
    left: 15rem;
    width: calc(100% - 15rem);
    left: 15rem;
  }
`;
export const BackBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: fit-content;
  padding: 0.7rem 1.5rem;
  color: white;
  background-color: #d6dcf8;
  background-color: #2c50dc;
  border: none;
  border-radius: 33px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #2c50dc;
  transition: all 0.2s;
  margin-bottom: 2rem;
  color: #000;
  color: white;
  text-decoration: none;

  &:hover {
    background: #2c50dc;
    color: white;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.01);
  }
`;

export const BackIcon = styled(IoChevronBackOutline)`
  font-size: 1.4rem;
  color: white;
`;

export const UnknownDoc = styled.div`


`

// Mapa kolorów dla różnych typów dokumentów
const badgeColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  CyberboneOrderForm: {
    bg: "#eef2ff",
    text: "#4338ca",
    border: "#c7d2fe",
  },
  NovaOssProductionForm: {
    bg: "#f5f3ff",
    text: "#6d28d9",
    border: "#ddd6fe",
  },
  "medical-event": {
    bg: "#fff1f2",
    text: "#be123c",
    border: "#fecdd3",
  },
  default: {
    bg: "#f8fafc",
    text: "#475569",
    border: "#e2e8f0",
  },
};

export const DocBadge = styled.span<{ $type?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  /* Dynamiczne przypisanie kolorów */
  background-color: ${({ $type }) =>
    badgeColors[$type as string]?.bg || badgeColors.default.bg};
  color: ${({ $type }) =>
    badgeColors[$type as string]?.text || badgeColors.default.text};
  border: 1px solid
    ${({ $type }) =>
      badgeColors[$type as string]?.border || badgeColors.default.border};

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: currentColor; // Kropka w kolorze tekstu
  }
`;

// Dodatkowo styl dla kontenera nagłówka, żeby przycisk "Wróć" i Badge były w jednej linii
export const Header = styled.header`

  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
`;

export const ContentCard = styled.div`
width: 100%;
max-width: 700px;
margin: auto;
`

export const Date = styled.div`

`