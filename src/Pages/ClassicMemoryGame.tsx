import { styled } from "styled-components";
import { PageWrapper } from "../Components/styled/Wrappers";

const Container = styled.div`
  text-align: center;
  margin: 2rem;

  padding: 2rem;
  max-width: 600px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem auto;
  }
`;


const ClassicMemoryPage = () => {
    return (
        <>
        <PageWrapper>
        <Container>
            <h1>Classic Memory game - building in progress</h1>
        </Container>
        </PageWrapper>
        </>
    )
}



export default ClassicMemoryPage;
