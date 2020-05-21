import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
// count Uncover Clicks

export function useGameLogic(gridRef) {
  const [uncover, setUncover] = useState(0);
  const [comparingCards, setComparingCards] = useState([]);

  const [cardsMatching, setCardsMatching] = useState(0);
  const [cardsNotMatching, setCardsNotMatching] = useState(0);

  const resetCards = () => {
    setComparingCards([]);
  };

  const countUncoveredCards = () => {
    setUncover(uncover + 1);
  };

  const addUncoveredCardToCompare = (card) => {
    setComparingCards([...comparingCards, card]);
  };

  const compareCards = (card1, card2) => {
    const sameCards = card1 === card2;
    const differentCards = card1 !== card2;

    if (sameCards) {
      setCardsMatching((cardsMatching) => cardsMatching + 1);
    } else if (differentCards) {
      setCardsNotMatching((cardsNotMatching) => cardsNotMatching + 1);
    }

    resetCards();
  };

  // if user uncover 2 cards compare cards
  useEffect(() => {
    if (comparingCards.length === 2) {
      compareCards(comparingCards[0], comparingCards[1]);
    }
  }, [comparingCards]);

  // if user uncover 2 cards, reset counter
  useEffect(() => {
    let delay;
    if (uncover >= 2) {
      delay = setTimeout(() => setUncover(0), 400);
    }
    return () => clearTimeout(delay);
  }, [uncover]);

  // at the begginig flash in game grid
  useEffect(() => {
    gsap.fromTo(
      gridRef.current,
      0.5,
      { autoAlpha: 0 },
      { autoAlpha: 1, delay: 1 }
    );
  }, []);
  return [
    comparingCards,
    cardsMatching,
    cardsNotMatching,
    addUncoveredCardToCompare,
    countUncoveredCards,
  ];
}
