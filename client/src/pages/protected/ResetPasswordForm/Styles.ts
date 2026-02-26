import { Field } from "formik";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 450px;
  margin: 4rem auto;
  padding: 2.5rem;
  border-radius: 16px;
  color: white;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Input = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#ccc")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#5069d41")};
  }
`;

export const Button = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background: #5069d4;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
`;

export const ErrorText = styled.div`
  color: #ff8181;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

export const SuccessMessage = styled.div`
  color: #009a00;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: rgba(0, 100, 0, 0.11);
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;
