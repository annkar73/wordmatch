import { Button as StyledButton } from "./Button"; 
import styled from "styled-components";
import { useState } from "react";
import { soundManager } from "../../utils/soundManager";


const MuteButtonStyled = styled(StyledButton)`
  font-size: 1rem; 
  padding: 5px 10px; 
  min-height: 35px; 
`;

export const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuteStatus());

  const toggleMute = () => {
    soundManager.toggleMute();
    setIsMuted(soundManager.getMuteStatus());
  };

  return (
    <MuteButtonStyled onClick={toggleMute}>
      {isMuted ? "Spela med ljud" : "Spela utan ljud"}
    </MuteButtonStyled>
  );
};
