import styled from "styled-components";
import { device } from "../styles/breakpoints";

export const GameGrid = styled.div`
  width: 90vw;
  height: 55vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  box-sizing: content-box; 
  @media ${device.mobileS}{
    top: 45%;
  }
  @media ${device.laptop}{
    width: 60vw;
  }
   @media ${device.laptopL} {
    width: 60vw;
  };
  
`;
