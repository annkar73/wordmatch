import styled from "styled-components";
import { motion } from "framer-motion";

interface ThemeToggleButtonProps {
  onClick: () => void;
  themeName: string; // to decide if it is light or dark
}

const SwitchContainer = styled.div`
  width: 60px;
  height: 30px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  background-color: ${(props) => props.theme.toggleBg};
  position: relative;
`;

const SwitchHandle = styled(motion.div)<{ themeName: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.toggleHandle};
  position: absolute;

  /* Dynamisk URL för bakgrundsbild */
  background-image: ${(props) =>
    props.themeName === "dark"
      ? "url('/assets/icons/moon.png')"
      : "url('/assets/icons/sun.png')"};
  background-size: cover; /* Anpassa storlek */
  background-position: center; /* Centrerar ikonen */
`;

export const ThemeToggleButton = ({ onClick, themeName }: ThemeToggleButtonProps) => {
  return (
    <SwitchContainer onClick={onClick}>
      <SwitchHandle
        layout
        initial={false}
        themeName={themeName} // Skicka ner temat här
        animate={{ x: themeName === "dark" ? 30 : 0 }} // Flytta kulan
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </SwitchContainer>
  );
};
