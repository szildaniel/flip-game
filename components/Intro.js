import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from 'gsap';

import { IntroContainer } from "../styles/Styled.IntroContainer";
import {FirstTile, SecondTile, ThirdTile, FourthTile, FlippedDiv} from "../styles/Style.Tiles";

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
  const [flipped, setFlipped] = useState(false);

  const parentRef = useRef(null);

  useEffect( () => {
      gsap.fromTo( parentRef.current.children,
        {autoAlpha:0},
        {autoAlpha:1})
  } )


  return (
    <IntroContainer>
      <Row ref={parentRef}>
        {flipped === true ? (
          <FlippedDiv onClick={ () => {setFlipped(!flipped) }}>
            <Letter>FLO</Letter>
          </FlippedDiv>
        ) : (
          <>
            <FirstTile onClick={ () => {setFlipped(!flipped) }}>
              <Letter>F</Letter>
            </FirstTile>
            <SecondTile>
              <Letter>L</Letter>
            </SecondTile>
          </>
        )}
      </Row>

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
