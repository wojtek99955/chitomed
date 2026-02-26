import { FaRegUser } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { RxVideo } from "react-icons/rx";
import styled from "styled-components";
import { device } from "../../../assets/device";

export const Container = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 1000;
  overflow: hidden;
  height: 65px; /* Stała wysokość kontenera głównego */
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
  padding: 0 6px;
  gap: 0.2rem;
  white-space: nowrap;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  height: 100%;

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.65rem;
    transition: all 0.2s;
    padding: 4px;
    border-radius: 28px;
    flex: 1;
    height: 54px;

    span {
      margin-top: 2px;
      font-weight: 500;
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
  min-width: 48px;
  height: 48px;
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

export const PeopleIcon = styled(MdOutlinePeopleOutline)`
  font-size: 1.8rem;
`;

export const ContentIcon = styled(RxVideo)`
  font-size: 1.5rem;
`;

export const ProfileIcon = styled(FaRegUser)`
  font-size: 1.25rem;
`;
