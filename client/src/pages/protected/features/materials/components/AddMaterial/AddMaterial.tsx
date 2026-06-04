import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { pl } from "@blocknote/core/locales";

// Style BlockNote
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

// Twoje Style
import {
  ModalContent,
  ModalOverlay,
  FormSection,
  FormTitle,
  Label,
  Header,
  Input,
  CancelButton,
  CloseContainer,
  CloseIcon,
  ErrorText,
  SubmitButton,
  TopInputs,
  NotepadWrapper,
} from "./Styles";

// API / Hooki
import { useAddMaterial } from "../../api/useAddMaterial";
import { useGetCategories } from "../../../categories/api/useGetCategories";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BUNNY_KEY = import.meta.env.VITE_BUNNY_ACCESS_KEY;

const initialValues = {
  title: "",
  categoryId: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Uzupełnij tytuł"),
  categoryId: Yup.string().required("Wybierz kategorię"),
});

const AddMaterialModal = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddMaterial(() => {
    navigate("/dashboard");
  });

  const { data: categories = [] } = useGetCategories();
  const [content, setContent] = useState<any[]>([]);

  // KONFIGURACJA EDYTORA
  const editor = useCreateBlockNote({
    dictionary: pl,
    uploadFile: async (file: File) => {
      // -------------------------------------------------------
      // LOGIKA DLA WIDEO (KOPIUJEMY SPRAWDZONY PATTERN Z AXIOS)
      // -------------------------------------------------------
      if (file.type.startsWith("video/")) {
        const apiBase = "https://video.bunnycdn.com";
        const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

        try {
          // Krok 1: Tworzenie obiektu wideo w Bunny (używamy axios)
          const createVideoResponse = await axios.post(
            `${apiBase}/library/561988/videos`,
            { title: safeName },
            {
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                AccessKey: BUNNY_KEY,
              },
            },
          );

          const videoId = createVideoResponse.data.guid;
          console.log("New video created with ID: " + videoId);

          // Krok 2: Dokładnie taki sam upload dużego pliku za pomocą axios.put
          const uploadVideoUrl = `${apiBase}/library/561988/videos/${videoId}`;

          const uploadResponse = await axios.put(uploadVideoUrl, file, {
            headers: {
              accept: "application/json",
              AccessKey: BUNNY_KEY,
              "Content-Type": "application/octet-stream",
            },
            onUploadProgress: (progressEvent: any) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              console.log(`Upload progress: ${percentCompleted}%`);
            },
          });

          if (uploadResponse.status !== 200) {
            throw new Error("Video upload failed");
          }

          // Zwracamy gotowy url embed dla BlockNote
          return `https://iframe.mediadelivery.net/embed/561988/${videoId}`;
        } catch (error) {
          console.error("Error during video upload: ", error);
          throw new Error("Nie udało się przesłać pliku wideo przez Axios.");
        }
      }

      // -------------------------------------------------------
      // LOGIKA DLA INNYCH PLIKÓW (OBRAZY, PDF - PRZEZ BACKEND)
      // -------------------------------------------------------
      const formData = new FormData();
      formData.append("file", file);

      let uploadEndpoint = `${BASE_URL}/upload/upload-image`;
      if (file.type === "application/pdf") {
        uploadEndpoint = `${BASE_URL}/upload/upload-pdf`;
      } else if (!file.type.startsWith("image/")) {
        throw new Error("Obsługiwane są tylko obrazy, filmy oraz pliki PDF");
      }

      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Błąd przesyłania pliku (${file.type})`);
      }

      const { url } = await response.json();
      return url;
    },
  });

  // Synchronizacja treści edytora ze stanem Formika/lokalnym
  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      setContent(editor.document);
    });
    return () => unsubscribe();
  }, [editor]);

  // RENDEROWANIE PODGLĄDU (VIDEO I PDF)
  useEffect(() => {
    const replaceMediaWithPreview = () => {
      // 1. Obsługa VIDEO
      const videoElements = document.querySelectorAll(
        ".bn-visual-media-wrapper video",
      );

      videoElements.forEach((video: any) => {
        const videoUrl = video.src;
        if (!videoUrl || video.dataset.replaced === "true") return;

        const wrapper = video.closest(".bn-visual-media-wrapper");
        if (!wrapper) return;

        const iframe = document.createElement("iframe");
        iframe.src = videoUrl;
        iframe.style.width = "100%";
        iframe.style.height = "400px";
        iframe.style.border = "1px solid #e5e7eb";
        iframe.style.borderRadius = "8px";
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        );

        wrapper.innerHTML = "";
        wrapper.appendChild(iframe);
        iframe.dataset.replaced = "true";
      });

      // 2. Obsługa PDF
      const pdfLinks = document.querySelectorAll(
        ".bn-file-block-content-wrapper a[href*='.pdf']",
      );

      pdfLinks.forEach((link: any) => {
        if (link.dataset.replaced === "true") return;

        const pdfUrl = link.href;
        const fileBlock = link.closest(
          ".bn-block-content[data-content-type='file']",
        );
        if (!fileBlock) return;

        const wrapper = fileBlock.querySelector(
          ".bn-file-block-content-wrapper",
        );
        if (wrapper) {
          const pdfIframe = document.createElement("iframe");
          // Dodajemy parametry dla lepszego wyglądu w przeglądarce
          pdfIframe.src = `${pdfUrl}#toolbar=0&navpanes=0&view=FitH`;
          pdfIframe.style.width = "100%";
          pdfIframe.style.height = "600px";
          pdfIframe.style.border = "1px solid #d1d5db";
          pdfIframe.style.borderRadius = "8px";
          pdfIframe.style.marginTop = "10px";

          wrapper.innerHTML = ""; // Czyścimy domyślny wygląd (ikonka + link)
          wrapper.appendChild(pdfIframe);
          link.dataset.replaced = "true";
        }
      });
    };

    const observer = new MutationObserver(replaceMediaWithPreview);
    const editorElement = document.querySelector(".bn-container");

    if (editorElement) {
      observer.observe(editorElement, { childList: true, subtree: true });
      replaceMediaWithPreview();
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (values: typeof initialValues) => {
    if (content.length === 0) {
      alert("Treść nie może być pusta!");
      return;
    }

    // Prosta walidacja czy w ogóle jest jakaś treść (tekst lub media)
    const hasContent = content.some((block: any) => {
      if (block.type === "paragraph") {
        return block.content?.some(
          (c: any) => c.type === "text" && c.text?.trim(),
        );
      }
      return ["image", "video", "file"].includes(block.type);
    });

    if (!hasContent) {
      alert("Dodaj treść lub pliki do materiału!");
      return;
    }

    const dataToSend = {
      title: values.title,
      categoryId: values.categoryId,
      content,
    };

    mutate(dataToSend);
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <FormTitle>Dodaj materiał</FormTitle>
          <CloseContainer onClick={() => navigate("/dashboard")}>
            <CloseIcon />
          </CloseContainer>
        </Header>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <TopInputs>
              <FormSection>
                <Label htmlFor="title">Tytuł</Label>
                <Field as={Input} name="title" placeholder="Tytuł materiału" />
                <ErrorMessage name="title" component={ErrorText} />
              </FormSection>

              <FormSection>
                <Label htmlFor="categoryId">Kategoria</Label>
                <Field as="select" name="categoryId">
                  <option value="" disabled>
                    -- Wybierz kategorię --
                  </option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name["pl"]}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="categoryId" component={ErrorText} />
              </FormSection>
            </TopInputs>

            <FormSection>
              <Label>Treść</Label>
              <NotepadWrapper
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  background: "#fff",
                }}>
                <BlockNoteView editor={editor} theme="light" />
              </NotepadWrapper>

              {content.length === 0 && (
                <ErrorText style={{ marginTop: "4px" }}>
                  Treść nie może być pusta
                </ErrorText>
              )}
            </FormSection>

            <SubmitButton type="submit" disabled={isPending}>
              {isPending ? "Dodaję..." : "Dodaj"}
            </SubmitButton>

            <CancelButton
              type="button"
              onClick={() => navigate("/dashboard")}
              style={{
                marginTop: "10px",
                background: "#f3f4f6",
                color: "#4b5563",
              }}>
              Anuluj
            </CancelButton>
          </Form>
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};;

export default AddMaterialModal;
