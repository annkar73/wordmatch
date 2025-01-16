import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { fontSizes, spacing, breakpoints } from "../styles/variables";
import { Link } from "react-router-dom";
import React, { Suspense } from "react";

// Lazy load components
const Button = React.lazy(() => import("../Components/styled/Button"));
const HeaderTitle = React.lazy(() => import("../Components/styled/Titles"));
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


const Description = styled.div`
  font-size: ${fontSizes.base};
  color: ${(props) => props.theme.text};
  margin: ${spacing.small} 0 ${spacing.large} 0;
  

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fontSizes.h4};
  }
`;


// Component
const Home = () => {
  return (
    <>
    <PageWrapper>
      <Suspense fallback={<div>Laddar titel...</div>}>
      <HeaderTitle>matcha ord och bild</HeaderTitle>
      </Suspense>

      <Container>
        <Description>
          Här kan du träna på att koppla bild till ord, eller spela ett klassiskt memory där du matchar bilder. 
          
        <p>Utmana dig själv och ha roligt samtidigt!</p></Description>
        <Suspense fallback={<div>Laddar knapp...</div>}>
        <Button as={Link} to="/games">Börja spela</Button>
        </Suspense>
      </Container>
    </PageWrapper>
    </>
  );
};

export default Home;
