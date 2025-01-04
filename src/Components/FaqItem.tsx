import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
}

const Container = styled.div`
  margin: 1rem 0;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  overflow: hidden;
`;

const Question = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 1rem;
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
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 1rem;
`;

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
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
