import React from "react";
import styled from "styled-components";
import { spacing, borderRadius } from "../styles/variables";
import { StyledH4 } from "./styled/Titles";

const Button = React.lazy(() => import("../Components/styled/Button"));
const HeaderTitle = React.lazy(() => import("../Components/styled/Titles"));

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Sätter en högre z-index för att säkerställa att modalen visas över andra element */
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: ${spacing.large};
  border-radius: ${borderRadius.medium};
  text-align: center;
  width: 80%;
  max-width: 400px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  // Logga för att säkerställa att isOpen fungerar korrekt
  console.log("Modal is open:", isOpen);

  return (
    <ModalOverlay>
      <ModalContent>
        {/* Temporärt ta bort Suspense för att se om det är relaterat till problemet */}
        <HeaderTitle>Bra jobbat!</HeaderTitle>
        <StyledH4>Du har klarat spelet!</StyledH4>
        <Button onClick={onClose}>Stäng</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
