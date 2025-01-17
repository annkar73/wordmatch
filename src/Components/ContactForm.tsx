import { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.borderColor};
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.borderColor};
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    color: ${(props) => props.theme.buttonHoverText};
  }
`;

export const ContactForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        "service_32pi2fm", // Replace with your EmailJS Service ID
        "template_mqjv9gs", // Replace with your EmailJS Template ID
        formRef.current,
        "yVR7KkAVpx9lwh3DK" // Replace with your EmailJS Public Key
      );

      setStatusMessage("Meddelandet skickades!");
      formRef.current.reset(); // Clear form fields
    } catch (error) {
      console.error("Ett fel inträffade:", error);
      setStatusMessage("Ett fel inträffade, försök igen.");
    }
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input type="text" name="user_name" placeholder="Ditt namn" required />
        <Input type="email" name="user_email" placeholder="Din e-postadress" required />
        <Input type="text" name="subject" placeholder="Ämne" required />
        <TextArea name="message" placeholder="Ditt meddelande" rows={5} required />
        <Button type="submit">Skicka</Button>
      </Form>
      {statusMessage && <p>{statusMessage}</p>}
    </>
  );
};
