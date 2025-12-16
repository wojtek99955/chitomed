import styled from "styled-components";
import UsersList from "../components/UsersList";
import Header from "../../../Dashboard/Header";
import Sidebar from "../../../Dashboard/Sidebar";
import { device } from "../../../../../assets/device";
import BottomNav from "../../../BottomNav";

const Section = styled.section`
  display: flex;
  padding-bottom: 4rem;
  @media ${device.laptop} {
    padding-bottom: 0;
  }
`;
const UsersPage = () => {
  return (
    <Section>
      <Sidebar />
      <Header />
      <UsersList />
      <BottomNav/>
    </Section>
  );
};

export default UsersPage;
