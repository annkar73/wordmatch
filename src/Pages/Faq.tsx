import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { breakpoints } from "../styles/variables";
import React, { Suspense } from "react";

// Lazy load components
const FaqList = React.lazy(() => import("../Components/FaqList"));
const HeaderTitle = React.lazy(() => import("../Components/styled/Titles"));



const Container = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  padding: 0;
  color: ${(props) => props.theme.text};
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (min-width: ${breakpoints.tablet}) {
    max-width: 1000px;
    margin: auto;
    align-items: center;
  }
`;


const Faq =() => {
  return (
    <>
    <PageWrapper>
      <Suspense fallback={<div>Laddar sida...</div>}>
      <HeaderTitle>Mer info</HeaderTitle>
      </Suspense>

    <Container className="faq-container">
      <Suspense fallback={<div>Laddar Faq...</div>}>
      <FaqList />
      </Suspense>
    </Container>
    </PageWrapper>
    </>
  );
}
export default Faq;