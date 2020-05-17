import React, { useEffect, useRef, useState } from "react";
import { GlobalStyle } from "./index";
import { GameGrid } from "../styles/Styled.GameGrid";
import GameTile from "../components/GameTile";
import CurrentGameStats from "../components/CurrentGameStats";
import Timer from "../components/Timer";
import { useRandomSymbols } from "../helpers/symbol";
import { gsap } from "gsap";

export default function Game() {
  const [isActive, setIsActive] = useState(false);
  const [uncover, setUncover] = useState(0);
  const [gameClicks, setGameClicks] = useState(0);
  const [gameTiles, setGameTiles] = useState([]);

  const [comparedCards, setComparedCards] = useState([]);

  const [cardMatching, setCardMatching] = useState(0);
  const [cardNotMatching, setCardNotMatching] = useState(0);


  const mySymbols = useRandomSymbols();

  const gridRef = useRef(null);

  const countClicks = () => {
    setGameClicks((gameClicks) => gameClicks + 1);
    setUncover(uncover + 1);
  };

  const resetCards = () => {
    setComparedCards([]);
  }
  
  const addUncoveredCardToCompare = (card) => {
    setComparedCards([...comparedCards, card]);
  };

  const compareCards = (card1, card2) => {
    if(card1 === card2){
      setCardMatching(cardMatching => cardMatching + 1)
    }
    else setCardNotMatching(cardNotMatching => cardNotMatching + 1);

    resetCards();
  }
  
  // add gameTiles to State
  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      setGameTiles((gameTiles) => [...gameTiles, <GameTile />]);
    }
  }, []);

  // if user uncover 2 cards, reset counter
  useEffect( () => {
    let delay;
    if (uncover >= 2) {
      delay = setTimeout(() => setUncover(0), 400);
    }
    return () => clearTimeout(delay);
  }, [uncover]);

  // just comparing cards
  useEffect( () => {
    if(comparedCards.length === 2 ){
      compareCards(comparedCards[0], comparedCards[1]);
    }
  }, [comparedCards])

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

  return (
    <div>
      <GlobalStyle />
      {isActive ? (
        <CurrentGameStats 
          gameClicks={gameClicks} 
          cardMatching={cardMatching} 
          cardNotMatching={cardNotMatching}/>
      ) : (
        <Timer toggleGame={toggleGame} />
      )}

      <GameGrid ref={gridRef} onClick={countClicks} >
        {gameTiles.map((x, i) => (
          <GameTile
            key={i}
            
            // uncover={uncover}
            mySymbol={mySymbols[i]}
            addCard={addUncoveredCardToCompare}
            cards={comparedCards}
            cardMatching={cardMatching}
            cardNotMatching={cardNotMatching}
          />
        ))}
      </GameGrid>
    </div>
  );
}
