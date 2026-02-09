import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FaExclamationTriangle,
  FaSpinner,
  FaChevronCircleLeft,
} from "react-icons/fa";
import { useMaterials, type Material } from "../api/useMaterial";
import Header from "../../../Dashboard/Header";
import BottomNav from "../../../BottomNav";
import { device } from "../../../../../assets/device";
import { useEffect, useState, useMemo } from "react";
import { BlockNoteEditor } from "@blocknote/core";

const Container = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  width: 100%;
  min-height: calc(100vh - 4.5rem);
  overflow-y: auto;
  position: relative;
  top: 4.5rem;
  padding-bottom: 7rem;

  @media ${device.laptop} {
    padding: 2.5rem 3rem;
    padding-bottom: 2rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #3b82f6;
  color: white;
  padding: 0.7rem 1.3rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
`;

const BackIcon = styled(FaChevronCircleLeft)`
  font-size: 1.3rem;
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  max-width: 920px;
  margin: 0 auto;

  @media ${device.tablet} {
    padding: 3rem;
  }
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
      return url.replace("youtu.be/", "youtube.com/embed/");
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
        // 1. Generuj HTML z BlockNote
        let html = await converterEditor.blocksToHTMLLossy(material.content as any);

        // 2. Parsuj HTML do manipulacji
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // 3. Znajdź wszystkie tagi <video> wygenerowane przez BlockNote
        const videoTags = doc.querySelectorAll("video");

        videoTags.forEach((videoTag) => {
          // Pobierz URL z atrybutu src lub data-url
          const rawUrl =
            videoTag.getAttribute("src") || videoTag.getAttribute("data-url");

          if (rawUrl) {
            const embedUrl = formatVideoUrl(rawUrl);

            // Stwórz nowy iframe
            const iframe = doc.createElement("iframe");
            iframe.src = embedUrl;
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute(
              "allow",
              "clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            );

            videoTag.replaceWith(iframe);
          }
        });

        // Obsługa kontenerów data-content-type="video" (dodatkowe zabezpieczenie)
        const videoContainers = doc.querySelectorAll(
          '[data-content-type="video"]',
        );
        videoContainers.forEach((container) => {
          // Jeśli kontener nadal istnieje i nie został podmieniony wyżej
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
      <>
        <Header />
        <Container>
          <BackButton to="/dashboard">
            <BackIcon /> Powrót
          </BackButton>
          <LoadingBox>
            <FaSpinner /> Ładowanie...
          </LoadingBox>
        </Container>
        <BottomNav />
      </>
    );
  }

  if (isError || !material) {
    return (
      <>
        <Header />
        <Container>
          <BackButton to="/dashboard">
            <BackIcon /> Powrót
          </BackButton>
          <ErrorBox>
            <FaExclamationTriangle /> Błąd pobierania materiału
          </ErrorBox>
        </Container>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <BackButton to="/dashboard">
          <BackIcon /> Powrót do listy
        </BackButton>

        <ContentWrapper>
          <Title>{material.title}</Title>
          <Meta>
            Utworzono:{" "}
            {new Date(material.createdAt).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Meta>

          <ArticleContent>
            {htmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            ) : (
              <p>Ładowanie treści...</p>
            )}
          </ArticleContent>
        </ContentWrapper>
      </Container>
      <BottomNav />
    </>
  );
};

export default MaterialPage;
