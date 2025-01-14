import { Button as StyledButton } from "./Button"; // Importera Button från Button.tsx"../../../utils/SoundManager"
import { soundManager } from "../../utils/SoundManager";
import styled from "styled-components";
import { useState } from "react";

// Skapa en stil för MuteButton med mindre storlek
const MuteButtonStyled = styled(StyledButton)`
  font-size: 1rem; // Minska fontstorleken
  padding: 5px 10px; // Justera padding för att göra knappen mindre
  min-height: 35px; // Minska höjden på knappen
`;

export const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuteStatus());

  const toggleMute = () => {
    soundManager.toggleMute();
    setIsMuted(soundManager.getMuteStatus());
  };

  return (
    <MuteButtonStyled onClick={toggleMute}>
      {isMuted ? "Ljud Av" : "Ljud På"}
    </MuteButtonStyled>
  );
};
