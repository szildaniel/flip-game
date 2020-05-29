import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";

const GlobalStyle = createGlobalStyle`
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
    padding-left: 0.2rem;
    padding-right: 0.8rem;
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
    height: 250px;
    width: 250px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    background: #291F1E; 
    transform: rotateY(-180deg);
    margin:10px;
    }
  &.back--info {
    width: 520px;
    height: 250px;
    background: #432624;
    border: 2px solid black;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 2px 12px;
    transform: translateX(-10px);
    margin-top: 10px;
    p{
      padding: 0.3rem 0;
      margin: 0;
    }
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
.second-row{
  height: 250px;
  width: 520px;
  box-sizing: border-box;
  & a{
    width: 250px;
  }
}
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="application">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Component {...pageProps} />
      <GlobalStyle />
    </div>
  );
}
