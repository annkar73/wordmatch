// main page for game - collect all for gameboard etc
const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    justify-content: center;
    gap: ${spacing.large};
  }
`;

const NavButton = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.buttonText};
  background-color: ${(props) => props.theme.buttonBackground};
  padding: ${spacing.small} ${spacing.medium};
  border-radius: ${borderRadius.medium};
  font-size: ${fontSizes.base};
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${shadows.medium};
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    color: ${(props) => props.theme.buttonHoverText};
    transform: scale(1.05);
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fontSizes.h4};
    padding: ${spacing.medium} ${spacing.large};
  }
`;

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import {
  spacing,
  breakpoints,
  borderRadius,
  fontSizes,
  shadows,
} from "../styles/variables";

const Games = () => {
  return (
    <>
      <PageWrapper>
        <NavContainer>
          <NavButton to="/matching-game">Spela ordmatchning</NavButton>
          <NavButton to="/classic-memory">Spela klassiskt memory</NavButton>
        </NavContainer>
      </PageWrapper>
    </>
  );
};

export default Games;
