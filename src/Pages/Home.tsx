import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { fontSizes, spacing, breakpoints } from "../styles/variables";
import { Button } from "../Components/styled/Button";
import { Link } from "react-router-dom";

// Styled Components
const Container = styled.div`
  text-align: center;
  //margin: ${spacing.small} auto;
  padding: ${spacing.small};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}) {
    max-width: 600px;
    padding: ${spacing.large};
    margin: ${spacing.large} auto;
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


const Image = styled.img`
  width: 90vw;
  max-width: 400px;
  margin: 0 auto;
  display: block;
  background-color: ${(props) => props.theme.backgroundColor};
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) blur(0.5px);
  //padding: 0.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    width: 70vw;
    max-width: 800px;
    margin-top: ${spacing.xLarge};
    margin-bottom: 0;
  }

`;


// Component
const Home = () => {
  return (
    <PageWrapper>
      <Image src="/assets/ordmatch2.png" />

      <Container>
        <Title>Välkommen till OrdMatch!</Title>
        <Description>
          Här kan du träna på att koppla bild till ord, eller spela ett klassiskt memory. Utmana dig själv och ha roligt samtidigt!
        </Description>
        <Button as={Link} to="/games">Börja spela</Button>
      </Container>
    </PageWrapper>
  );
};

export default Home;
