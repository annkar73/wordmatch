import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ThemeToggleButton } from "./ThemeToggleButton";

interface HeaderProps {
  onThemeToggle: () => void;
  themeName: string;
}

const HeaderContainer = styled.header`
  position: fixed; /* Fäster headern högst upp */
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.headerBg};
  color: ${(props) => props.theme.headerText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const LeftSection = styled.div`
  max-width: 100px; /* Begränsar bredden */
  display: flex;
  justify-content: flex-start;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 15px; /* Lägger till mellanrum mellan länkar */
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.headerText};
  font-size: 1rem;
  transition: color 0.3s ease;

  &.active {
    font-weight: bold;
    text-decoration: underline;
    color: ${(props) => props.theme.buttonHoverText};
  }

  &:hover {
    color: ${(props) => props.theme.buttonHoverText};
  }
`;

export const Header = ({ onThemeToggle, themeName }: HeaderProps) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <ThemeToggleButton onClick={onThemeToggle} themeName={themeName} />
      </LeftSection>
      <CenterSection>
        <Title>OrdMatch</Title>
      </CenterSection>
      <RightSection>
        <StyledNavLink to="/">Hem</StyledNavLink>
        <StyledNavLink to="/matching-game">Matcha ord</StyledNavLink>
        <StyledNavLink to="/classic-memory">Klassiskt Memory</StyledNavLink>
        <StyledNavLink to="/faq">FAQ</StyledNavLink>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
