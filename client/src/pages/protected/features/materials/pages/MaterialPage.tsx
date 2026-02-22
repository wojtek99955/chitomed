import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FaExclamationTriangle,
  FaSpinner,
  // FaChevronCircleLeft,
} from "react-icons/fa";
import { useMaterials, type Material } from "../api/useMaterial";
import Header from "../../../Dashboard/Header";
import BottomNav from "../../../BottomNav";
import { device } from "../../../../../assets/device";
import { useEffect, useState, useMemo } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import Sidebar from "../../../Dashboard/Sidebar";

// GŁÓWNY WRAPPER: zajmuje całą wysokość ekranu i blokuje scroll na body
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* Sidebar nie będzie uciekać */
`;

// KONTENER NA TREŚĆ (Header + Content): zajmuje resztę szerokości i ma własny scroll
const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-start;
  grid-template-columns: 1fr 800px 1fr;
  gap: 1rem;
  position: relative;
  height: calc(100vh - 160px);
  top: 160px;
  overflow-y: auto; /* To sprawia, że tylko treść się przewija */

  @media ${device.laptop} {
    padding: 2rem 1rem;
    padding-bottom: 5rem; /* Miejsce na BottomNav na mobile/laptop */
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: black;
  color: white;
  padding: 0.7rem 2.2rem;
  border-radius: 33px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
  width: fit-content;
  transition: all 200ms;

  &:hover {
    /* background: #2563eb; */
    background-color: #262626;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.95);
  }
`;

// const BackIcon = styled(FaChevronCircleLeft)`
//   font-size: 1.3rem;
// `;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 12px;
  margin: 0 auto 1rem auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.75rem 0;
  line-height: 1.2;
`;

const Meta = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0 0 2rem 0;
  text-align: right;
`;

const ArticleContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;

  iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    border: none;
    margin: 2rem 0;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: block;
  }

  h1,
  h2,
  h3,
  h4 {
    color: #111827;
    margin: 2.2rem 0 1rem;
    font-weight: 700;
    line-height: 1.3;
  }

  h1 {
    font-size: 2.2rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.5rem;
  }

  p {
    margin: 1.2rem 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1.2rem;
    margin: 1.8rem 0;
    color: #4b5563;
    font-style: italic;
  }
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 4rem 2rem;
  background: #ecfdf5;
  color: #065f46;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 3rem;

  svg {
    animation: spin 1.2s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorBox = styled(LoadingBox)`
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
`;

const Category = styled.div`
  background-color: #f3f4f6;
  color: #2d50dc;
  text-transform:uppercase;
  padding:.3rem;
  width: fit-content;
  margin-top: 1rem;
  border-radius: 8px;
  margin-left: auto;

`;


const MaterialPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useMaterials(id);
  const material = data as Material | undefined;

  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  const converterEditor = useMemo(() => {
    return BlockNoteEditor.create();
  }, []);

  const formatVideoUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "https://www.youtube.com/embed/");
    }
    return url;
  };

  useEffect(() => {
    if (!material?.content || !Array.isArray(material.content)) {
      setHtmlContent(null);
      return;
    }

    const convert = async () => {
      try {
        let html = await converterEditor.blocksToHTMLLossy(
          material.content as any,
        );
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const videoTags = doc.querySelectorAll("video");
        videoTags.forEach((videoTag) => {
          const rawUrl =
            videoTag.getAttribute("src") || videoTag.getAttribute("data-url");
          if (rawUrl) {
            const iframe = doc.createElement("iframe");
            iframe.src = formatVideoUrl(rawUrl);
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute(
              "allow",
              "clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            );
            videoTag.replaceWith(iframe);
          }
        });

        const videoContainers = doc.querySelectorAll(
          '[data-content-type="video"]',
        );
        videoContainers.forEach((container) => {
          if (doc.contains(container)) {
            const videoInside = container.querySelector("video");
            const url =
              videoInside?.getAttribute("src") ||
              container.getAttribute("data-url");
            if (url) {
              const iframe = doc.createElement("iframe");
              iframe.src = formatVideoUrl(url);
              iframe.setAttribute("allowfullscreen", "true");
              iframe.setAttribute(
                "allow",
                "autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
              );
              container.replaceWith(iframe);
            }
          }
        });

        setHtmlContent(doc.body.innerHTML);
      } catch (err) {
        console.error("Błąd konwersji:", err);
        setHtmlContent('<p style="color: red;">Błąd wyświetlania treści.</p>');
      }
    };

    convert();
  }, [material?.content, converterEditor]);

  if (isLoading) {
    return (
      <Wrapper>
        <Sidebar />
        <MainContent>
          <Header />
          <Container>
            <LoadingBox>
              <FaSpinner /> loading...
            </LoadingBox>
          </Container>
          <BottomNav />
        </MainContent>
      </Wrapper>
    );
  }

  if (isError || !material) {
    return (
      <Wrapper>
        <Sidebar />
        <MainContent>
          <Header />
          <Container>
            <ErrorBox>
              <FaExclamationTriangle /> Error
            </ErrorBox>
          </Container>
          <BottomNav />
        </MainContent>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Sidebar />
      <MainContent>
        <Header />
        <Container>
          <BackButton to="/dashboard">
            {/* <BackIcon />  */}
            Back
          </BackButton>

          <ContentWrapper>
            <Title>{material.title}</Title>
            <ArticleContent>
              {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              ) : (
                <p>Ładowanie treści...</p>
              )}
            </ArticleContent>
          </ContentWrapper>
          <Meta>
            Created:{" "}
            {new Date(material.createdAt).toLocaleDateString("en-EN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <Category>Category</Category>
          </Meta>
        </Container>
        <BottomNav />
      </MainContent>
    </Wrapper>
  );
};

export default MaterialPage;
