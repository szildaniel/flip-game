import React, { useEffect, useState, useRef } from "react";
import { gsap, Back } from "gsap";
import { StyledTimer, Seconds} from '../styles/Styled.Timer';

const Timer = (props) => {
  const [sec, setSec] = useState(4);
  const [isActive, setIsActive] = useState(true);
  const secRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      secRef.current,
      0.5,
      {
        scale: 0.6,
        opacity: 0.93,
      },
      {
        scale: 1,
        opacity: 1,
        ease: Back.easeOut,
      }
    );
  }, [sec]);

  useEffect(() => {
    let interval = null;

    if (isActive && sec > 0) {
      interval = setInterval(() => {
        setSec((sec) => sec - 1);
      }, 1000);
    } else if (!isActive && sec !== 4) {
      clearInterval(interval);
    } else if (sec === 0) {
      props.toggleGame();
    }
    return () => clearInterval(interval);
  }, [isActive, sec]);
  return (
    <>
      <StyledTimer>
        {sec <= 2 ? <h1>Good luck !</h1> : ""}
        <h2>
          <Seconds ref={secRef}>{sec}</Seconds>
        </h2>
      </StyledTimer>
    </>
  );
};

export default Timer;
