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
  top: 10rem;
  padding: 1rem;

  @media ${device.laptop} {
    flex-direction: row;
    width: calc(100% - 15rem);
    left: 15rem;
    width: calc(100% - 15rem);
    left: 15rem;
  }
`
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
