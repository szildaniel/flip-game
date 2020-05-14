import Intro from "../components/Intro";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
  body{
      margin: 0;
      background: url("/images/bg.png");
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
  p{
    margin: 10px 0;
    &:first-of-type{
      font-size:1.2rem;
    }
  }
  sup{
    color: black;
    font-style: italic;
    opacity: 0.7;
    text-transform: uppercase;
    font-size: 0.75rem;
  }
  .front{
    display: flex;
  }
  .card{
    transform: rotateY(-180deg);

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
  border: 1px solid black;
  box-sizing: border-box;

  &.front{
    background: #A3333D;
  }
  &.back{
    /* background: #3ca333; */
    background: #2f6e2a;
  }
  &.front--info {
    border-top: 2px solid black;
    border-right: 2px solid black;
    background: #291F1E; 
    transform: rotateY(-180deg);
    }
  &.back--info {
    background: #432624;
    border: 2px solid black;
    flex-direction: column;
    justify-content: flex-start;
    padding: 15px 5px;
  }
  &.front--play {
    background: #477998;
    border-top: 2px solid black;
    border-left: 2px solid black;
  }
  &.back--play {
    background: #479866;
    border: 2px solid black;
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
