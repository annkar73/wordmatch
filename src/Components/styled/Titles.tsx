import { styled } from "styled-components";
import { colors, fontSizes } from "../../helpers/variables";

export const HeaderTitle = styled.h1`
color: ${colors.textSecondary};
  text-transform: capitalize;
  font-style: italic;
  font-size: ${fontSizes.heading};
  font-weight: bold;
  text-align: center;
`;
export const StyledH1 = styled.h1`
    color: ${colors.textPrimary};
    font-size: ${fontSizes.h1};
`;

export const StyledH2 = styled.h2`
color: ${colors.textPrimary};
font-size: ${fontSizes.h2};
`;

export const StyledH3 = styled.h3`
color: ${colors.textPrimary};
font-size: ${fontSizes.h3};

`;

export const StyledH4 = styled.h4`
color: ${colors.textPrimary};
font-size: ${fontSizes.h4};

`;