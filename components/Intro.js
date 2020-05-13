import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { gsap, Back } from "gsap";

import { IntroContainer } from "../styles/Styled.IntroContainer";
import {
  FirstTile,
  SecondTile,
  ThirdTile,
  FourthTile,
  FlippedDiv,
} from "../styles/Style.Tiles";

const CardContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const Letter = styled.span`
  display: block;
  font-size: 40px;
  text-transform: uppercase;
`;

export default function Intro() {
  let [divSide, setDivSide] = useState("front");

  const parentRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const rotationDiv = useRef(null);

  const handleClick = () => {

    if (divSide === "front") {
      gsap.to(rotationDiv.current.children[0], 1.2, {
        rotateY: 180,
        ease: Back.easeOut,
      });
      gsap.to(backRef.current, 1.2, { rotateY: 0, ease: Back.easeOut });
      setDivSide("back");
    }
    if (divSide === "back") {
      gsap.to(rotationDiv.current.children[0], 1.2, {
        rotateY: 0,
        ease: Back.easeOut,
      });
      gsap.to(backRef.current, 1.2, { rotateY: -180, ease: Back.easeOut });
      setDivSide("front");
    }
  };
  useEffect(() => {
    gsap.set(parentRef.current, { perspective: 800 });
    gsap.set(parentRef.current.children[0], { transformStyle: "preserve-3d" });
    gsap.set(backRef.current, { rotationY: -180 });
    gsap.set([backRef.current, frontRef.current], {
      backfaceVisibility: "hidden",
    });
  });


  return (
    <IntroContainer>
      <CardContainer ref={parentRef}>
        <Row ref={rotationDiv}>
          <div className="introCard front" ref={frontRef}>
            <FirstTile onClick={handleClick}>
              <Letter>F</Letter>
            </FirstTile>
            <SecondTile onClick={handleClick}>
              <Letter>L</Letter>
            </SecondTile>
          </div>
          <div className="introCard back" ref={backRef} onClick={handleClick}>
            <FlippedDiv>
              <div>
                Click{" "}
                <Link href="/game">
                  <a>here</a> 
                </Link>
                  {" "}to start game.
              </div>
              <div>1. Last Game Score: 6 hits</div>
              <div>2. Best Score: 23 sec</div>
            </FlippedDiv>
          </div>
        </Row>
      </CardContainer>

      <Row>
        <ThirdTile>
          <Letter>I</Letter>
        </ThirdTile>
        <FourthTile>
          <Letter>P</Letter>
        </FourthTile>
      </Row>
    </IntroContainer>
  );
}
