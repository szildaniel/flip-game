import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap, Back } from "gsap";
import { SpanLetters } from "../styles/Styled.SpanLetters";

const CardWrapper = styled.div`
  width: 250px;
  height: 250px;
  cursor: pointer;
  position: relative;
  /* margin: 10px; */
`;
const Instructions = styled.p`
  display: block;
  font-size: 1.3rem;
  text-transform: uppercase;
  margin: 0;
`;

const ThirdTile = (props) => {
  let [divSide, setDivSide] = useState("front");

  const cardWrapperRef = useRef(null);
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const isInitialMount = useRef(true);
  const { lastScore } = props;
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      gsap.set(frontRef.current, { rotationY: -180 });
    }
  });

  const changeSide = () => {
    if (divSide === "front") {
      setDivSide("back");
    } else if (divSide === "back") {
      setDivSide("front");
    }
  };

  useEffect(() => {
    gsap.set(cardWrapperRef.current, { perspective: 800 });
    gsap.set(cardRef.current, { transformStyle: "preserve-3d" });
    gsap.set([backRef.current, frontRef.current], {
      backfaceVisibility: "hidden",
    });
  });
  useEffect(() => {
    props.animateFourthTile();
    if (divSide === "front") {
      gsap.to(cardRef.current, 1.1, { rotationY: 180, ease: Back.easeOut });
    } else if (divSide === "back")
      gsap.to(cardRef.current, 1.1, { rotationY: 0, ease: Back.easeOut });
  }, [divSide]);
  return (
    <>
      <CardWrapper ref={cardWrapperRef}>
        <div className="card" ref={cardRef} onClick={changeSide}>
          <div className="cardFace front--info" ref={frontRef}>
            <SpanLetters>
              {lastScore && lastScore === "win" ? (
                <span>N</span>
              ) : lastScore && lastScore === "lose" ? (
                <span>S</span>
              ) : (
                "I"
              )}
            </SpanLetters>
          </div>
          <div className="cardFace back--info" ref={backRef}>
            <Instructions>Instructions</Instructions>
            <p>Press [p] to pause the game, [esc] to exit. </p>
            <p>
              Flip is a time memory game. Click the red cards to see what symbol
              they uncover and try to find the matching symbol underneath the
              oter cards.{" "}
            </p>
            <p>
              Uncover two matching symbols at once to eliminate them from the
              game.
            </p>
            <p>
              Eliminate all cards as fast as you can to win the game. Have fun
              FLIPing!
            </p>
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default ThirdTile;
