import styled from "styled-components";
import UsersList from "../components/UsersList";
import { device } from "../../../../../assets/device";

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
      <UsersList />
    </Section>
  );
};

export default UsersPage;
