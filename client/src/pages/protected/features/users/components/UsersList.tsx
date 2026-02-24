import styled from "styled-components";
import { FaExclamationTriangle, FaEnvelope, FaTrashAlt } from "react-icons/fa";
import { useUsers, type User, useDeleteUser } from "../api/useUser";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { device } from "../../../../../assets/device";

// --- STYLED COMPONENTS ---

const Container = styled.div`
  padding: 2rem;
  width: 100vw;
  height: calc(100vh - 4.5rem);
  position: relative;
  top: 7.5rem;
  @media ${device.laptop} {
    width: calc(100% - 15rem);
    left: 15rem;
    top: 4.5rem;
  }
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

const ErrorBox = styled(InfoBox)`
  background-color: #fee2e2;
  color: #ef4444;
  border: 1px solid #fca5a5;
  flex-direction: column;
  gap: 0.5rem;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  overflow-x: auto;
  /* border: 1px solid #f1f5f9; */

  @media ${device.laptop} {
    overflow-x: hidden;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 2px solid #f1f5f9;
  background-color: #f8fafc;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableHeader = styled.th`
  padding: 1rem 1.5rem;
  font-weight: 700;
  text-align: left;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #64748b;
`;

const TableData = styled.td`
  padding: 1rem 1.5rem;
  color: #374151;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;

  &:first-child {
    font-weight: 600;
    width: 60px;
  }
`;

const EmailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const EmailIcon = styled(FaEnvelope)`
  color: #3b82f6;
  flex-shrink: 0;
`;

const ActionCell = styled(TableData)`
  text-align: center;
  width: 80px;
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// --- COMPONENT LOGIC ---

const UsersList = () => {
  const { data, isLoading, isError, error } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const users: User[] = Array.isArray(data) ? data : [];

  const handleDelete = (userId: string, email: string) => {
    if (!window.confirm(`Na pewno chcesz usunąć użytkownika ${email}?`)) return;

    deleteUser(userId, {
      onSuccess: () => toast.success(`Użytkownik ${email} został usunięty`),
      onError: (err: any) => toast.error(err?.message || "Błąd usuwania"),
    });
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return "—";
    try {
      return format(new Date(date), "dd.MM.yyyy HH:mm");
    } catch {
      return "—";
    }
  };

  // Helper do renderowania zawartości głównej
  const renderContent = () => {
    if (isLoading) return <Loader />;

    if (isError) {
      const is404 = (error as any)?.response?.status === 404;
      if (is404) {
        return (
          <InfoBox style={{ backgroundColor: "#fffbe0", color: "#a16207" }}>
            <FaExclamationTriangle style={{ marginRight: "0.5rem" }} />
            Nie znaleziono użytkownika spełniającego kryteria.
          </InfoBox>
        );
      }
      return (
        <ErrorBox>
          <FaExclamationTriangle />
          <span>Błąd: {error?.message || "Nie udało się pobrać danych."}</span>
        </ErrorBox>
      );
    }

    if (users.length === 0) {
      return (
        <InfoBox style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}>
          Lista użytkowników jest pusta.
        </InfoBox>
      );
    }

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Lp.</TableHeader>
              <TableHeader>Adres E-mail</TableHeader>
              <TableHeader>Dołączył</TableHeader>
              <TableHeader style={{ textAlign: "center" }}>Akcja</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableData>{index + 1}</TableData>
                <TableData>
                  <EmailWrapper>
                    <EmailIcon />
                    {user.email}
                  </EmailWrapper>
                </TableData>
                <TableData>{formatDate(user.createdAt)}</TableData>
                <ActionCell>
                  <DeleteButton
                    onClick={() => handleDelete(user._id, user.email)}
                    disabled={isDeleting}
                    title="Usuń użytkownika">
                    <FaTrashAlt />
                  </DeleteButton>
                </ActionCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container>
      <Title>
        Lista użytkowników{" "}
        {!isLoading && users.length > 0 && `(${users.length})`}
      </Title>
      {renderContent()}
    </Container>
  );
};

export default UsersList;
