import styled from "styled-components";
import { device } from "../../../assets/device";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

export const Container = styled.header<any>`
  padding: 0px 0;
  position: fixed;
  width: calc(100% - 2rem);
  left: 0;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 1rem;
  background-color: white;
  z-index: 100;
  border-bottom: 1px solid #e9eaed;
  @media ${device.laptop} {
    padding: 10px 0;
    width: ${({ isAdmin }) =>
      isAdmin ? "calc(100% - 17rem)" : "calc(100% - 2rem)"};
    left: ${({ isAdmin }) => (isAdmin ? "15rem" : "0")};
    height: 160px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubHeader = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  @media ${device.laptop} {
    font-size: 1.8rem;
  }
`;
export const UserIcon = styled(FaRegUser)`
  font-size: 1.2rem;
  display: block;
  color: white;
`;

export const LogoutBtn = styled.button`
  border-radius: 33px;
  background-color: black;
  color: white;
  border: none;
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 200ms;
  display: none;
  @media ${device.laptop} {
    display: block;
  }

  &:hover {
    transform: scale(1.02);
    background-color: #262626;
  }
  &:active {
    transform: scale(0.95);
  }
`;
export const LogoutIconContainer = styled.div`
  background-color: black;
  padding: 0.9rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 200ms;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.02);
    background-color: #262626;
  }
  &:active {
    transform: scale(0.95);
  }
  @media ${device.laptop} {
    display: none;
  }
`;
export const LogoutIcon = styled(HiOutlineLogout)`
  font-size: 1.2rem;
  color: white;
`;

export const Profile = styled.div`
  background-color: black;
  margin-right: 0.7rem;
  padding: 0.9rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    transform: scale(1.02);
    background-color: #262626;
  }
  &:active {
    transform: scale(0.95);
  }
  @media ${device.laptop} {
    margin-right: 1rem;
  }
`;

export const FitlersWrapper = styled.div`
  align-items: center;
  display: none;
  gap: 1rem;
  @media ${device.laptop} {
    display: flex;
  }
`;

export const LogoWrapper = styled.div``;