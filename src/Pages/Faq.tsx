import styled from "styled-components";
import { FaqList } from "../Components/FaqList";
import { PageWrapper } from "../Components/styled/Wrappers";
import { breakpoints } from "../styles/variables";

const Container = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  padding: 0;
  color: ${(props) => props.theme.text};
  align-items: center;
  box-sizing: border-box;

  @media (min-width: ${breakpoints.tablet}) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.text};
`;

const Image = styled.img`
  width: 50%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
  background-color: ${(props) => props.theme.backgroundColor};
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) blur(0.5px);
  padding: 0.5rem;
`;

export function Faq() {
  return (
    <>
    <PageWrapper>
      <Image src="/assets/faq_logo.png" alt="FAQ Logo" />
      <Title>Vanliga Frågor</Title>

    <Container>
      <FaqList />
    </Container>
    </PageWrapper>
    </>
  );
}
