import Intro from "../components/Intro";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
      margin: 0;
      background: url("/images/tic-tac-toe.png");
      font-family: Helvetica, sans-serif;
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
