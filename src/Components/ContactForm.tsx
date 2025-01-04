import { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    color: ${(props) => props.theme.buttonHoverText};
  }
`;

export function ContactForm() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_32pi2fm", // Service ID from EmailJS dashboard
        "template_mqjv9gs", // Template ID from EmailJS dashboard
        formData,
        "yVR7KkAVpx9lwh3DK" // Public Key from EmailJS
      );
      setStatusMessage("Meddelandet skickades!");
      setFormData({ user_name: "", user_email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Ett fel inträffade:", error);
      setStatusMessage("Ett fel inträffade, försök igen.");
    }
  };

  return (
    <div>
      <h2>Kontakta mig</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="user_name"
          placeholder="Ditt namn"
          value={formData.user_name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="user_email"
          placeholder="Din e-postadress"
          value={formData.user_email}
          onChange={handleChange}
          required
        />
        <TextArea
          name="message"
          placeholder="Ditt meddelande"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">Skicka</Button>
      </Form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}
