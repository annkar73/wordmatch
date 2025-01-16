import styled from "styled-components";
import { FaqList } from "../Components/FaqList";
import { PageWrapper } from "../Components/styled/Wrappers";
import { breakpoints } from "../styles/variables";
import { HeaderTitle } from "../Components/styled/Titles";

const StyledPageWrapper = styled(PageWrapper)`
  justify-content: center;
`;

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


export function Faq() {
  return (
    <>
    <StyledPageWrapper>
      <HeaderTitle>Mer info</HeaderTitle>
      <Title>Vanliga Frågor</Title>

    <Container>
      <FaqList />
    </Container>
    </StyledPageWrapper>
    </>
  );
}
