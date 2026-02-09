import styled from "styled-components";
import { useAuthData } from "../../../../../features/auth/useAuthData";
import Header from "../../../Dashboard/Header";
import Sidebar from "../../../Dashboard/Sidebar";
import BottomNav from "../../../BottomNav";
import { FaUser } from "react-icons/fa";

const Container = styled.div``;

const Wrapper = styled.div`
display: flex;
`

const ProfileContainer = styled.div`
  height: calc(100vh - 4.5rem);
  top: 4.5rem;
  position: relative;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f3f4f6;
`;

const Email = styled.div`
font-size: 1.3rem;
margin: auto;
font-weight: 500;
`

const UserIcon = styled(FaUser)`
font-size: 3rem;
`;

const IconContainer = styled.div`
  padding: 1rem;
  border-radius: 50%;
  background-color: #ccd0d9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  aspect-ratio: 1/1;
  margin: auto;
  margin-bottom: 1.5rem;
`;

const UserData = styled.div`

`

const ProfilePage = () => {
  const { email } = useAuthData();
  return (
    <Container>
      <Header />
      <Wrapper>
        <Sidebar />
        <ProfileContainer><UserData><IconContainer><UserIcon/></IconContainer><Email>{email}</Email></UserData></ProfileContainer>
      </Wrapper>
      <BottomNav/>
    </Container>
  );
};

export default ProfilePage;
