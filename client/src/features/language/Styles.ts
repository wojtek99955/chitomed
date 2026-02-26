import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  border-right: 1px solid #e9eaed;
  margin-left: auto;
  margin-right: 1rem;
  padding-right: 1rem;
`;
export const Container = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const CurrentLanguage = styled.div<{ showList: boolean }>`
  padding: 0.7rem 1.8rem;
  cursor: pointer;
  font-weight: 500;
  color: black;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.showList &&
    `
    color: #34186E;
    background-color: white;
    border-bottom:none;
  `}
`;

export const LanguagesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  z-index: 0;
  width: 100%;
  overflow: hidden;
  border: 1px solid #e9eaed;
  top: 100%;
`;

export const Language = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 200ms;
  color: #58585a;
  &:hover {
    color: #34186e;
    background-color: #f4f5fa;
  }
  &:active {
    background-color: #e7eaf5;
  }
`;
