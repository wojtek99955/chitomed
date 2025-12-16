import styled from "styled-components";
import UsersList from "../components/UsersList";
import Header from "../../../Dashboard/Header";
import Sidebar from "../../../Dashboard/Sidebar";

const Section = styled.section`
  display: flex;
`;
const UsersPage = () => {
  return (
    <Section>
      <Sidebar />
      <Header />
      <UsersList />
    </Section>
  );
};

export default UsersPage;
