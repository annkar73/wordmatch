import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale; 
  }

  a {
    color: ${(props) => props.theme.primary};
    text-decoration: none;
    -webkit-tap-highlight-color: transparent; 
  }

  button, input, textarea {
    -webkit-appearance: none; 
    -moz-appearance: none; 
    appearance: none; 
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box; 
  }
  
  img {
    max-width: 100%;
    height: auto;
    -webkit-user-drag: none; 
  }

  ::selection {
    background-color: ${(props) => props.theme.selectionBackground};
    color: ${(props) => props.theme.selectionText};
    -webkit-text-fill-color: ${(props) => props.theme.selectionText};
  }

  /* Media Queries */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    
  }
`;
