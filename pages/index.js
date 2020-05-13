import Intro from "../components/Intro";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
  body{
      margin: 0;
      background: url("/images/tic-tac-toe.png");
      font-family: Helvetica, sans-serif;
      overflow: hidden;
  }
  a{
    color: inherit;
    text-decoration: inherit;
  }
  .introCard{
    box-sizing: border-box;
    position: absolute;
    backface-visibility: hidden;
    
  }
  .front{
    display: flex;
  }

  .cardFace {
  position: absolute;
  overflow: hidden;
  color: white;
  width: 100%;
  height: 200px;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  &.front{
    background: #A3333D;
  }
  &.back{
    background: #291F1E;
  }
}
`;

export default function MyPage() {
  return (
    <div>
      <GlobalStyle />
      <Intro />
    </div>
  );
}

export { GlobalStyle };
