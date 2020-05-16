import React, { useEffect, useRef, useState } from "react";
import { GlobalStyle } from "./index";
import styled from "styled-components";
import GameTile from "../components/GameTile";
import CurrentGameStats from "../components/CurrentGameStats";
import Timer from "../components/Timer";

import { gsap } from "gsap";

const GameGrid = styled.div`
  width: 60vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;

export default function Game() {
  const [isActive, setIsActive] = useState(false);
  const [uncover, setUncover] = useState(0);
  const [gameClicks, setGameClicks] = useState(0);

  const [gameTiles, setGameTiles] = useState([]);

  const gridRef = useRef(null);

  const countClicks = () => {
    setGameClicks( gameClicks => gameClicks + 1)
    setUncover(uncover+1)
  }

  useEffect( () => {
    for(let i=0; i<12; i++){
      setGameTiles( gameTiles => [...gameTiles, <GameTile />])
    }
  }, [])

  useEffect( () => { 
    let delay;
    if(uncover >= 2){
       delay = setTimeout( () => setUncover(0), 400);
    }
    return () => clearTimeout(delay)
  }, [uncover])

  const toggleGame = () => {
  setIsActive(!isActive)
  }

  useEffect( () => {
    gsap.fromTo(gridRef.current, .5, {autoAlpha: 0}, { autoAlpha: 1, delay: 1})
  }, [])

  return (
    <div>
      <GlobalStyle />
      {isActive ? 
        <CurrentGameStats gameClicks={gameClicks}/> 
        : <Timer toggleGame={toggleGame}/> }

      <GameGrid ref={gridRef} onClick={countClicks}>
        {gameTiles.map( (x,i) => 
          <GameTile key={i} uncover={uncover} />
        )}
      </GameGrid>
    </div>
  );
}
