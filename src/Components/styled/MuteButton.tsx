import styled from "styled-components";
import { useState } from "react";
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { soundManager } from "../../utils/soundManager";
import React from "react";

const StyledButton = React.lazy(() => import("./Button"));

const MuteButtonStyled = styled(StyledButton)`
  font-size: 1rem; 
  padding: auto 5px; 
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
    <MuteButtonStyled onClick={toggleMute} >
      <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
      {isMuted ? 'Ljud av' : 'Ljud på'}
    </MuteButtonStyled>
  );
};
