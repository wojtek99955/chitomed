import { HiOutlineMenuAlt1 } from "react-icons/hi";
// import { MdOutlinePeopleOutline } from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import styled from "styled-components";
import { device } from "../../../assets/device";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { ArrowLeftRight } from "lucide-react"; // Przykładowa ikona przełączania
import { BsCart } from "react-icons/bs";

export const Container = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(4px);
  z-index: 1000;
  overflow: hidden;
  min-height: 60px; /* Ustal minimalną wysokość */
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    display: none;
  }
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 5px;
  gap: 0.5rem;
  white-space: nowrap;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 0.6rem;
    transition: all 0.2s;
    border-radius: 28px;
    width: 100%;
    height: 50px;

    span {
    }

    &[data-is-active="true"] {
      background-color: #2d50dc;
      color: white;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const HamburgerWrapper = styled.div<{ $active: boolean }>`
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#2d50dc" : "transparent")};
  transition: background-color 0.3s;
`;

export const Hamburger = styled(HiOutlineMenuAlt1)`
  font-size: 1.6rem;
  color: white;
`;

export const PeopleIcon = styled(HiOutlineUsers)`
  font-size: 1.5rem;
`;

export const ContentIcon = styled(RxVideo)`
  font-size: 1.4rem;
`;
export const ProfileIcon = styled(HiOutlineUser)`
  font-size: 1.37rem;
`;

export const LinkContent = styled.div`
  height: 39px;
  /* border:1px solid yellow; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;


export const OrdersIcon = styled(BsCart)`
  font-size: 1.4rem;
`;

export const LinkIcon = styled.div``

// --- IKONA PRZEŁĄCZANIA ---
export const ToggleIcon = styled(ArrowLeftRight)`
  width: 18px;
  height: 18px;
  color:white;
  flex-shrink: 0;
  /* Delikatny efekt dla przycisku akcji */
  transition: transform 0.3s ease;
  
  // Jeśli chcesz, aby ikona lekko "pracowała" przy hoverze na całym LinkContent
`;

// --- SEPARATOR ---
// Umieszczamy go między przełącznikiem a resztą linków
export const Separator = styled.div`
  width: 1px;           // Szerokość kreski (pionowa)
  height: 24px;         // Wysokość kreski
  background-color: #e5e7eb; // Jasny szary kolor (border-color)
  margin: 0 8px;        // Odstęp od elementów po bokach
  align-self: center;   // Wyśrodkowanie w pionie wewnątrz flexa
  
  // Na wypadek, gdyby Twój LinksContainer układał elementy jeden pod drugim:
  @media (max-width: 400px) {
    width: 100%;
    height: 1px;
    margin: 8px 0;
  }
`;

// Opcjonalnie: poprawka dla LinkContent, aby lepiej wyglądał jako przycisk
// (Dodaj to jeśli LinkContent nie ma jeszcze cursor pointer)
// export const LinkContent = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
//   user-select: none;
//   
//   &:hover ${ToggleIcon} {
//     transform: rotate(180deg); // Fajny efekt przy przełączaniu
//   }
// `;