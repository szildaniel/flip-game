import React, { useEffect, useRef, useState } from "react";

import { GlobalStyle } from "./index";
import { GameGrid } from "../styles/Styled.GameGrid";
import GameTile from "../components/GameTile";
import { ProgressBar } from "../components/ProgressBar";
import CurrentGameStats from "../components/CurrentGameStats";
import Timer from "../components/Timer";
import { useRandomSymbols } from "../helpers/symbol";
import { gsap } from "gsap";
import { handleKeyboard } from "../helpers/keyboard";

export default function Game() {
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [uncover, setUncover] = useState(0);
  const [gameTiles, setGameTiles] = useState([]);

  const [comparedCards, setComparedCards] = useState([]);

  const [cardMatching, setCardMatching] = useState(0);
  const [cardNotMatching, setCardNotMatching] = useState(0);

  const mySymbols = useRandomSymbols();

  const gridRef = useRef(null);

  const countClicks = () => {
    setUncover(uncover + 1);
  };

  const togglePause = () => {
    setIsPaused( isPaused => !isPaused);
  };

  const resetCards = () => {
    setComparedCards([]);
  };

  const addUncoveredCardToCompare = (card) => {
    setComparedCards([...comparedCards, card]);
  };

  const compareCards = (card1, card2) => {
    if (card1 === card2) {
      setCardMatching((cardMatching) => cardMatching + 1);
    } else setCardNotMatching((cardNotMatching) => cardNotMatching + 1);

    resetCards();
  };

  // add gameTiles to State
  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      setGameTiles((gameTiles) => [...gameTiles, <GameTile />]);
    }
  }, []);

  // if user uncover 2 cards, reset counter
  useEffect(() => {
    let delay;
    if (uncover >= 2) {
      delay = setTimeout(() => setUncover(0), 400);
    }
    return () => clearTimeout(delay);
  }, [uncover]);

  // just comparing cards
  useEffect(() => {
    if (comparedCards.length === 2) {
      compareCards(comparedCards[0], comparedCards[1]);
    }
  }, [comparedCards]);

  const toggleGame = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    gsap.fromTo(
      gridRef.current,
      0.5,
      { autoAlpha: 0 },
      { autoAlpha: 1, delay: 1 }
    );
  }, []);

  useEffect(() => {
    addEventListener("keydown", (e) => handleKeyboard(e, togglePause));
    return () =>
      removeEventListener("keydown", (e) => handleKeyboard(e, togglePause));
  }, []);

  return (
    <div>
      <GlobalStyle />
      <ProgressBar isPaused={isPaused} />
      {isActive ? (
        <CurrentGameStats
          cardMatching={cardMatching}
          cardNotMatching={cardNotMatching}
          isPaused={isPaused}
        />
      ) : (
        <Timer toggleGame={toggleGame} />
      )}

      <GameGrid
        ref={gridRef}
        onClick={countClicks}
        onKeyDown={(e) => handleKeyboard(e, togglePause)}
      >
        {gameTiles.map((x, i) => (
          <GameTile
            key={i}
            mySymbol={mySymbols[i]}
            addCard={addUncoveredCardToCompare}
            cards={comparedCards}
            cardMatching={cardMatching}
            cardNotMatching={cardNotMatching}
            isPaused={isPaused}
          />
        ))}
      </GameGrid>
    </div>
  );
}
