import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Power0, TimelineLite } from "gsap";
import Router from "next/router";

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
  const [timeOfLastGame, setTimeOfLastGame] = useState();


  function userLost() {
    const cookiesObject = Object.fromEntries(
      document.cookie.split("; ").map((c) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );

    const userAlreadyLostGame = cookiesObject.lose;

    if(!userAlreadyLostGame) document.cookie = `lose=1; path=/`;
    if(userAlreadyLostGame){
      const numberOfLost = Number(cookiesObject.lose);
      document.cookie = `lose=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `lose=${numberOfLost + 1}; path=/`;
    }
    document.cookie = `lastScore=lose; path=/`;
    Router.push("/");
  }

  useEffect(() => {
    tl.fromTo(
      fillerRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 30,
        ease: Power0.easeNone,
        onComplete: userLost,
        delay: 4
      }
    );
    return () => tl.kill();
  }, []);

  useEffect(() => {
    const userWin = props.cardsMatching === 6;
    if (userWin) {
      const currentGameTime = tl.time();
      setTimeOfLastGame(currentGameTime);
      tl.pause();

      const myCookie = Object.fromEntries(
        document.cookie.split("; ").map((c) => {
          const [key, ...v] = c.split("=");
          return [key, v.join("=")];
        })
      );

      if (!myCookie.bestTime)
        document.cookie = `bestTime=${currentGameTime.toFixed(2)}; path=/`;
      if (myCookie.bestTime) {
        const bestTime = Number(myCookie.bestTime);
        if (bestTime > currentGameTime) {
          document.cookie =
            "bestTime=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
          document.cookie = `bestTime=${currentGameTime.toFixed(2)}; path=/`;
        }
      }
      if (!myCookie.win) document.cookie = `win=1; path=/`;
      if (myCookie.win) {
        const prevWins = Number(myCookie.win);
        document.cookie = "win=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = `win=${prevWins + 1}; path=/`;
      }
      document.cookie = `lastScore=win; path=/`;
      Router.push("/");
    }
  }, [props.cardsMatching]);


  useEffect(() => {
    if (props.isPaused) {
      tl.pause();
    } else if (!props.isPaused) {
      tl.play();
    }
  }, [props.isPaused]);

  return (
    <TimeBar>
      <Filler ref={fillerRef} />
    </TimeBar>
  );
};
