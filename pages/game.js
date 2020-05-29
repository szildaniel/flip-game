import React, { useEffect, useRef, useState } from "react";

import { GameGrid } from "../styles/Styled.GameGrid";
import GameTile from "../components/GameTile";
import CurrentGameStats from "../components/CurrentGameStats";
import Timer from "../components/Timer";
import { ProgressBar } from "../components/ProgressBar";
import { useRandomSymbols } from "../helpers/symbol";
import { useGameLogic } from "../helpers/gameLogic";

export default function Game({ initialRememberValue }) {
  const gridRef = useRef(null);

  const {
    cardsToCompare,
    setCardsToCompare,
    cardsMatching,
    cardsNotMatching,
    countUncoveredCards,
    isPaused,
    isActive,
    toggleGame,
    addUncoveredCardToCompare,
  } = useGameLogic(gridRef);

  const mySymbols = useRandomSymbols();

  const [gameTiles, setGameTiles] = useState([]);

  // add gameTiles to State
  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      setGameTiles((gameTiles) => [...gameTiles, <GameTile />]);
    }
  }, []);

  return (
    <div>
      <ProgressBar isPaused={isPaused} cardsMatching={cardsMatching} />
      {isActive ? (
        <CurrentGameStats
          cardMatching={cardsMatching}
          cardNotMatching={cardsNotMatching}
          isPaused={isPaused}
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
            setCardsToCompare={setCardsToCompare}
            cards={cardsToCompare}
            cardMatching={cardsMatching}
            cardNotMatching={cardsNotMatching}
            isPaused={isPaused}
          />
        ))}
      </GameGrid>
    </div>
  );
}

