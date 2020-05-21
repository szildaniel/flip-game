import React, { useEffect, useRef, useState } from "react";
import { GlobalStyle } from "./index";
import { GameGrid } from "../styles/Styled.GameGrid";
import GameTile from "../components/GameTile";
import CurrentGameStats from "../components/CurrentGameStats";
import Timer from "../components/Timer";
import { useRandomSymbols } from "../helpers/symbol";
import { gsap } from "gsap";
import { useGameLogic } from "../helpers/gameLogic";


export default function Game() {
  const [isActive, setIsActive] = useState(false);
  const [gameTiles, setGameTiles] = useState([]);

  const toggleGame = () => {
    setIsActive(!isActive);
  }
  const mySymbols = useRandomSymbols();
  const gridRef = useRef(null);

  // add gameTiles to State
  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      setGameTiles((gameTiles) => [...gameTiles, <GameTile />]);
    }
  }, []);

  const {
    comparingCards,
    cardsMatching,
    cardsNotMatching,
    addUncoveredCardToCompare,
    countUncoveredCards,
  } = useGameLogic(gridRef);

  return (
    <div>
      <GlobalStyle />
      {isActive ? (
        <CurrentGameStats
          cardMatching={cardsMatching}
          cardNotMatching={cardsNotMatching}
        />
      ) : (
        <Timer toggleGame={toggleGame} />
      )}

      <GameGrid ref={gridRef} onClick={countUncoveredCards}>
        {gameTiles.map((x, i) => (
          <GameTile
            key={i}
            mySymbol={mySymbols[i]}
            addCard={addUncoveredCardToCompare}
            cards={comparingCards}
            cardMatching={cardsMatching}
            cardNotMatching={cardsNotMatching}
          />
        ))}
      </GameGrid>
    </div>
  );
}
