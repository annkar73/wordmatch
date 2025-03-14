import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { ContactForm } from "../Components/ContactForm";
import { breakpoints, spacing } from "../styles/variables";
import { Suspense } from "react";


const Container = styled.div`
  width: 90vw;
  max-width: 400px;
  margin: 15px;
  display: block;
  padding: 25px;
  box-sizing: border-box;
  @media (min-width: ${breakpoints.tablet}) {
    width: 60vw;
    max-width: 800px;
    margin: ${spacing.xLarge};
    
  }
`;

const Contact = () => {
  return (
    <>
    <PageWrapper>
      <Suspense fallback={<div>Laddar titel...</div>}>
      </Suspense>

    <Container>
      <ContactForm />
    </Container>

    </PageWrapper>
    </>
  );
}
export default Contact;