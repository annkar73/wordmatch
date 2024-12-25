import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  text-align: center;
  margin: 2rem auto;
  padding: 2rem;
  max-width: 600px;
  border: 2px solid #ccc;
  border-radius: 8px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 1rem 0 2rem;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavButton = styled(NavLink)`
  text-decoration: none;
  color: white;
  background-color: #007bff;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Component
const Home = () => {
  return (
    <Container>
      <Title>Välkommen till MemOrd!</Title>
      <Description>
        Här kan du träna på att koppla bild till ord, eller spela ett klassiskt memory.
      </Description>
      <NavContainer>
        <NavButton to="/matching-game">Spela ordmatchning</NavButton>
        <NavButton to="/classic-memory">Spela klassiskt memory</NavButton>
        <NavButton to="/manual">FAQ</NavButton>
      </NavContainer>
    </Container>
  );
};

export default Home;
