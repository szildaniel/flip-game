import { StyledGameTile } from "../styles/Style.Tiles";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap, Back } from "gsap";

const CardWrapper = styled.div`
  width: 100%;
  height: 200px;
  cursor: pointer;
  position: relative;
`;

const GameTile = () => {
  let [divSide, setDivSide] = useState("front");

  const cardWrapperRef = useRef(null);
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
       isInitialMount.current = false;
    } else {
        console.log('not render just change')
        gsap.set(frontRef.current, { rotationY: -180 });
    }
  });

  const changeSide = () => {
    if (divSide === "front") {
      setDivSide("back");
    } else setDivSide("front");
  };

  useEffect(() => {
    gsap.set(cardWrapperRef.current, { perspective: 800 });
    gsap.set(cardRef.current, { transformStyle: "preserve-3d" });
    gsap.set(frontRef.current, { rotationY: -180 });
    gsap.set([backRef.current, frontRef.current], {
      backfaceVisibility: "hidden"
    });
  });
  useEffect(() => {
    if (divSide === "front") {
      gsap.to(cardRef.current, .9, { rotationY: 180, ease: Back.easeOut });
    } else if (divSide === "back")
      gsap.to(cardRef.current, .9, { rotationY: 0, ease: Back.easeOut });
  }, [divSide]);
  return (
    <>
      <CardWrapper ref={cardWrapperRef}>
        <div className="card" ref={cardRef} onClick={changeSide}>
          <div className="cardFace front" ref={frontRef}>
            FRONT
          </div>
          <div className="cardFace back" ref={backRef}>
            BACK
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default GameTile;
