import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { handleKeyboard } from "../helpers/keyboard";

export function useGameLogic(gridRef) {
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [uncover, setUncover] = useState(0);
  const [cardsToCompare, setCardsToCompare] = useState([]);

  const [cardsMatching, setCardsMatching] = useState(0);
  const [cardsNotMatching, setCardsNotMatching] = useState(0);

  const toggleGame = () => {
    setIsActive(!isActive);
  };

  const togglePause = () => {
    setIsPaused((isPaused) => !isPaused);
  };

  const resetCards = () => {
    setCardsToCompare([]);
  };

  const countUncoveredCards = () => {
    if (!isPaused) {
      setUncover(uncover + 1);
    }
  };
  const addUncoveredCardToCompare = (card) => {
    setCardsToCompare([...cardsToCompare, card])
  }
  const compareCards = (card1, card2) => {
    const sameCards = card1 === card2;
    const differentCards = card1 !== card2;

    if (sameCards) {
      setCardsMatching((cardsMatching) => cardsMatching + 1);
    } 
    else if (differentCards) {
      setCardsNotMatching((cardsNotMatching) => cardsNotMatching + 1);
    }

    resetCards();
  };

  // if user uncover 2 cards compare cards
  useEffect(() => {
    if (cardsToCompare.length === 2) {
      compareCards(cardsToCompare[0], cardsToCompare[1]);
    }
  }, [cardsToCompare]);

  // if user uncover 2 cards, reset counter
  useEffect(() => {
    let delay;
    if (uncover >= 2) {
      delay = setTimeout(() => setUncover(0), 400);
    }
    return () => clearTimeout(delay);
  }, [uncover]);

  // flash game grid after 5s
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
  return {
    cardsToCompare,
    setCardsToCompare,
    cardsMatching,
    cardsNotMatching,
    countUncoveredCards,
    isPaused,
    isActive,
    toggleGame, 
    addUncoveredCardToCompare
  };
}
