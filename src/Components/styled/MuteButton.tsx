import { Button as StyledButton } from "./Button"; 
import { soundManager } from "../../utils/SoundManager";
import styled from "styled-components";
import { useState } from "react";


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
      {isMuted ? "Ljud Av" : "Ljud På"}
    </MuteButtonStyled>
  );
};
