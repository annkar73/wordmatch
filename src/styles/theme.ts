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
    navBg: "#7a042a",
    navText: "#e6bfcc",
    borderRadius,
    spacing,
    shadows,
    fontSizes,
    breakpoints,
};

export const darkTheme = {
    name: "dark",
    background: "#0abcbb",
    text: "#18455d",
    buttonBackground: "#18455d",
    buttonText: "#d5f1ef",
    buttonHoverBackground: "#18455d",
    buttonHoverText: "#ffffff",
    toggleBg: "#18455d",
    toggleHandle: "#fff",
    headerBg: "#0abcbb",
    headerText: "#18455d",
    navBg: "#18455d",
    navText: "#d5f1ef",
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
