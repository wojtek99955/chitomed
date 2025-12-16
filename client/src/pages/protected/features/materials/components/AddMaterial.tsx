import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddMaterial } from "../api/useAddMaterial";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: #10b981; /* Green */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 2rem;

  &:hover {
    background: #059669;
  }
`;

const ModalOverlay = styled(motion.div)<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
`;
const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  padding-bottom: 0.5rem;
  margin-bottom: 0;
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
    }
  }
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
    }
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.4rem;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

const SubmitButton = styled.button`
  padding: 0.9rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 0.9rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;

  &:hover {
    background: #dde0e5 !important;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  font-weight: 500;
`;

const CloseContainer = styled.div`
  background-color: #f3f4f6;
  aspect-ratio: 1/1;
  padding: 0.3rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 200ms;
  &:hover {
    background-color: #dde0e5;
  }
`;

const CloseIcon = styled(MdClose)`
  font-size: 1.7rem;
`;

const initialValues = {
  title: "",
  type: "text" as "video" | "text",
  text: "",
  videoUrl: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Uzupełnij"),
  type: Yup.string().oneOf(["video", "text"]).required("Wybierz typ materiału"),

  // Conditional validation based on 'type'
  text: Yup.string().when("type", {
    is: "text",
    then: (schema) => schema.required("Uzupełnij"),
    otherwise: (schema) => schema.optional(),
  }),

  videoUrl: Yup.string().when("type", {
    is: "video",
    then: (schema) => schema.url("Must be a valid URL").required("Uzupełnij"),
    otherwise: (schema) => schema.optional(),
  }),
});

// ====================== MAIN COMPONENT ======================

const AddMaterialModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useAddMaterial(() => {
    // Callback after successful mutation
    setIsOpen(false);
  });

  const handleSubmit = (values: typeof initialValues) => {
    const dataToSend = {
      title: values.title,
      type: values.type,
      // Send only the relevant field based on type
      text: values.type === "text" ? values.text : undefined,
      videoUrl: values.type === "video" ? values.videoUrl : undefined,
    } as any;

    mutate(dataToSend);
  };

  const closeModal = (e?: React.MouseEvent) => {
    if (e && e.target !== e.currentTarget) return; // Ignore clicks on children
    setIsOpen(false);
  };

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)}>
        <FaPlus /> Dodaj materiał
      </AddButton>
      <AnimatePresence>
        {isOpen && (
          <ModalOverlay
            $isOpen={isOpen}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}>
              <Header>
                <FormTitle>Dodaj materiał</FormTitle>
                <CloseContainer onClick={() => setIsOpen(false)}>
                  <CloseIcon />
                </CloseContainer>
              </Header>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ values }) => (
                  <Form>
                    {/* 1. TITLE */}
                    <FormSection>
                      <Label htmlFor="title">Tytuł</Label>
                      <Input name="title" placeholder="tytuł" />
                      <ErrorMessage name="title" component={ErrorText} />
                    </FormSection>

                    {/* 2. TYPE SELECT */}
                    <FormSection>
                      <Label htmlFor="type">Typ materiału</Label>
                      <Field name="type" as="select">
                        <option value="text">Tekstowy</option>
                        <option value="video">Film</option>
                      </Field>
                      <ErrorMessage name="type" component={ErrorText} />
                    </FormSection>
                    {/* 3. CONDITIONAL FIELDS */}
                    {values.type === "text" && (
                      <FormSection>
                        <Label htmlFor="text">Tekst</Label>
                        <Field
                          as="textarea"
                          name="text"
                          rows={5}
                          placeholder="Wpisz tutaj tekst"
                        />
                        <ErrorMessage name="text" component={ErrorText} />
                      </FormSection>
                    )}

                    {values.type === "video" && (
                      <FormSection>
                        <Label htmlFor="videoUrl">Video URL</Label>
                        <Input
                          name="videoUrl"
                          placeholder="e.g., https://youtube.com/watch?v=12345"
                        />
                        <ErrorMessage name="videoUrl" component={ErrorText} />
                      </FormSection>
                    )}

                    {/* SUBMIT BUTTON AND CONTROLS */}
                    <SubmitButton type="submit" disabled={isPending}>
                      {isPending ? "Dodaję..." : "Dodaj"}
                    </SubmitButton>

                    <CancelButton
                      type="button"
                      onClick={() => setIsOpen(false)}
                      style={{
                        marginTop: "10px",
                        background: "#f3f4f6",
                        color: "#4b5563",
                      }}>
                      Anuluj
                    </CancelButton>
                  </Form>
                )}
              </Formik>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddMaterialModal;
