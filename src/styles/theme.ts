import { borderRadius, breakpoints, fontSizes, shadows, spacing } from "./variables";

export const lightTheme = {
    name: "light",
    background: "#f8e2f3",
    text: "#3c2a47",
    buttonBackground: "#f9c3e0",
    buttonText: "#3c2a47",
    buttonHoverBackground: "#f18db2",
    buttonHoverText: "#ffffff",
    toggleBg: "#3c2a47",
    toggleHandle: "#fff",
    headerBg: "#f4c9d6",
    headerText: "#3c2a47",
    borderRadius,
    spacing,
    shadows,
    fontSizes,
    breakpoints,
};

export const darkTheme = {
    name: "dark",
    background: "#82cbde",
    text: "#34495e",
    buttonBackground: "#34495e",
    buttonText: "#ecf0f1",
    buttonHoverBackground: "#1abc9c",
    buttonHoverText: "#ffffff",
    toggleBg: "#1abc9c",
    toggleHandle: "#fff",
    headerBg: "#16a085",
    headerText: "#ecf0f1",
    borderRadius,
    spacing,
    shadows,
    fontSizes,
    breakpoints,
};

export const getDefaultTheme = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? darkTheme
      : lightTheme;
