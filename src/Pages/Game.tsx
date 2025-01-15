// main page for game - collect all for gameboard etc
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

const Image = styled.img`
  width: 90vw;
  max-width: 400px;
  margin: 25px auto;
  display: block;
  background-color: ${(props) => props.theme.backgroundColor};
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) blur(0.5px);
  //padding: 0.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    width: 70vw;
    max-width: 600px;
    margin-top: ${spacing.xLarge};
    //margin-bottom: 0;
  }

`;



const Games = () => {
  return (
    <>
      <PageWrapper>
        <Image src="/assets/play.png" />
        <NavContainer>
          <NavButton to="/matching-game">Matcha Ord</NavButton>
          <NavButton to="/classic-memory">Klassiskt Memory</NavButton>
        </NavContainer>
        <Image src="/assets/kawaii_play3.png" />

      </PageWrapper>
    </>
  );
};

export default Games;
