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
  color: ${(props) => props.theme.primary};
`;

export function Faq() {
  return (
    <>
    <PageWrapper>
    <Container>
      <Title>Vanliga Frågor</Title>
      <FaqList />
    </Container>
    </PageWrapper>
    </>
  );
}
