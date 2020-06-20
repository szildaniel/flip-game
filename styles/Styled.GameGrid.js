import styled from 'styled-components';
import { device } from "../styles/breakpoints";

export const GameGrid = styled.div`
  width: 100vw;
  height: 55vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  @media ${device.laptopL}{
    width: 60vw;
    height: 80vh;
  }
`;
