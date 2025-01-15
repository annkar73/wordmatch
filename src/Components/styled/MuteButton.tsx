import { Button as StyledButton } from "./Button"; 
import styled from "styled-components";
import { useState } from "react";
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { soundManager } from "../../utils/soundManager";

const MuteButtonStyled = styled(StyledButton)`
  font-size: 1rem; 
  padding: 5px 10px; 
  min-height: 35px; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuteStatus());

  const toggleMute = () => {
    soundManager.toggleMute();
    setIsMuted(soundManager.getMuteStatus());
  };

  return (
    <MuteButtonStyled onClick={toggleMute} onTouchStart={toggleMute}>
      <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      {isMuted ? 'Ljud av' : 'Ljud på'}
    </MuteButtonStyled>
  );
};
