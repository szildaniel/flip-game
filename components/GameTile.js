import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap, Back } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardWrapper = styled.div`
  width: 100%;
  height: 200px;
  cursor: ${(props) => (props.isClickable ? "pointer" : "arrow")};
  position: relative;
`;

const GameTile = (props) => {
  let [divSide, setDivSide] = useState("front");
  let [isClickable, setIsClickable] = useState(true);

  const cardWrapperRef = useRef(null);
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const iconRef = useRef(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      gsap.set(frontRef.current, { rotationY: -180 });
    }
  });

  const changeSide = () => {
    if (divSide === "front" && isClickable) {
      setDivSide("back");
    } else if (divSide === "back" && isClickable) {
      setDivSide("front");
    }
  };

  useEffect(() => {
    if (divSide === "back") {
      const cardSymbol = backRef.current.children[0].dataset.icon;
      props.addCard(cardSymbol);
    }
  }, [divSide]);

  // if card is not matching

  useEffect(() => {
    let delay;
    if (divSide === "back" && isClickable) {
      delay = setTimeout(() => {
        setDivSide("front");
      }, 400);
    }
  }, [props.cardNotMatching]);

  // if card is matching

  useEffect(() => {
    if (props.cardMatching > 0 && divSide === "back" && isClickable) {
      gsap.fromTo(
        backRef.current,
        { autoAlpha: 0.95, scale: 0.9 },
        { autoAlpha: 1, scale: 1, ease: Back.easeInOut, duration: 0.8 }
      );
    }
    if (props.cardMatching > 0 && divSide === "back") {
      setIsClickable(false);
    }
  }, [props.cardMatching]);

  useEffect(() => {
    gsap.set(cardWrapperRef.current, { perspective: 800 });
    gsap.set(cardRef.current, { transformStyle: "preserve-3d" });
    gsap.set(frontRef.current, { rotationY: -180 });
    gsap.set([backRef.current, frontRef.current], {
      backfaceVisibility: "hidden",
    });
  });
  useEffect(() => {
    if (props.isPaused) {
      setIsClickable(false);
    }
    else setIsClickable(true);
  }, [props.isPaused]);


  useEffect(() => {
    if (divSide === "front") {
      gsap.to(cardRef.current, 0.6, { rotationY: 180, ease: Back.easeOut });
    } else if (divSide === "back")
      gsap.to(cardRef.current, 0.6, { rotationY: 0, ease: Back.easeOut });
  }, [divSide]);
  return (
    <>
      <CardWrapper ref={cardWrapperRef} isClickable={isClickable}>
        <div className="card" ref={cardRef} onClick={changeSide}>
          <div
            className="cardFace front"
            data-index={props.index}
            ref={frontRef}
          ></div>
          <div className="cardFace back" ref={backRef}>
            <FontAwesomeIcon
              size="6x"
              icon={props.mySymbol.value}
              ref={iconRef}
            />
          </div>
        </div>
      </CardWrapper>
    </>
  );
};

export default GameTile;
