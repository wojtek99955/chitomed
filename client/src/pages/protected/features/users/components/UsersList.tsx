import styled from "styled-components";
import { FaExclamationTriangle, FaEnvelope, FaTrashAlt } from "react-icons/fa";
import { useUsers, type User, useDeleteUser } from "../api/useUser";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { device } from "../../../../../assets/device";
import SortDateUsers from "./SortDate";
import SearchUser from "./SearchUser";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";

const PROTECTED_EMAIL = "office@chitomed.com";

// ────────────────────────────────────────────────

const Container = styled.div`
  padding: 2rem 1rem;
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
  white-space: nowrap;

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

const DeleteButton = styled.button<{ $isProtected?: boolean }>`
  background: ${({ $isProtected }) => ($isProtected ? "#9ca3af" : "#ef4444")};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: ${({ $isProtected }) => ($isProtected ? "not-allowed" : "pointer")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${({ $isProtected }) => ($isProtected ? "#9ca3af" : "#dc2626")};
    transform: ${({ $isProtected }) => ($isProtected ? "none" : "scale(1.05)")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1rem;
  @media ${device.laptop} {
    display: none;
  }
`;

// ────────────────────────────────────────────────

const UsersList = () => {
  const { data, isLoading, isError, error } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const users: User[] = Array.isArray(data) ? data : [];
  const [userToDelete, setUserToDelete] = useState<{
    id: string;
    email: string;
  } | null>(null);

  const confirmDelete = () => {
    if (!userToDelete) return;

    // dodatkowa ochrona na wypadek błędu w UI
    if (userToDelete.email.toLowerCase() === PROTECTED_EMAIL.toLowerCase()) {
      toast.error("Konto administracyjne nie może być usunięte");
      setUserToDelete(null);
      return;
    }

    deleteUser(userToDelete.id, {
      onSuccess: () => {
        toast.success(`Użytkownik ${userToDelete.email} został usunięty`);
        setUserToDelete(null);
      },
      onError: (err: any) => {
        toast.error(err?.message || "Błąd usuwania");
        setUserToDelete(null);
      },
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

  const isProtectedAccount = (email: string) =>
    email.toLowerCase() === PROTECTED_EMAIL.toLowerCase();

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
            {users.map((user, index) => {
              const protectedAcc = isProtectedAccount(user.email);

              return (
                <TableRow key={user._id}>
                  <TableData>{index + 1}</TableData>
                  <TableData>
                    <EmailWrapper>
                      <EmailIcon />
                      {user.email}
                      {protectedAcc && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "#d97706",
                            fontWeight: 600,
                            marginLeft: "0.5rem",
                          }}>
                          ADMIN
                        </span>
                      )}
                    </EmailWrapper>
                  </TableData>
                  <TableData>{formatDate(user.createdAt)}</TableData>
                  <ActionCell>
                    <DeleteButton
                      $isProtected={protectedAcc}
                      onClick={() => {
                        if (protectedAcc) {
                          toast.error(
                            "To konto administracyjne – nie można go usunąć",
                          );
                          return;
                        }
                        setUserToDelete({ id: user._id, email: user.email });
                      }}
                      disabled={isDeleting || protectedAcc}
                      title={
                        protectedAcc
                          ? "Konto administracyjne – chronione"
                          : "Usuń użytkownika"
                      }>
                      <FaTrashAlt />
                    </DeleteButton>
                  </ActionCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container>
      <FiltersWrapper>
        <SortDateUsers />
        <SearchUser />
      </FiltersWrapper>

      {renderContent()}

      <DeleteConfirmModal
        isOpen={!!userToDelete}
        email={userToDelete?.email || ""}
        isLoading={isDeleting}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
};

export default UsersList;
