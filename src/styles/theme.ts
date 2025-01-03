import { borderRadius, breakpoints, fontSizes, shadows, spacing } from "./variables";

export const lightTheme = {
    name: "light",
    background: "#fefee7",
    text: "#4f021b",
    buttonBackground: "#e98dad",
    buttonText: "#2f0145",
    buttonHoverBackground: "#4f021b",
    buttonHoverText: "#ffffff",
    toggleBg: "#4f021b",
    toggleHandle: "#fff",
    headerBg: "#fefee7",
    headerText: "#4f021b",
    navBg: "#7a042a",
    navText: "#fefee7",
    gameBackground: "#f8dde8",
    borderColor: "#4f021b",
    borderRadius,
    spacing,
    shadows,
    fontSizes,
    breakpoints,
};

export const darkTheme = {
    name: "dark",
    background: "#43cdca",
    text: "#000000",
    buttonBackground: "#18455d",
    buttonText: "#d5f1ef",
    buttonHoverBackground: "#18455d",
    buttonHoverText: "#ffffff",
    toggleBg: "#18455d",
    toggleHandle: "#fff",
    headerBg: "#43cdca",
    headerText: "#18455d",
    navBg: "#18455d",
    navText: "#d5f1ef",
    gameBackground: "#c7f0ef",
    borderColor: "#000000",
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
