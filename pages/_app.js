import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { device } from "../styles/breakpoints";

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
    font-size: 0.8em;
    margin: 8px 0;
    @media ${device.laptop}{
      font-size: 1em;
      margin: 10px 0;
    }
    &:first-of-type{
      font-size: .95rem;
      @media ${device.laptop}{
        font-size:1.2rem;
      }
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
  height: 115px;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
  .fa-6x{
    font-size: 3.5em;
  }
  @media ${device.laptop}{
    height: 200px;
    .fa-6x{
    font-size: 6em;
  }
  }
  &.front{
    background: #A3333D;
  }
  &.back{
    /* background: #3ca333; */
    background: #2f6e2a;
  }
  &.front--info {
    height: 175px;
    width: 175px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    background: #291F1E; 
    transform: rotateY(-180deg);
    margin:5px;
    @media ${device.laptop}{
      height: 250px;
      width: 250px;
      margin: 10px;
    }
  }
  &.back--info {
    width: 360px;
    height: 175px;
    background: #432624;
    border: 2px solid black;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 2px 12px;
    margin-top: 5px;
    @media ${device.laptop}{
      width: 520px;
      height: 250px;
      margin-top: 10px;
    transform: translateX(-10px);

    }
    p{
      padding: 0.15rem 0;
      margin: 0;
    @media ${device.laptop}{
      padding: 0.3rem 0;
    }
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
  height: 175px;
  width: 360px;
  box-sizing: border-box;
  @media ${device.laptop}{
      width: 520px;
      height: 250px;
    }
  & a{
    width: 180px;
    @media ${device.laptop}{
    width: 250px;

    }
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
