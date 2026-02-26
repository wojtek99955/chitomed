import { ErrorMessage, Field, Form } from "formik";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../../assets/device";

export const Section = styled.div`
  width: 95%;
  color: white;
  margin: auto;
  @media ${device.tablet} {
    width: 400px;
    padding: 2rem;
  }
  @media ${device.laptop} {
    width: 550px;
    padding: 2rem;
  }
  h2 {
    color: black;
    font-weight: 400;
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.2rem;
  font-size: 1.9rem;
`;

export const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const Input = styled(Field)<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.9rem 1rem;
  margin-top: 0.3rem;
  border-radius: 33px;
  margin-bottom: 0.8rem;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#DCDCE1")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#2D50DC")};
  }
  &::placeholder {
    text-align: center;
  }
`;

export const ErrorText = styled(ErrorMessage)`
  color: #ff8181;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #f3f4f6;
  padding: 0.8rem;
  border-radius: 8px;
`;

export const Button = styled.button<{ $loading?: boolean; $sent?: boolean }>`
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 33px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: 0.2s;
  font-weight: 400;

  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const SuccessMessage = styled.div`
  color: #009a00;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: rgba(0, 100, 0, 0.11);
  padding: 0.8rem;
  border-radius: 8px;
`;

export const BackLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #5069d4;
  font-weight: 500;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
    color: #3955ce;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 50%;
  margin: auto;
  margin-bottom: 6rem;
`;