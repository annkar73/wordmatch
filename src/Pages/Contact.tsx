import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { ContactForm } from "../Components/ContactForm";
import { breakpoints, spacing } from "../styles/variables";
import { HeaderTitle } from "../Components/styled/Titles";


const StyledPageWrapper = styled(PageWrapper)`
  justify-content: center;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 400px;
  margin: 0 15px;
  display: block;
  padding: 15px;
  @media (min-width: ${breakpoints.tablet}) {
    width: 70vw;
    max-width: 800px;
    margin-top: ${spacing.xLarge};
    margin-bottom: 0;
  }

`;

const Contact = () => {
  return (
    <>
    <StyledPageWrapper>
      <HeaderTitle>Kontakt</HeaderTitle>

    <Container>
      <ContactForm />
    </Container>

    </StyledPageWrapper>
    </>
  );
}
export default Contact;