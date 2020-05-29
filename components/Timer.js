import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { gsap, Back } from "gsap";

const StyledH2 = styled.h2`
  text-align: center;
  font-family: 'Indie Flower', cursive;
  color: #291F1E;
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Seconds = styled.span`
  font-family: 'Indie Flower', cursive;
  display: block;
  font-size: 5rem;
  font-weight: bolder;
  text-align: center;
  color: #A3333D;
  text-shadow: 2px 2px 2px black;
`;
const Timer = (props) => {
  const [sec, setSec] = useState(4);
  const [isActive, setIsActive] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const secRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      secRef.current,
      0.5,
      {
        scale: 0.6,
        opacity: 0.93,
      },
      {
        scale: 1,
        opacity: 1,
        ease: Back.easeOut,
      }
    );
  }, [sec]);

  useEffect(() => {
    let interval = null;

    if (isActive && sec > 0) {
      interval = setInterval(() => {
        setSec((sec) => sec - 1);
      }, 1000);
    } else if (!isActive && sec !== 4) {
      clearInterval(interval);
    }
    else if(sec===0){
        setGameStarted(true);
        props.toggleGame();
    }
    return () => clearInterval(interval);
  }, [isActive, sec]);
  return (
    <>
      {gameStarted ? (
        <StyledH2>START</StyledH2>
      ) : (
        <StyledH2>
          {sec <= 2 ? `Good luck! Happy flipping !` : ''}
          <Seconds ref={secRef}>
            {sec}s
          </Seconds>
        </StyledH2>
      )} 
    </>
  );
};

export default Timer;
