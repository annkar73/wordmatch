import styled from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";
import { ContactForm } from "../Components/ContactForm";

const Container = styled.div`
  padding: 2rem;
`;

const Contact = () => {
  return (
    <>
    <PageWrapper>
    <Container>
      <ContactForm />
    </Container>

    </PageWrapper>
    </>
  );
}
export default Contact;