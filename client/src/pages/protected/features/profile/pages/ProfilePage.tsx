import styled from "styled-components";
import { useAuthData } from "../../../../../features/auth/hooks/useAuthData";
import { FaUser } from "react-icons/fa";
import { device } from "../../../../../assets/device";
import { useEffect } from "react";

const Container = styled.div<any>`
  top: 130px;
  position: relative;
  padding: 2rem 1rem;
  @media ${device.laptop} {
    top: 180.59px;
    width: ${({ isAdmin }) => (isAdmin ? "calc(100% - 15rem)" : "100%")};
    left: ${({ isAdmin }) => (isAdmin ? "15rem" : "0")};
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const ProfileContainer = styled.div<any>`
  padding: 2rem 1rem;
  display: flex;
  margin: auto;
  justify-content: center;
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
  color: white;
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { email, createdAt, role } = useAuthData();

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("pl-PL")
    : "No data";

  const isAdmin = role === "admin";
  return (
    <Container isAdmin={isAdmin}>
      <Wrapper>
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
    </Container>
  );
};

export default ProfilePage;
