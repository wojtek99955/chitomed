import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // 1. Importujemy ReactDOM
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEditMaterial } from "../api/useEditMaterial";
import { useGetCategories } from "../../categories/api/useGetCategories";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pl } from "@blocknote/core/locales";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import {
  ModalContent,
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
} from "./AddMaterial/Styles";

import type { Material } from "../api/useMaterial";

const ModalOverlay = styled(motion.div)`
  position: fixed;
  z-index: 999999;
  inset: 0;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

const StyledModalContent = styled(ModalContent)`
  position: relative;
  margin: auto; 
  height: 100%;
`;


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Uzupełnij tytuł"),
  categoryId: Yup.string().required("Wybierz kategorię"),
});

type EditMaterialProps = {
  material: Material;
  setIsOpen: (open: boolean) => void;
};

const EditMaterial: React.FC<EditMaterialProps> = ({ material, setIsOpen }) => {
  const { mutate, isPending } = useEditMaterial(() => {
    setIsOpen(false);
  });

  const { data: categories = [] } = useGetCategories();
  const [content, setContent] = useState<any>(material.content || []);

  const editor = useCreateBlockNote({
    dictionary: pl,
    initialContent: material.content ? (material.content as any) : undefined,
    uploadFile: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      let uploadEndpoint = `${BASE_URL}/upload/upload-image`;
      if (file.type.startsWith("video/")) {
        uploadEndpoint = `${BASE_URL}/upload/upload-video`;
      }

      const response = await fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Błąd uploadu");
      const { url } = await response.json();
      return url;
    },
  });

  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      setContent(editor.document);
    });
    return () => unsubscribe();
  }, [editor]);

  const handleSubmit = (values: { title: string; categoryId: string }) => {
    if (content.length === 0) {
      alert("Treść nie może być pusta!");
      return;
    }
    const dataToSend = {
      _id: material._id,
      title: values.title,
      categoryId: values.categoryId,
      content,
    };
    mutate(dataToSend);
  };

  // 2. Logika Portalu
  const modalRoot = document.getElementById("modal-root") || document.body;

  return ReactDOM.createPortal(
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsOpen(false)}>
      <StyledModalContent
        style={{ minHeight: "95vh" }}
        as={motion.div}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}>
        <Header>
          <FormTitle>Edytuj materiał</FormTitle>
          <CloseContainer onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </CloseContainer>
        </Header>

        <Formik
          initialValues={{
            title: material.title || "",
            categoryId: material.categoryId || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize>
          <Form>
            <TopInputs>
              <FormSection>
                <Label htmlFor="title">Tytuł</Label>
                <Field as={Input} name="title" placeholder="Tytuł materiału" />
                <ErrorMessage name="title" component={ErrorText} />
              </FormSection>

              <FormSection>
                <Label htmlFor="categoryId">Kategoria</Label>
                <Field
                  as="select"
                  name="categoryId"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                  }}>
                  <option value="" disabled>
                    -- Wybierz kategorię --
                  </option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name.pl}
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
                  overflow: "hidden",
                }}>
                <BlockNoteView editor={editor} theme="light" />
              </NotepadWrapper>
            </FormSection>

            <SubmitButton type="submit" disabled={isPending}>
              {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
            </SubmitButton>
            <br />
            <br />
            <CancelButton
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: "#f3f4f6",
                color: "#4b5563",
              }}>
              Anuluj
            </CancelButton>
          </Form>
        </Formik>
      </StyledModalContent>
    </ModalOverlay>,
    modalRoot,
  );
};

export default EditMaterial;
