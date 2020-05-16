import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { gsap, Back } from "gsap";
import { IntroContainer } from "../styles/Styled.IntroContainer";
import { SpanLetters } from "../styles/Styled.SpanLetters";
import ThirdTile from "../components/ThirdTile";

import {
  FirstTile,
  SecondTile,
  FourthTile,
  FlippedDiv,
} from "../styles/Styled.Tiles";

const CardContainer = styled.div`
  position: relative;
  width: 500px;
  height: 250px;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const PlayInfo = styled.span`
  display: block;
  color: #656363;
`;

export default function Intro() {
  let [divSide, setDivSide] = useState("front");
  let [fourthTileSide, setFourthTileSide] = useState("front");

  const parentRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const rotationDiv = useRef(null);
  const fourthTileRef = useRef(null);

  const changeSide = () => {
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

  useEffect( () => {
    if(fourthTileSide==="front"){
      gsap.to(fourthTileRef.current, .3, {autoAlpha:0 })
    }
    else if(fourthTileSide === "back"){
      gsap.to(fourthTileRef.current, .3, {autoAlpha: 1})

    }
  }, [fourthTileSide])

  const animateFourthTile = () => { 
    if(fourthTileSide === "front"){
      setFourthTileSide("back");
    }
    else if(fourthTileSide === "back"){
      setFourthTileSide("front");
    }
  }

  return (
    <IntroContainer>
      <PlayInfo>Click P to start game.</PlayInfo>
      <CardContainer ref={parentRef}>
        <Row ref={rotationDiv}>
          <div className="introCard front" ref={frontRef}>
            <FirstTile onClick={changeSide}>
              <SpanLetters>F</SpanLetters>
            </FirstTile>
            <SecondTile onClick={changeSide}>
              <SpanLetters>L</SpanLetters>
            </SecondTile>
          </div>
          <div className="introCard back" ref={backRef} onClick={changeSide}>
            <FlippedDiv>
              <p>RESULTS: 0 <sup>won</sup>, 0 <sup>lost</sup> 0 <sup>abandoned</sup> </p>
              <p>1. Best Time: --</p>
              <p>2. Last result: win</p>
            </FlippedDiv>
          </div>
        </Row>
      </CardContainer>

      <Row className="second-row">
        <ThirdTile animateFourthTile={animateFourthTile} />

        <Link href="/game">
          <a>
            <FourthTile ref={fourthTileRef}>
              <SpanLetters>P</SpanLetters>
            </FourthTile>
          </a>
        </Link>
      </Row>
    </IntroContainer>
  );
}
