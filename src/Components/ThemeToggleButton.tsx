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

  /* Dynamirl URL för image */
  background-image: ${(props) =>
    props.themeName === "dark"
      ? "url('/assets/icons/moon.webp')"
      : "url('/assets/icons/sun.webp')"};
  background-size: cover; /* adjust size */
  background-position: center; /* Center icon */
`;

export const ThemeToggleButton = ({ onClick, themeName }: ThemeToggleButtonProps) => {
  return (
    <SwitchContainer onClick={onClick}>
      <SwitchHandle
        layout
        initial={false}
        themeName={themeName} // get theme
        animate={{ x: themeName === "dark" ? 30 : 0 }} // move ball
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </SwitchContainer>
  );
};
