import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Power0, TimelineLite } from "gsap";

const TimeBar = styled.div`
  position: relative;
  height: 15px;
  width: 100vw;
  color: green;
  border-radius: 5%;
`;

const Filler = styled.div`
  height: 100%;
  background: #a3333d;
`;

export const ProgressBar = (props) => {
  const fillerRef = useRef(null);
  const [tl] = useState(new TimelineLite());

  useEffect(() => {
    tl.fromTo(
      fillerRef.current,
      { width: "0%" },
      { width: "100%", duration: 30, ease: Power0.easeNone }
    );
  }, []);

  useEffect(() => {
    if (props.isPaused) {
      tl.pause();
    } else if (!props.isPaused) {
      tl.play();
    }
  }, [props.isPaused]);

  return (
    <TimeBar>
      <Filler ref={fillerRef}>
        
      </Filler>
    </TimeBar>
  );
};
