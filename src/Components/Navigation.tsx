import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";
import { breakpoints } from "../styles/variables";

interface HamburgerButtonProps {
  $isOpen: boolean;
}

const NavContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const HamburgerButton = styled.button<HamburgerButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 10px;
  z-index: 1010;

  span {
    display: block;
    width: 24px;
    height: 3px;
    background-color: ${(props) => props.theme.headerText};
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;

    &:nth-child(1) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(45deg) translate(5px, 5px)" : "none"};
    }
    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"};
    }
  }

  /* Hides hamburger menu on larger screens */
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const Menu = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${(props) => props.theme.navBg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;

  li {
    padding: 10px 20px;
    text-align: right;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.navText};
      font-size: 1rem;
      white-space: nowrap;
      transition: color 0.3s ease;

      &.active {
        font-weight: bold;
        text-decoration: none;
        color: ${(props) => props.theme.navText};
      }

      &:hover {
        font-weight: bold;
        color: ${(props) => props.theme.navText};
      }
    }
  }
`;

const DesktopMenu = styled.ul`
  list-style: none;
  display: none;
  gap: 20px;

  li {
    position: relative;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.navBg};
      font-size: 1rem;
      transition: color 0.3s ease;

      &.active {
        font-weight: bold;
        text-decoration: underline;
        color: ${(props) => props.theme.navBg};
      }

      &:hover {
        font-weight: bold;
        color: ${(props) => props.theme.navBg};
      }
    }

    /* Submenu styling */
    &:hover ul {
      display: block;
    }
  }

  /* Shows desktop menu on larger screens */
  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

const SubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: -15px;
  //color: ${(props) => props.theme.navText};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: none; /* Hidden by default */
  z-index: 1000;

  li {
    padding: 10px 20px;

    a {
      text-decoration: none;
      color: ${(props) => props.theme.navBg};
      white-space: nowrap;
      transition: color 0.3s ease;

      &:hover {
        font-weight: bold;
        color: ${(props) => props.theme.navBg};
      }
    }
  }
`;

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavContainer>
      {/* Desktop Navigation */}
      <DesktopMenu>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Hem
          </NavLink>
        </li>
        <li>
          <NavLink to="/games" onClick={closeMenu}>
            Spela ett spel
          </NavLink>
          <SubMenu>
            <li>
              <NavLink to="/matching-game" onClick={closeMenu}>
                Matcha ord
              </NavLink>
            </li>
            <li>
              <NavLink to="/classic-memory" onClick={closeMenu}>
                Klassiskt Memory
              </NavLink>
            </li>
          </SubMenu>
        </li>
        <li>
          <NavLink to="/faq" onClick={closeMenu}>
            Mer info
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={closeMenu}>
            Kontakt
          </NavLink>
        </li>
      </DesktopMenu>

      {/* Hamburger Button */}
      <HamburgerButton
        $isOpen={isOpen}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>

      {/* Mobile Navigation */}
      {isOpen && (
        <Menu
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" onClick={closeMenu}>
              Spela ett spel
            </NavLink>
          </li>
          <li>
            <NavLink to="/matching-game" onClick={closeMenu}>
              Matcha ord
            </NavLink>
          </li>
          <li>
            <NavLink to="/classic-memory" onClick={closeMenu}>
              Klassiskt Memory
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" onClick={closeMenu}>
              Mer info
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              Kontakt
            </NavLink>
          </li>
        </Menu>
      )}
    </NavContainer>
  );
};
