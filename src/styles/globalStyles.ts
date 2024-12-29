import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Arial', sans-serif;
  }

  a {
    color: ${(props) => props.theme.primary};
    text-decoration: none;
  }
`;
