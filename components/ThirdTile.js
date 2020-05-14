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
const Instructions = styled.p`
display: block;
font-size: 1.3rem;
text-transform: uppercase;
box-sizing: border-box;`

const ThirdTile = () => {
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
          <div className="cardFace front--info" ref={frontRef}>
            <SpanLetters>I</SpanLetters>
          </div>
          <div className="cardFace back--info" ref={backRef}>
            <Instructions>Instructions</Instructions>
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default ThirdTile;
