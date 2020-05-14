import styled from "styled-components";

const Tile = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  box-sizing: border-box;
  color: white;
`;
export const FirstTile = styled(Tile)`
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  background: #A3333D;
`;

export const SecondTile = styled(Tile)`
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  background: #06AED5;
`;

export const ThirdTile = styled(Tile)`
  border-top: 2px solid black;
  border-right: 2px solid black;
  background: #291F1E;
`;

export const FourthTile = styled(Tile)`
  border-top: 2px solid black;
  border-left: 2px solid black;
  background: #477998;
`;

export const FlippedDiv = styled.div`
  width: 420px;
  height: 200px;
  margin: 10px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background: #C4D6B0;
  div{
    margin: 5px 0;
  }
  a{
    font-weight: bold;
    color: #0984ac;
  }
`;
