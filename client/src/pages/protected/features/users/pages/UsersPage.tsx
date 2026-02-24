import styled from "styled-components";
import UsersList from "../components/UsersList";
import { device } from "../../../../../assets/device";
import { useEffect } from "react";

const Section = styled.section`
  display: flex;
  padding-bottom: 4rem;
  @media ${device.laptop} {
    padding-bottom: 0;
  }
`;
const UsersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Section>
      <UsersList />
    </Section>
  );
};

export default UsersPage;
