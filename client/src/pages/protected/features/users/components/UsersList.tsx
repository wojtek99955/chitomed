import styled from "styled-components";
import { FaSpinner, FaExclamationTriangle, FaEnvelope } from "react-icons/fa";
import { useUsers, type User } from "../api/useUser";

const Container = styled.div`
  padding: 2rem;
  width: 100%;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  height: calc(100vh - 4.5rem);
  position: relative;
  top: 4.5rem;
`;

const Title = styled.h2`
  color: #1f2937;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
`;

const LoadingBox = styled(InfoBox)`
  background-color: #e0f7fa;
  color: #00bcd4;
  svg {
    animation: spin 1s linear infinite;
    margin-right: 0.8rem;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorBox = styled(InfoBox)`
  background-color: #fee2e2;
  color: #ef4444;
  border: 1px solid #fca5a5;
  svg {
    margin-right: 0.8rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 8px;
  overflow: hidden; /* Aby zaokrąglenia działały na rogach */
`;

const TableHead = styled.thead`
  background-color: #10b981; /* Zielony dla nagłówka */
  color: white;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
  &:hover {
    background-color: #e5e7eb;
  }
`;

const TableHeader = styled.th`
  padding: 1rem 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TableData = styled.td`
  padding: 1rem 1.5rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;

  &:first-child {
    font-weight: 600;
    width: 50px;
  }
  &:nth-child(2) {
    display: flex;
    align-items: center;
  }
`;

const EmailIcon = styled(FaEnvelope)`
  margin-right: 0.5rem;
  color: #3b82f6;
`;

const UsersList = () => {
  const { data, isLoading, isError, error } = useUsers();

  const users: User[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <Container>
        <Title>Lista Użytkowników</Title>
        <LoadingBox>
          <FaSpinner /> Ładowanie danych użytkowników...
        </LoadingBox>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Title>Lista Użytkowników</Title>
        <ErrorBox>
          <FaExclamationTriangle /> Wystąpił błąd podczas ładowania danych.
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}>
            {error?.message || "Nieznany błąd."}
          </p>
        </ErrorBox>
      </Container>
    );
  }

  if (users.length === 0) {
    return (
      <Container>
        <Title>Lista Użytkowników</Title>
        <InfoBox style={{ backgroundColor: "#fffbe0", color: "#a16207" }}>
          <FaExclamationTriangle /> Brak użytkowników do wyświetlenia.
        </InfoBox>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Lista Użytkowników ({users.length})</Title>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Lp.</TableHeader>
            <TableHeader>Adres E-mail</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableData>{index + 1}</TableData>
              <TableData>
                <EmailIcon />
                {user.email}
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersList;
