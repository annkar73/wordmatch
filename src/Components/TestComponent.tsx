import { Button } from "./styled/Button";
import { HeaderTitle, StyledH1, StyledH2, StyledH3, StyledH4 } from "./styled/Titles";
import { HeaderWrapper, PageWrapper, TextWrapper } from "./styled/Wrappers";


export const TestComponent = () => {

    return(
        <>
        <PageWrapper>
        <HeaderWrapper>
        <HeaderTitle>WordMatch</HeaderTitle>
        </HeaderWrapper>
        <StyledH1>Om...</StyledH1>
        <TextWrapper>
            <div>
                <StyledH1>H1a</StyledH1>
                <StyledH2>H2a</StyledH2>
                <StyledH3>H3a</StyledH3>
                <StyledH4>H4a</StyledH4>
Jag vet inte hur det kommer se ut med text
</div>
        </TextWrapper>
        <Button>Klicka på knappen</Button>
        </PageWrapper>
        </>
    )
};