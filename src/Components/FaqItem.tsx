import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "../styles/variables";

interface FaqItemProps {
  question: string;
  answer: string;
}

const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  width: 75vw;
  justify-content: center;
  align-items: center;

   @media (min-width: ${breakpoints.tablet}) {
      max-width: 80%;
    }
`;

const Question = styled.div`
  background-color: ${(props) => props.theme.gameBackground};
  color: ${(props) => props.theme.text};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    color: ${(props) => props.theme.buttonHoverText};
  }
`;

const Answer = styled(motion.div)`
  background-color: white;
  color: ${(props) => props.theme.text};
  padding: 1rem;
  white-space: pre-line;
`;

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container className="faq-item">
      <Question onClick={() => setIsOpen((prev) => !prev)}>
        {question}
        <span>{isOpen ? "▲" : "▼"}</span>
      </Question>
      {isOpen && (
        <Answer
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {answer}
        </Answer>
      )}
    </Container>
  );
}
