import { styled } from "styled-components";
import { fontSizes } from "../../styles/variables";

const HeaderTitle = styled.h1`
background: ${(props) => `linear-gradient(45deg, ${props.theme.gradientOne}, ${props.theme.gradientTwo}, ${props.theme.gradientThree}, ${props.theme.gradientFour})`};
background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;  text-transform: capitalize;
  font-style: italic;
  font-size: ${fontSizes.heading};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

export const StyledH1 = styled.h1`
    font-size: ${fontSizes.h1};
    margin-top: 25px;
`;

export const StyledH2 = styled.h2`
font-size: ${fontSizes.h2};
`;

export const StyledH3 = styled.h3`
font-size: ${fontSizes.h3};

`;

export const StyledH4 = styled.h4`
font-size: ${fontSizes.h4};

`;
export default HeaderTitle;