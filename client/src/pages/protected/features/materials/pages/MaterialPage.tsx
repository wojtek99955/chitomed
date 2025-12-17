import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FaExclamationTriangle,
  FaSpinner,
  FaBook,
  FaVideo,
} from "react-icons/fa";
import { useMaterials, type Material } from "../api/useMaterial";
import Header from "../../../Dashboard/Header";
import { FaChevronCircleLeft } from "react-icons/fa";
import Sidebar from "../../../Dashboard/Sidebar";
import BottomNav from "../../../BottomNav";
import { device } from "../../../../../assets/device";

const Container = styled.div`
  padding: 1rem;
  background-color: #f3f4f6;
  width: 100%;
  padding-top: 2.5rem;
  height: calc(100vh - 4.5rem);
  overflow-y: scroll;
  position: relative;
  top: 4.5rem;
  padding-bottom: 6rem;
  @media ${device.laptop} {
    padding-bottom: 0;
  }
`;

const Back = styled(Link)`
  display: block;
  background-color: #11b981;
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: all 200ms;
  &:hover {
    background-color: #069668;
  }
`;

const BackIcon = styled(FaChevronCircleLeft)`
  font-size: 1.2rem;
  color: white;
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  max-width: 900px;
  margin: auto;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  border-radius: 8px;
  font-size: 1.2rem;
  margin-top: 2rem;
  font-weight: 600;
`;

const LoadingBox = styled(InfoBox)`
  background-color: #e0f2f1;
  color: #0d9488;
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

const TypeBadge = styled.span<{ type: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  background-color: ${({ type }) => (type === "film" ? "#dc2626" : "#10b981")};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1f2937;
`;

const ContentStyle = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4b5563;
  margin-top: 1rem;

  h3 {
    color: #1f2937;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Section = styled.div`
  display: flex;
`;

const MaterialPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useMaterials(id);
  const libraryId = "561988";
  const material = data as Material | undefined;
  let content; // Zmienna do przechowywania warunkowo generowanego JSX

  // 1. LOADING STATE
  if (isLoading) {
    content = (
      <LoadingBox>
        <FaSpinner /> Loading Material...
      </LoadingBox>
    );
  }

  // 2. ERROR STATE
  else if (isError) {
    content = (
      <ErrorBox>
        <FaExclamationTriangle /> Error: Failed to fetch material.
        <p style={{ marginTop: "0.5rem", fontSize: "1rem", fontWeight: 500 }}>
          {error.message || "Unknown error occurred."}
        </p>
      </ErrorBox>
    );
  }

  // 3. NOT FOUND STATE
  else if (!material) {
    content = (
      <ErrorBox>
        <FaExclamationTriangle /> Material not found. Invalid ID or item was
        deleted.
      </ErrorBox>
    );
  }

  // 4. SUCCESS STATE (Renderowanie danych)
  else {
    content = (
      <ContentWrapper>
        <Title>{material.title}</Title>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#9ca3af",
          }}>
          Created on: {new Date(material.createdAt).toLocaleDateString()}
        </p>
        <br />
        <TypeBadge type={material.type}>
          {material.type === "video" ? <FaVideo /> : <FaBook />}
          {material.type === "video" ? "VIDEO CONTENT" : "TEXT ARTICLE"}
        </TypeBadge>

        <ContentStyle>
          {/* Wyświetlanie tekstu */}
          {material.type === "text" && material.text && (
            <>
              <h3>Article Content:</h3>
              <p>{material.text}</p>
            </>
          )}

          {/* Wyświetlanie linku wideo */}
          {material.type === "video" && material.video && (
            <>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 0,
                  paddingBottom: "56.25%", // Stosunek 16:9 dla responsywności
                  marginBottom: "1.5rem",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}>
                <iframe
                  src={`https://iframe.mediadelivery.net/embed/${libraryId}/${material.video}`}
                  title={material.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}></iframe>
              </div>
            </>
          )}
        </ContentStyle>
      </ContentWrapper>
    );
  }

  return (
    <>
      <Header />
      <Section>
        <Sidebar />
        <Container>
          <Back to="/dashboard">
            <BackIcon /> Back
          </Back>
          {content}
        </Container>
      </Section>
      <BottomNav/>
    </>
  );
};

export default MaterialPage;
