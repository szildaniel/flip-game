import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { handleKeyboard } from "../keyboard";
import Router from "next/router";

export function useGameLogic(gridRef) {
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [uncover, setUncover] = useState(0);
  const [cardsToCompare, setCardsToCompare] = useState([]);

  const [cardsMatching, setCardsMatching] = useState(0);
  const [cardsNotMatching, setCardsNotMatching] = useState(0);
  const [abandoned, setAbandoned] = useState();

  const userEscaped = () => {
    const cookiesObject = Object.fromEntries(
      document.cookie.split("; ").map((c) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );
    const userAlreadyAbandon = cookiesObject.abandoned;
    if (!userAlreadyAbandon) {
      document.cookie = `abandoned=1; path=/`;
      Router.push("/");
    }
    if (userAlreadyAbandon) {
      const numberOfAbandonedGames = Number(cookiesObject.abandoned);
      document.cookie = `abandoned=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `abandoned=${numberOfAbandonedGames + 1}; path=/;`;
      Router.push("/");
    }
    (function clearLastScoreFromCookies(){ 
      if(cookiesObject.lastScore) document.cookie = `lastScore=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    })();
  };
  
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
    setCardsToCompare([...cardsToCompare, card]);
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
      { autoAlpha: 1, delay: 4 }
    );
  }, []);

  function myKeyboardFn(e){
    handleKeyboard(e, togglePause, userEscaped);
  }
  // take abandoned from cookies
  useEffect(() => {
    const cookiesObject = Object.fromEntries(
      document.cookie.split("; ").map((c) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );
    const userAlreadyLeftGame = cookiesObject.abandoned;
    if (!userAlreadyLeftGame) setAbandoned(0);
    if (userAlreadyLeftGame) {
      const quantityAbandoned = Number(cookiesObject.abandoned);
      setAbandoned(quantityAbandoned);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", myKeyboardFn)
    return () =>
      window.removeEventListener("keydown", myKeyboardFn)
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
    addUncoveredCardToCompare,
    resetCards
  };
}
