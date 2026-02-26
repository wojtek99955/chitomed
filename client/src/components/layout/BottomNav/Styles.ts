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
    font-size: 0.7rem;
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

export const PeopleIcon = styled(MdOutlinePeopleOutline)`
  font-size: 1.5rem;
`;

export const ContentIcon = styled(RxVideo)`
  font-size: 1.4rem;
`;
export const ProfileIcon = styled(FaRegUser)`
  font-size: 1.15rem;
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
