import styled from "styled-components";
import MaterialsList from "../components/MaterialsList";
import { useAuthData } from "../../../../../features/auth/useAuthData";
import Categories from "../../categories/components/Categories";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const Container = styled.div`
  padding-top: 2rem;
`;
export const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  color: white;
  background-color: #d6dcf8;
  background-color: #2c50dc;
  border: none;
  border-radius: 8px;
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
const MaterialsPage = () => {
  const { role } = useAuthData();

  return (
    <Container>
      {role === "admin" && (
        <AddButton to={"/add-material"}>
          <FaPlus /> Dodaj materiał
        </AddButton>
      )}
      <Categories />
      <MaterialsList />
    </Container>
  );
};

export default MaterialsPage;
