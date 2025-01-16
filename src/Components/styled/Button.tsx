import styled from "styled-components";
import {
  borderRadius,
  breakpoints,
  fontSizes,
  shadows,
  spacing,
} from "../../styles/variables";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  to?: string;
}
const Button = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  width: 80%;
  min-height: 45px;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  padding: ${spacing.small} ${spacing.medium};
  border: none;
  border-radius: ${borderRadius.medium};
  font-size: ${fontSizes.base};
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${shadows.medium};
  display: inline-block;
  text-align: center;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
    color: ${(props) => props.theme.buttonHoverText};
    transform: scale(1.05);
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fontSizes.h4};
    padding: ${spacing.medium} ${spacing.large};
  }
`;
export default Button;