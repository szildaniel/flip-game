import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap, Back } from "gsap";
import { SpanLetters } from '../styles/Styled.SpanLetters';

const CardWrapper = styled.div`
  width: 200px;
  height: 200px;
  cursor: pointer;
  position: relative;
  margin: 10px;
`;

const FourthTile = () => {
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
          <div className="cardFace front--play" ref={frontRef}>
            <SpanLetters>P</SpanLetters>
          </div>
          <div className="cardFace back--play" ref={backRef}>
            Play
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default FourthTile;
