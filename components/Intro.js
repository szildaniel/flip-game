import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap, Back } from "gsap";
import { SpanLetters } from "../styles/Styled.SpanLetters";
import ThirdTile from "../components/ThirdTile";
import { seperateCookies } from "../helpers/seperateCookies";
import {
  FirstTile,
  SecondTile,
  FourthTile,
  FlippedDiv,
} from "../styles/Styled.Tiles";
import {
  IntroContainer,
  CardContainer,
  Row,
  PlayInfo,
} from "../styles/Styled.Intro";

export default function Intro() {
  let [divSide, setDivSide] = useState("front");
  let [fourthTileSide, setFourthTileSide] = useState("front");

  const [bestWinTime, setBestWinTime] = useState();
  const [lastScore, setLastScore] = useState();

  const [wins, setWins] = useState();
  const [lost, setLost] = useState();
  const [abandoned, setAbandoned] = useState();

  const parentRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const rotationDiv = useRef(null);
  const fourthTileRef = useRef(null);

  // handling cookies
  useEffect(() => {
    const cookiesObject = seperateCookies();
    if (cookiesObject.bestTime) setBestWinTime(cookiesObject.bestTime);
    if (cookiesObject.lastScore) setLastScore(cookiesObject.lastScore);
    if (cookiesObject.win) setWins(cookiesObject.win);
    if (cookiesObject.lose) setLost(cookiesObject.lose);
    if (cookiesObject.abandoned) setAbandoned(cookiesObject.abandoned);
  }, []);

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

  useEffect(() => {
    if (fourthTileSide === "front") {
      gsap.to(fourthTileRef.current, 0.3, { autoAlpha: 0 });
    } else if (fourthTileSide === "back") {
      gsap.to(fourthTileRef.current, 0.3, { autoAlpha: 1 });
    }
  }, [fourthTileSide]);

  const animateFourthTile = () => {
    if (fourthTileSide === "front") {
      setFourthTileSide("back");
    } else if (fourthTileSide === "back") {
      setFourthTileSide("front");
    }
  };

  return (
    <IntroContainer>
      <PlayInfo>
        Click{" "}
        {lastScore && lastScore === "win" ? (
          <span>!</span>
        ) : lastScore && lastScore === "lose" ? (
          <span>E</span>
        ) : (
          "P"
        )}{" "}
        to start game.
      </PlayInfo>
      <CardContainer ref={parentRef}>
        <Row ref={rotationDiv}>
          <div className="introCard front" ref={frontRef}>
            <FirstTile onClick={changeSide}>
              <SpanLetters>
                {lastScore && lastScore === "win" ? (
                  <span>W</span>
                ) : lastScore && lastScore === "lose" ? (
                  <span>L</span>
                ) : (
                  "F"
                )}
              </SpanLetters>
            </FirstTile>
            <SecondTile onClick={changeSide}>
              <SpanLetters>
                {lastScore && lastScore === "win" ? (
                  <span>I</span>
                ) : lastScore && lastScore === "lose" ? (
                  <span>O</span>
                ) : (
                  "L"
                )}
              </SpanLetters>
            </SecondTile>
          </div>
          <div className="introCard back" ref={backRef} onClick={changeSide}>
            <FlippedDiv>
              <p>
                Results: {wins ? wins : 0}
                <sup>won</sup>
                {lost ? lost : 0}
                <sup>lost</sup>
                {abandoned ? abandoned : 0}
                <sup>abandoned</sup>
              </p>
              <p>1. Best Time: {bestWinTime ? `${bestWinTime} s` : "--"} </p>
              <p>
                2. Last result: {lastScore ? lastScore.toUpperCase() : "--"}
              </p>
            </FlippedDiv>
          </div>
        </Row>
      </CardContainer>

      <Row className="second-row">
        <ThirdTile
          animateFourthTile={animateFourthTile}
          lastScore={lastScore}
        />

        <Link href="/game">
          <a>
            <FourthTile ref={fourthTileRef}>
              <SpanLetters>
                {lastScore && lastScore === "win" ? (
                  <span>!</span>
                ) : lastScore && lastScore === "lose" ? (
                  <span>E</span>
                ) : (
                  "P"
                )}
              </SpanLetters>
            </FourthTile>
          </a>
        </Link>
      </Row>
    </IntroContainer>
  );
}
