import styled from "styled-components";
import MaterialsList from "../../components/MaterialsList";
import { useAuthData } from "../../../../../../features/auth/hooks/useAuthData";
import { Link } from "react-router-dom";
import { device } from "../../../../../../assets/device";
import Categories from "../../../categories/components/Categories";
import Searchbar from "../../../Searchbar/Searchbar";
import { languages } from "./languages";
import { useLanguage } from "../../../../../../features/language/useLanguage";
const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  position: relative;

  @media ${device.laptop} {
    flex-direction: row;
    width: calc(100% - 15rem);
    left: 15rem;
    width: ${({ isAdmin }) => (isAdmin ? "calc(100% - 15rem)" : "100%")};
    left: ${({ isAdmin }) => (isAdmin ? "15rem" : "0")};
  }
`;
export const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: fit-content;
  padding: 0.7rem 2em;
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

const Filters = styled.div`
display: flex;
gap: .5rem;
@media ${device.laptop}{
  display: none;
}
`
const MaterialsPage = () => {
  const { role } = useAuthData();
  const lang = useLanguage();

  const isAdmin = role === "admin";

  return (
    <Container isAdmin={isAdmin}>
      {isAdmin && (
        <AddButton to={"/add-material"}>
          {/* <FaPlus />  */}
          {languages.addBtn[lang]}
        </AddButton>
      )}
      <Filters>
        <Categories />
        <Searchbar/>
      </Filters>
      <MaterialsList />
    </Container>
  );
};

export default MaterialsPage;
