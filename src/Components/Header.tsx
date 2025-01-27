import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Navigation } from "./Navigation";
import { pageTitles } from "../routes/titles";
import { breakpoints } from "../styles/variables";

interface HeaderProps {
  onThemeToggle: () => void;
  themeName: string;
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1280px;
  background-color: transparent;
  color: ${(props) => props.theme.headerText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 1000;
`;

const LeftSection = styled.div`
  max-width: 100px;
  display: flex;
  justify-content: flex-start;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

const StyledHeaderTitle = styled.h1`
 background: ${(props) =>
    `linear-gradient(45deg, ${props.theme.gradientOne}, ${props.theme.gradientTwo}, ${props.theme.gradientThree}, ${props.theme.gradientFour})`};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem; 
  font-weight: bold;
  text-align: center;
  margin: 0; 
  text-transform: uppercase;
   @media (min-width: ${breakpoints.tablet}) {
      font-size: 2.5rem;
      margin-left: 25%;
    }
`;
export const Header = ({ onThemeToggle, themeName }: HeaderProps) => {
  const location = useLocation(); // get current URL
  const currentTitle = pageTitles[location.pathname] || ""; // get title from titles.ts

  return (
    <HeaderContainer>
      <LeftSection>
        <ThemeToggleButton onClick={onThemeToggle} themeName={themeName} />
      </LeftSection>
      <CenterSection>
        {/* show title only if it is not empty */}
        {currentTitle && <StyledHeaderTitle>{currentTitle}</StyledHeaderTitle>}
      </CenterSection>
      <RightSection>
        <Navigation />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
