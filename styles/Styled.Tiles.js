import styled from "styled-components";
import { device } from "../styles/breakpoints";

const Tile = styled.div`
  width: 175px;
  height: 175px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  box-sizing: border-box;
  color: white;
  @media ${device.laptop} {
    width: 250px;
    height: 250px;
    margin: 10px;
  }
`;
export const FirstTile = styled(Tile)`
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  background: #a3333d;
`;

export const SecondTile = styled(Tile)`
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  background: #06aed5;
`;

export const ThirdTile = styled(Tile)`
  border-top: 2px solid black;
  border-right: 2px solid black;
  background: #291f1e;
`;

export const FourthTile = styled(Tile)`
  border-top: 2px solid black;
  border-left: 2px solid black;
  background: #477998;
`;

export const FlippedDiv = styled.div`
  width: 360px;
  height: 175px;
  margin: 5px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background: #c4d6b0;
  @media ${device.laptop} {
    width: 520px;
    height: 250px;
    margin: 10px;
  }
  div {
    margin: 5px 0;
  }
  a {
    font-weight: bold;
    color: #0984ac;
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  height: 125px;
  cursor: ${(props) => (props.isClickable ? "pointer" : "arrow")};
  position: relative;
  @media ${device.laptop}{
    height: 200px;
  }
`;
