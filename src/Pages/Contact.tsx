import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { ContactForm } from "../Components/ContactForm";
import { breakpoints, spacing } from "../styles/variables";

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

const Image = styled.img`
  width: 90vw;
  max-width: 400px;
  margin: 0 15px;
  display: block;
  background-color: ${(props) => props.theme.backgroundColor};
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) blur(0.5px);
  //padding: 0.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    width: 70vw;
    max-width: 600px;
    margin-top: ${spacing.xLarge};
    margin-bottom: 0;
  }

`;


const Contact = () => {
  return (
    <>
    <PageWrapper>
    <Image src="/assets/kontakt.png" />

    <Container>
      <ContactForm />
    </Container>

    </PageWrapper>
    </>
  );
}
export default Contact;