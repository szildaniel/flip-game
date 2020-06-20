import styled from "styled-components";
import { device } from "../styles/breakpoints";

export const IntroContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 95vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${device.laptopL} {
    width: 70vw;
  }
`;

export const CardContainer = styled.div`
  position: relative;
  width: 350px;
  height: 175px;
  margin-bottom: 10px;
  @media ${device.laptopL} {
    width: 500px;
    height: 250px;
    margin-bottom: 20px;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
`;

export const PlayInfo = styled.span`
  display: block;
  color: #656363;
`;
