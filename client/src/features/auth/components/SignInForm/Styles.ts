import { Field } from "formik";
import { Loader2 } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../../../assets/device";

export const FormContainer = styled.div`
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

export const Input = styled(Field)<{ $error?: boolean }>`
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

export const Button = styled.button<{ $loading?: boolean }>`
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 33px;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: 0.2s;
  font-weight: 400;
  position: relative;
  color: ${({ $loading }) => ($loading ? "transparent" : "white")};

  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const ErrorText = styled.div`
  color: #ff8181;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #f3f4f6;
  padding: 0.8rem;
  border-radius: 8px;
`;

export const ServerError = styled.div`
  color: #ff8181;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #f3f4f6;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const SuccessMessage = styled.div`
  color: #a0ffa0;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #00aa0030;
  padding: 0.8rem;
  border-radius: 8px;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 50%;
  margin: auto;
  margin-bottom: 6rem;
`;

export const SignUpLink = styled(Link)`
  display: flex;
  margin: auto;
  text-align: center;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
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

export const ForgotPasswordLink = styled(Link)`
  display: block;
  margin: 1rem 0 0.5rem auto;
  text-align: right;
  color: #000000;
  text-decoration: none;
  text-align: center;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

export const Arrow = styled(FaArrowRight)`
  font-size: 1rem;
  margin-left: 0.5rem;
`;

export const Spinner = styled(Loader2)`
  width: 27px;
  height: 27px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: spin 1s linear infinite;
  z-index: 1000;
  color: white !important;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const EyeIcon = styled.div`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #2d50dc;
  }

  svg {
    font-size: 1.2rem;
  }
`;
