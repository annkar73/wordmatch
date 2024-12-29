import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  text-align: center;
  margin: 2rem auto;
  padding: 2rem;
  max-width: 600px;
 //border: 2px solid ${(props) => props.theme.borderColor};
  //border-radius: 8px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem auto;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 1rem 0 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const NavButton = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.buttonText};
  background-color: ${(props) => props.theme.buttonBackground};
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;

// Component
const Home = () => {
  return (
    <Container>
      <Title>Välkommen till MemOrd!</Title>
      <Description>
        Här kan du träna på att koppla bild till ord, eller spela ett klassiskt memory. Utmana dig själv och ha roligt samtidigt!
      </Description>
      <NavContainer>
        <NavButton to="/matching-game">Spela ordmatchning</NavButton>
        <NavButton to="/classic-memory">Spela klassiskt memory</NavButton>
        <NavButton to="/faq">Vanliga frågor</NavButton>
      </NavContainer>
    </Container>
  );
};

export default Home;
