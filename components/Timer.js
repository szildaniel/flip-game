import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { gsap, Back } from "gsap";

const StyledH2 = styled.h2`
  text-align: center;
  margin-top: 3rem;
  font-family: 'Indie Flower', cursive;
  color: #291F1E;
`;

const Seconds = styled.span`
  font-family: 'Indie Flower', cursive;
  display: block;
  font-size: 2rem;
  font-weight: bolder;
  color: #291F1E;
  text-align: center;
`;
const Timer = (props) => {
  const [sec, setSec] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const secRef = useRef(null);

  const toggle = () => setIsActive(!isActive);

  useEffect(() => {
    gsap.fromTo(
      secRef.current,
      0.5,
      {
        scale: 0.7,
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
    } else if (!isActive && sec !== 5) {
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
          Be ready! Your game gonna start after:
          <Seconds ref={secRef}>
            {sec} {sec === 1 || sec == 0 ? "second" : "seconds"}
          </Seconds>
        </StyledH2>
      )} 
    </>
  );
};

export default Timer;
