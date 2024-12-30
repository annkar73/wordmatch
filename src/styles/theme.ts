import { borderRadius, breakpoints, fontSizes, shadows, spacing } from "./variables";

export const lightTheme = {
    name: "light",
    background: "#e6bfcc",
    text: "#4f021b",
    buttonBackground: "#e98dad",
    buttonText: "#2f0145",
    buttonHoverBackground: "#4f021b",
    buttonHoverText: "#ffffff",
    toggleBg: "#4f021b",
    toggleHandle: "#fff",
    headerBg: "#e6bfcc",
    headerText: "#4f021b",
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
