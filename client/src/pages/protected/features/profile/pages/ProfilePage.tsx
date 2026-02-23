import styled from "styled-components";
import { useAuthData } from "../../../../../features/auth/useAuthData";
import Header from "../../../Dashboard/Header";
import Sidebar from "../../../Dashboard/Sidebar";
import BottomNav from "../../../BottomNav";
import { FaUser } from "react-icons/fa";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
`;

const ProfileContainer = styled.div`
  height: calc(100vh - 180.59px);
  top: 180.59px;
  position: relative;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Email = styled.div`
  font-size: 1.3rem;
  margin: auto;
  font-weight: 500;
  text-align: center; // Dodane dla lepszego wyśrodkowania
`;

// Nowy styl dla daty dołączenia
const Joined = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 0.5rem;
  text-align: center;
`;

const UserIcon = styled(FaUser)`
  font-size: 3rem;
  color:white;
`;

const IconContainer = styled.div`
  padding: 1rem;
  border-radius: 50%;
  background-color: #2d50dc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  aspect-ratio: 1/1;
  margin: auto;
  margin-bottom: 1.5rem;
`;

const UserData = styled.div``;

const ProfilePage = () => {
  const { email, createdAt } = useAuthData();

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("pl-PL")
    : "No data";

  return (
    <Container>
      <Header />
      <Wrapper>
        <Sidebar />
        <ProfileContainer>
          <UserData>
            <IconContainer>
              <UserIcon />
            </IconContainer>
            <Email>{email}</Email>
            <Joined>Joined: {formattedDate}</Joined>
          </UserData>
        </ProfileContainer>
      </Wrapper>
      <BottomNav />
    </Container>
  );
};

export default ProfilePage;
