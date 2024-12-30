import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { shadows, fontSizes, spacing, breakpoints, borderRadius } from "../styles/variables";

// Styled Components
const Container = styled.div`
  text-align: center;
  margin: ${spacing.large} auto;
  padding: ${spacing.large};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}) {
    max-width: 600px;
    padding: ${spacing.xLarge};
    margin: ${spacing.xLarge} auto;
  }
`;

const Title = styled.h1`
  font-size: ${fontSizes.h2};
  color: ${(props) => props.theme.text};
  margin-bottom: ${spacing.medium};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fontSizes.heading};
  }
`;

const Description = styled.p`
  font-size: ${fontSizes.base};
  color: ${(props) => props.theme.text};
  margin: ${spacing.small} 0 ${spacing.large};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fontSizes.h4};
  }
`;

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

// Component
const Home = () => {
  return (
    <PageWrapper>
      <Container>
        <Title>Välkommen till OrdMatch!</Title>
        <Description>
          Här kan du träna på att koppla bild till ord, eller spela ett klassiskt memory. Utmana dig själv och ha roligt samtidigt!
        </Description>
        <NavContainer>
          <NavButton to="/matching-game">Spela ordmatchning</NavButton>
          <NavButton to="/classic-memory">Spela klassiskt memory</NavButton>
          <NavButton to="/faq">Vanliga frågor</NavButton>
        </NavContainer>
      </Container>
    </PageWrapper>
  );
};

export default Home;
