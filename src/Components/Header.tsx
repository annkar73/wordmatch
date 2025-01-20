import styled from "styled-components";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { Navigation } from "./Navigation";

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
  justify-content:space-between;
  align-items: center;
  padding: 10px 20px;
  //margin: 0 auto;
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

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  text-align: center;
`;

export const Header = ({ onThemeToggle, themeName }: HeaderProps) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <ThemeToggleButton onClick={onThemeToggle} themeName={themeName} />
      </LeftSection>
      <CenterSection>
        <Title></Title>
      </CenterSection>
      <RightSection>
        <Navigation />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
