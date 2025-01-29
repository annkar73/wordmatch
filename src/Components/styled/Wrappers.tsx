import { styled } from "styled-components";
import { shadows } from "../../styles/variables";

// page wrapper for each page
export const PageWrapper = styled.section`
  width: 100%;
  max-width: 1280px;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center; // Horizontal center
  justify-content: center; // Vertical center
  box-sizing: border-box;
  margin-top: 20px;
  margin: 0 auto;
  padding: 0 20px;
`;
// text wrapper for blocks of text
export const TextWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 12px;
  margin: 20px;
  padding: 20px 10px;
  box-shadow: ${shadows.medium};
`;
// game wrapper for behind game board
export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px;
  margin: 0 auto;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 75px;
  position: fixed;
  top: 0;
  left: 0;
  margin-bottom: 25px;
  align-items: center;
  justify-content: center;
`;
