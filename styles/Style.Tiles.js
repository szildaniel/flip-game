import styled from "styled-components";


const Tile = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
  box-sizing: border-box;
`;
export const FirstTile = styled(Tile)`
  border-bottom: 2px solid black;
  border-right: 2px solid black;
`;

export const SecondTile = styled(Tile)`
  border-bottom: 2px solid black;
  border-left: 2px solid black;
`;

export const ThirdTile = styled(Tile)`
  border-top: 2px solid black;
  border-right: 2px solid black;
`;

export const FourthTile = styled(Tile)`
  border-top: 2px solid black;
  border-left: 2px solid black;
`;

export const FlippedDiv = styled.div`
  width: 420px;
  height: 200px;
  margin: 10px 0;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

`;