import React, { useEffect, useRef, useState } from "react";
import { GlobalStyle } from "./index";
import styled from "styled-components";
import GameTile from "../components/GameTile";
import Timer from "../components/Timer";

import { gsap } from "gsap";

const GameGrid = styled.div`
  width: 60vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;


export default function Game() {
  const [isActive, setIsActive] = useState(false);

  const gridRef = useRef(null);

const toggleGame = () => {
  setIsActive(!isActive)
}

  useEffect( () => {
    gsap.fromTo(gridRef.current, .5, {autoAlpha: 0}, { autoAlpha: 1, delay: 5})
  }, [])

  return (
    <div>
      <GlobalStyle />
      {isActive ? <h3>Stats</h3> : <Timer toggleGame={toggleGame}/>}
      <GameGrid ref={gridRef}>
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />
        <GameTile />

      </GameGrid>
    </div>
  );
}
