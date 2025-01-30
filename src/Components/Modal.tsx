import styled from "styled-components";
import { spacing, borderRadius } from "../styles/variables";
import HeaderTitle, { StyledH4 } from "./styled/Titles";
import Button from "../Components/styled/Button";

// Styled component for the overlay (background)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Semi-transparent black
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;  // Ensure it's on top of other content
`;

// Styled component for the modal content box
const ModalContent = styled.div`
  background: ${(props) => props.theme.background};  // Dynamic background
  color: ${(props) => props.theme.text};  // Dynamic text color
  padding: ${spacing.large};
  border-radius: ${borderRadius.medium};
  text-align: center;
  width: 80%;
  max-width: 400px;
`;

interface ModalProps {
  isOpen: boolean;   // Whether the modal should be open or not
  onClose: () => void;  // Function to close the modal
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null; // Return nothing if modal is not open

  // Log that modal is open for debugging
  console.log("Modal is open:", isOpen);

  return (
    <ModalOverlay>
      <ModalContent>
        <HeaderTitle>Bra jobbat!</HeaderTitle>
        <StyledH4>Du har klarat spelet!</StyledH4>
        <Button onClick={onClose}>Stäng</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
