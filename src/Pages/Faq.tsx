import styled from "styled-components";
import { FaqList } from "../Components/FaqList";
import { PageWrapper } from "../Components/styled/Wrappers";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: ${(props) => props.theme.text};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.text};
`;

const Image = styled.img`
  width: 85%;
  max-width: 500px;
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
    <Container>
      <Title>Vanliga Frågor</Title>
      <FaqList />
    </Container>
    </PageWrapper>
    </>
  );
}
