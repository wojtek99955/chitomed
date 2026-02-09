import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddMaterial } from "../api/useAddMaterial";
import { useGetCategories } from "../../categories/api/useGetCategories";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

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
} from "./AddMaterial/Styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ────────────────────────────────────────────────

const initialValues = {
  title: "",
  categoryId: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Uzupełnij tytuł"),
  categoryId: Yup.string().required("Wybierz kategorię"),
});

// ────────────────────────────────────────────────

const AddMaterialModal = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddMaterial(() => {
    navigate("/dashboard");
  });
  const { data: categories = [] } = useGetCategories();

  // Lokalny stan na treść z BlockNote
  const [content, setContent] = useState<any[]>([]);

  const editor = useCreateBlockNote({
    uploadFile: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      let uploadEndpoint = "http://localhost:8080/upload/upload-image";

      if (file.type.startsWith("video/")) {
        uploadEndpoint = "http://localhost:8080/upload/upload-video";
      } else if (!file.type.startsWith("image/")) {
        throw new Error("Obsługiwane są tylko obrazy i filmy");
      }

      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Błąd uploadu (${file.type})`);
      }

      const { url } = await response.json();
      return url;
    },
  });

  // Nasłuchujemy zmian w edytorze → zapisujemy lokalnie
  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      setContent(editor.document);
    });
    return () => unsubscribe();
  }, [editor]);

  // Zamień video tagi na iframe po załadowaniu
  useEffect(() => {
    const replaceVideoWithIframe = () => {
      const videoElements = document.querySelectorAll(
        ".bn-visual-media-wrapper video",
      );

      videoElements.forEach((video: any) => {
        const videoUrl = video.src;
        if (!videoUrl || video.dataset.replaced === "true") return;

        // Sprawdź czy to nie jest już iframe
        const wrapper = video.closest(".bn-visual-media-wrapper");
        if (!wrapper) return;

        // Utwórz iframe
        const iframe = document.createElement("iframe");
        iframe.src = videoUrl;
        iframe.style.width = "100%";
        iframe.style.height = "400px";
        iframe.style.border = "1px solid #e5e7eb";
        iframe.style.borderRadius = "8px";
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        );
        iframe.setAttribute("allowfullscreen", "true");

        // Zamień video na iframe
        wrapper.innerHTML = "";
        wrapper.appendChild(iframe);

        // Oznacz jako zamienione
        iframe.dataset.replaced = "true";
      });
    };

    // Obserwuj zmiany w DOM
    const observer = new MutationObserver(replaceVideoWithIframe);
    const editorElement = document.querySelector(".bn-container");

    if (editorElement) {
      observer.observe(editorElement, {
        childList: true,
        subtree: true,
      });

      // Wykonaj od razu
      replaceVideoWithIframe();
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (values: typeof initialValues) => {
    if (content.length === 0) {
      alert("Treść nie może być pusta!");
      return;
    }

    // Można dodać prostą walidację tekstu, np.:
    const hasSomeText = content.some(
      (block: any) =>
        block.type === "paragraph" &&
        block.content?.some((c: any) => c.type === "text" && c.text?.trim()),
    );

    if (!hasSomeText) {
      alert("Wpisz choć trochę tekstu!");
      return;
    }

    const dataToSend = {
      title: values.title,
      categoryId: values.categoryId,
      content, // ← wysyłamy lokalny stan
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
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="categoryId" component={ErrorText} />
            </FormSection>

            <FormSection>
              <Label>Treść</Label>

              <div
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  minHeight: "180px",
                  background: "#fff",
                }}>
                <BlockNoteView editor={editor} theme="light" />
              </div>

              {/* Można dodać własną informację o błędzie, jeśli treść pusta */}
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
};

export default AddMaterialModal;
