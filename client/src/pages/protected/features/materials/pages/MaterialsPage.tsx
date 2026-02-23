import styled from "styled-components";
import MaterialsList from "../components/MaterialsList";
import { useAuthData } from "../../../../../features/auth/useAuthData";
import { Link } from "react-router-dom";
import { device } from "../../../../../assets/device";
// import { FaPlus } from "react-icons/fa";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  position: relative;
  width: calc(100% - 15rem);
  left: 15rem;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;
export const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: fit-content;
  padding: .7rem 2em;
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
const MaterialsPage = () => {
  const { role } = useAuthData();

  return (
    <Container>
      {role === "admin" && (
        <AddButton to={"/add-material"}>
          {/* <FaPlus />  */}
          Add
        </AddButton>
      )}
        <MaterialsList />
    </Container>
  );
};

export default MaterialsPage;
