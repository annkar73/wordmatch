import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { HashRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { lightTheme, darkTheme, getDefaultTheme } from "./styles/theme";
import Router from "./Router"; // Din router
import Header from "./Components/Header";

const App = () => {
  const [theme, setTheme] = useState(getDefaultTheme());

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme.name === "light" ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HashRouter>
        {/* Header med temat */}
        <Header onThemeToggle={toggleTheme} themeName={theme.name} />
        {/* Dina sidor */}
        <Router />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
