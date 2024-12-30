import styled from "styled-components";
import { shadows } from "../../styles/variables";

// button for choices
export const Button = styled.button`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: auto;
    margin: 20px 10px;
    padding: 20px 10px;
    border-radius: 12px;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    justify-content: center;
    align-items: center;
    box-shadow: ${shadows.medium};
`;