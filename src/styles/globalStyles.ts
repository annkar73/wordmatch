import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased; /* För smidigare text på webkit-baserade webbläsare */
    -moz-osx-font-smoothing: grayscale; /* För Firefox */
  }

  a {
    color: ${(props) => props.theme.primary};
    text-decoration: none;
    -webkit-tap-highlight-color: transparent; /* För att undvika highlight på länkar i iOS */
  }

  button, input, textarea {
    -webkit-appearance: none; /* Tar bort standardstilar i iOS */
    -moz-appearance: none; /* Tar bort standardstilar i Firefox */
    appearance: none; 
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box; /* För äldre webkit-baserade webbläsare */
  }
  
  img {
    max-width: 100%;
    height: auto;
    -webkit-user-drag: none; /* Förhindrar att användare kan dra bilder */
  }

  ::selection {
    background-color: ${(props) => props.theme.selectionBackground};
    color: ${(props) => props.theme.selectionText};
    -webkit-text-fill-color: ${(props) => props.theme.selectionText}; /* För att förbättra textfärg vid val på iOS */
  }

  /* Media Queries */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    /* Specifik kod för WebKit-enheter */
  }
`;
