import styled from "styled-components";
import UsersList from "../components/UsersList";
import Header from "../../../Dashboard/Header";
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
      <Header />
      <UsersList />
      <BottomNav/>
    </Section>
  );
};

export default UsersPage;
