import React, { useState, useEffect } from "react";
import { getRandomIntInclusive } from "../helpers/random";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const allSymbols = [
  { id: 1, value: "bomb" },
  { id: 2, value: "crown" },
  { id: 3, value: "eye" },
  { id: 4, value: "fish" },
  { id: 5, value: "fire" },
  { id: 6, value: "hiking" },
  { id: 7, value: "fighterJet" },
  { id: 8, value: "spider" },
  { id: 9, value: "star" },
  { id: 10, value: "hatWizard" },
  { id: 11, value: ["fab", "grunt"] },
];

const getRandomSymbol = () => {
  const randomSymbol = allSymbols[getRandomIntInclusive(0, 10)];

  return randomSymbol;
};

const checkIfSymbolExist = (sym, arr) => {
  if (arr.includes(sym)) {
    getRandomSymbol();
  } else arr.push(sym);
  return arr;
};

function useRandomSymbols() {
  const [mySymbols, setMySymbols] = useState([]);

  const uniqueSymbols = [];
  let doubleSymbols = [];

  useEffect(() => {
    for (let i = 0; uniqueSymbols.length < 6; i++) {
      const newSym = getRandomSymbol();
      checkIfSymbolExist(newSym, uniqueSymbols);
    }

    const makeDoubles = () => { 
        uniqueSymbols.map((sym) => {
          for (let i = 0; i < 2; i++) {
            doubleSymbols.push(sym);
          }
        });
    }
    makeDoubles();

    let shuffledSymbols = [];

    while(doubleSymbols.length !== 0){
        let randomIndex = Math.floor(Math.random() * doubleSymbols.length);
        shuffledSymbols.push(doubleSymbols[randomIndex]);
        doubleSymbols.splice(randomIndex, 1)
    }
    doubleSymbols = shuffledSymbols;

    setMySymbols(doubleSymbols)
  }, []);
  return mySymbols;
}

const Symbols = () => {
  const mySymbols = useRandomSymbols();

  return (
  <>
    {mySymbols.map( ( x,i ) => <FontAwesomeIcon icon={x.value} key={i}/> )}
  </>
  );
};

export default Symbols;
